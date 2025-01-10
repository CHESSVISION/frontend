"use client"; // Needed for client-side interactivity in Next.js App Router
import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

export default function ImportButton() {
    const router = useRouter(); // Initialize router
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Trigger the hidden file input when the button is clicked
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    // Handle the selected file
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        console.log("Selected video file:", file);

        const formData = new FormData();
        formData.append("video", file); // Ensure the key matches FastAPI's parameter

        try {
            setUploading(true);
            setError(null);
            setSuccess(null);

            const response = await fetch("http://127.0.0.1:8000/games", { // Corrected IP and URL
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Something went wrong!"); // Changed from 'message' to 'detail' based on FastAPI
            }

            const data = await response.json();
            console.log("Upload successful:", data);
            setSuccess("Video uploaded successfully!");

            // Redirect to the specific [id] details page using the returned 'id'
            router.push(`/games/${data.id}`); // Ensure 'id' is present in the response
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
            {/* Styled button that triggers file input */}
            <button
                type="button"
                onClick={handleButtonClick}
                className="rounded-full border border-solid border-transparent transition-colors
                           flex items-center justify-center bg-foreground text-background gap-2
                           hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base
                           h-10 sm:h-12 px-4 sm:px-5"
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

            {/* Hidden file input for selecting video files */}
            <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Display success or error messages */}
            {success && (
                <p className="mt-2 text-green-600 dark:text-green-400">{success}</p>
            )}
            {error && (
                <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
}
