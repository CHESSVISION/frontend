// utils/decoder.ts
export class DecoderManager {
    private decoder: VideoDecoder | null = null;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    private sps: Uint8Array | null = null;
    private pps: Uint8Array | null = null;
    private isInitialized: boolean = false;
    private timestamp: number = 0; // In milliseconds

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        // Do not set up the decoder here; wait for SPS and PPS
    }

    /**
     * Handles the output of decoded video frames.
     * Draws the frame onto the canvas.
     */
    private handleOutput(frame: VideoFrame) {
        if (!this.ctx) return;

        // Draw the frame onto the canvas
        this.ctx.drawImage(frame, 0, 0, this.canvas.width, this.canvas.height);
        frame.close(); // Release the frame
    }

    /**
     * Constructs the AVCDecoderConfigurationRecord from SPS and PPS.
     * @param sps Sequence Parameter Set
     * @param pps Picture Parameter Set
     * @returns Uint8Array representing the configuration record
     */
    private createAVCDecoderConfigurationRecord(sps: Uint8Array, pps: Uint8Array): Uint8Array {
        const profile_indication = sps[1]; // Typically, the second byte in SPS
        const profile_compatibility = sps[2];
        const level_indication = sps[3];
        const length_size_minus_one = 3; // Indicates a 4-byte length field

        const num_of_sps = 1;
        const num_of_pps = 1;

        const config = new Uint8Array(7 + 2 + sps.length + 2 + pps.length);
        let offset = 0;

        config[offset++] = 1; // configurationVersion
        config[offset++] = profile_indication;
        config[offset++] = profile_compatibility;
        config[offset++] = level_indication;

        config[offset++] = 0xFC | length_size_minus_one; // 6 bits reserved + 2 bits length_size_minus_one

        config[offset++] = 0xE0 | num_of_sps; // 3 bits reserved + 5 bits num_of_sps

        // SPS
        config[offset++] = (sps.length >> 8) & 0xFF;
        config[offset++] = sps.length & 0xFF;
        config.set(sps, offset);
        offset += sps.length;

        // PPS
        config[offset++] = num_of_pps;
        config[offset++] = (pps.length >> 8) & 0xFF;
        config[offset++] = pps.length & 0xFF;
        config.set(pps, offset);
        offset += pps.length;

        return config;
    }

    /**
     * Initializes the VideoDecoder with the provided SPS and PPS.
     */
    private initializeDecoder() {
        if (this.decoder) {
            console.warn('Decoder is already initialized.');
            return;
        }

        if (!this.sps || !this.pps) {
            console.warn('Cannot initialize decoder without SPS and PPS.');
            return;
        }

        const description = this.createAVCDecoderConfigurationRecord(this.sps, this.pps);

        this.decoder = new VideoDecoder({
            output: (frame) => this.handleOutput(frame),
            error: (err) => console.error('Decoder error:', err),
        });

        try {
            this.decoder.configure({
                codec: 'avc1.42E01E', // Adjust based on your encoder's profile
                codedWidth: this.canvas.width,
                codedHeight: this.canvas.height,
                description: description,
            });
            this.isInitialized = true;
            console.log('VideoDecoder initialized with SPS and PPS');
        } catch (error) {
            console.error('Failed to configure VideoDecoder:', error);
        }
    }

    /**
     * Processes incoming NAL units.
     * @param nalUnit Uint8Array representing the NAL unit
     */
    public decode(nalUnit: Uint8Array) {
        if (!this.isInitialized) {
            const nalUnitType = nalUnit[0] & 0x1F;

            // Handle SPS (type 7) and PPS (type 8) NAL units
            if (nalUnitType === 7) {
                this.sps = nalUnit;
                console.log('SPS NAL unit received');
                // Attempt to initialize decoder if PPS is already received
                if (this.pps) {
                    this.initializeDecoder();
                }
                return;
            } else if (nalUnitType === 8) {
                this.pps = nalUnit;
                console.log('PPS NAL unit received');
                // Attempt to initialize decoder if SPS is already received
                if (this.sps) {
                    this.initializeDecoder();
                }
                return;
            }

            // If not initialized and not SPS/PPS, ignore or buffer
            console.warn('Received frame data before SPS/PPS');
            return;
        }

        // Determine frame type
        const nalUnitType = nalUnit[0] & 0x1F;
        let frameType: 'key' | 'delta' = 'delta';
        if (nalUnitType === 5) {
            frameType = 'key'; // IDR frame
        }

        // Decode the NAL unit
        this.sendToDecoder(nalUnit, frameType);
    }

    /**
     * Sends an EncodedVideoChunk to the VideoDecoder.
     * @param nalUnit Uint8Array representing the NAL unit
     * @param frameType Type of the frame ('key' or 'delta')
     */
    private sendToDecoder(nalUnit: Uint8Array, frameType: 'key' | 'delta') {
        if (!this.decoder) return;

        // Prepend start code (Annex B)
        const startCode = new Uint8Array([0x00, 0x00, 0x00, 0x01]);
        const data = new Uint8Array(startCode.length + nalUnit.length);
        data.set(startCode, 0);
        data.set(nalUnit, startCode.length);

        // Create an EncodedVideoChunk
        let chunk: EncodedVideoChunk;
        try {
            chunk = new EncodedVideoChunk({
                type: frameType,
                timestamp: this.timestamp,
                data: data,
            });
        } catch (error) {
            console.error('Error creating EncodedVideoChunk:', error);
            return;
        }

        // Increment timestamp (assuming a frame rate of 30fps)
        this.timestamp += 1000 / 30; // 1000ms divided by 30 frames

        // Feed the EncodedVideoChunk to the decoder
        try {
            this.decoder.decode(chunk);
        } catch (error) {
            console.error('Decoding error:', error);
        }
    }

    /**
     * Closes the VideoDecoder and releases resources.
     */
    public close() {
        if (this.decoder) {
            try {
                this.decoder.close();
                console.log('VideoDecoder closed');
            } catch (error) {
                console.error('Error closing VideoDecoder:', error);
            }
            this.decoder = null;
        }
    }
}
