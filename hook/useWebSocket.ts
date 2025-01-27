'use client'
import { useEffect, useRef } from 'react';

interface UseWebSocketProps {
    url: string;
    onMessage: (data: Uint8Array) => void;
    onOpen?: () => void;
    onClose?: () => void;
    onError?: (error: Event) => void;
    reconnect?: boolean;
    reconnectInterval?: number; // in milliseconds
}

const useWebSocket = ({
                          url,
                          onMessage,
                          onOpen,
                          onClose,
                          onError,
                      }: UseWebSocketProps) => {
    const ws = useRef<WebSocket | null>(null);
    const timeoutRef = useRef<number | null>(null);

    const connect = () => {
        ws.current = new WebSocket(url);
        ws.current.binaryType = 'arraybuffer';

        ws.current.onopen = () => {
            console.log('WebSocket connection opened');
            if (onOpen) {
                onOpen();
            }
        };

        ws.current.onmessage = (event) => {
            if (event.data instanceof ArrayBuffer) {
                const data = new Uint8Array(event.data);
                onMessage(data);
            }
        };

        ws.current.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
            if (onClose) {
                onClose();
            }
        };

        ws.current.onerror = (error) => {
            ws.current?.close();
            console.error('WebSocket error:', error);
            if (onError) {
                onError(error);
            }
        };
    };

    useEffect(() => {
        connect();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            ws.current?.close();
        };
    }, [url]);

    return ws.current;
};

export default useWebSocket;
