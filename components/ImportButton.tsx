"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ImportButton: React.FC = () => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };
    const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        const formData = new FormData();
        formData.append("video", file);

        try {
            setUploading(true);
            setError(null);
            setSuccess(null);

            const response = await fetch(`${server_url}/games`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Upload failed.");
            }

            const data = await response.json();
            setSuccess("Video uploaded successfully!");
            router.push(`/games/${data.id}`);
        } catch (err: any) {
            console.error("Upload failed:", err);
            setError(err.message || "An error occurred.");
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div className="flex flex-col items-start gap-2">
            <button
                type="button"
                onClick={handleButtonClick}
                className="flex items-center gap-2 bg-[#2B2B2B] hover:bg-[#403D39] text-white text-sm font-medium px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={uploading}
            >
                <Image
                    src="/import.svg"
                    alt="Import Icon"
                    width={18}
                    height={18}
                    className="text-black dark:text-white"
                />
                {uploading ? "Uploading..." : "Import Now"}
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept="video/*, image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {success && (
                <p className="text-sm text-green-400">{success}</p>
            )}
            {error && (
                <p className="text-sm text-red-400">{error}</p>
            )}
        </div>
    );
};

export default ImportButton;
