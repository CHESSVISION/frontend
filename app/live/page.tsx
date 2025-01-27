import VideoPlayer from "@/components/VideoPlayer";

export default function LivePage() {
    const socketUrl = 'ws://192.168.1.34:8000/ws/stream'; // Replace with your backend URL

    return (
        <div>
            <VideoPlayer socketUrl={socketUrl} />
        </div>
    );
};

