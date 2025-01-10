"use client"; // Needed for client-side interactivity in Next.js App Router
import { useRef } from "react";
import Image from "next/image";

interface ButtonProps{
    name: string;
    uri: string;
}

export default function Button({ name, uri }: ButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            {/* Styled button that triggers file input */}
            <a
                type="button"
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                href={uri}
            >
                {name}

            </a>
        </div>
    );
}
