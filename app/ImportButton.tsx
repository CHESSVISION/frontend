"use client"; // Needed for client-side interactivity in Next.js App Router
import { useRef } from "react";
import Image from "next/image";

export default function ImportButton() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Trigger the hidden file input when the button is clicked
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    // Handle the selected file(s)
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        // Access the uploaded file
        const file = files[0];
        console.log("Selected video file:", file);

        // TODO: Upload this file or process it as needed
    };

    return (
        <div>
            {/* Styled button that triggers file input */}
            <button
                type="button"
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                onClick={handleButtonClick}
            >
                <Image
                    className="dark:invert"
                    src="/import.svg"
                    alt="import icon"
                    width={20}
                    height={20}
                />
                Import now
            </button>

            {/* Hidden file input for selecting video files */}
            <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}
