'use client';
import React, { useEffect } from 'react';
import { redirect } from "next/navigation";
import Button from "@/components/Button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const navigate = () => {
        redirect("/");
    };

    useEffect(() => {
        console.error("❌ Error caught in error page:", error);
    }, [error]);

    return (
        <div className="w-screen h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-6">
            <div className="max-w-xl text-center bg-[#2B2B2B] border border-gray-700 rounded-xl p-10 shadow-lg">
                <h1 className="text-5xl font-bold text-red-500 mb-4">Oops!</h1>
                <p className="text-xl font-medium mb-2">Something went wrong</p>
                <p className="text-sm text-gray-400 mb-6">
                    It might have been removed, renamed, or never existed at all.
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={reset}
                        className="bg-[#403D39] hover:bg-[#5C5C5C] text-white px-4 py-2 rounded-lg transition"
                    >
                        Try Again
                    </button>

                    <Button name="Go to Home Page" command={navigate} />
                </div>
            </div>
        </div>
    );
}
