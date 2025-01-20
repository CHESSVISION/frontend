import type {Metadata} from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "CHESSVISION",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
            <body>
                <NavBar/>
                <main>{children}</main>
                <Footer/>
            </body>
        </html>
    );
}
