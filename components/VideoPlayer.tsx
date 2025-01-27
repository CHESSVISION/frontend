'use client'
import { useEffect, useRef } from 'react';
import {DecoderManager} from "@/utils/decoder";

interface VideoPlayerProps {
    socketUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ socketUrl }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const decoderRef = useRef<DecoderManager | null>(null);

    const websocket = new WebSocket(socketUrl);
    websocket.onmessage = (event: MessageEvent) => {
        const data = new Uint8Array(event.data);
        decoderRef.current?.decode(data);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        decoderRef.current = new DecoderManager(canvas);

        return () => {
            // Clean up the decoder
            decoderRef.current?.close();
        };
    }, []);


    return (
        <div className="flex flex-col justify-center items-center py-4 gap-4">
            <h1>Live from Device</h1>
            <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="border bg-gray-200 rounded-lg"
            />
        </div>
    );
};

export default VideoPlayer;
