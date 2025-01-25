import type {Metadata} from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {geistMono, geistSans} from "@/app/fonts";
import React, {Suspense} from "react";
import Loading from "@/app/loading";

export const metadata: Metadata = {
    title: "CHESSVISION",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en" className={`${geistMono.variable} ${geistSans}`}>
            <body>
                <NavBar/>
                    <main>
                        <Suspense fallback={<Loading />}>
                            {children}
                        </Suspense>
                    </main>
                <Footer/>
            </body>
        </html>
    );
}
