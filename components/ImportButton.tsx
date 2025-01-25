"use client";
import {useRef, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";

const ImportButton: React.FC = () => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        console.log("Selected video file:", file);

        const formData = new FormData();
        formData.append("video", file);

        try {
            setUploading(true);
            setError(null);
            setSuccess(null);

            const response = await fetch("http://127.0.0.1:8000/games", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Something went wrong!");
            }

            const data = await response.json();
            console.log("Upload successful:", data);
            setSuccess("Video uploaded successfully!");

            router.push(`/games/${data.id}`);
        } catch (err: any) {
            console.error("Upload failed:", err);
            setError(err.message || "An error occurred during upload.");
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={handleButtonClick}
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-10 px-4"
                disabled={uploading} // Disable button while uploading
            >
                <Image
                    className="dark:invert"
                    src="/import.svg"
                    alt="import icon"
                    width={20}
                    height={20}
                />
                {uploading ? "Uploading..." : "Import now"}
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {success && (
                <p className="mt-2 text-green-600 dark:text-green-400">{success}</p>
            )}
            {error && (
                <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
}

export default ImportButton;
