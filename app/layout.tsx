import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { geistMono, geistSans } from "@/app/fonts";
import React, { Suspense } from "react";
import Loading from "@/app/loading";

export const metadata: Metadata = {
    title: "CHESSVISION",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${geistMono.variable} ${geistSans}`}>
            <body className="bg-[#121212] text-white min-h-screen flex flex-col">
                {/* NavBar at top */}
                <NavBar />

                {/* Main content in the middle */}
                <main className="flex-grow">
                    <Suspense fallback={<Loading />}>
                        {children}
                    </Suspense>
                </main>

                {/* Footer at bottom */}
                <Footer />
            </body>
        </html>
    );
}
