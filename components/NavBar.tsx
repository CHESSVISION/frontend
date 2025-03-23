import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    return (
        <header className="w-full bg-[#1A1A1A] shadow-md border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo and Home Link */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/chessvision.svg"
                        alt="CHESSVISION Logo"
                        width={180}
                        height={24}
                        className="object-contain"
                    />
                </Link>

                {/* Right side: links or icon */}
                <div className="flex items-center space-x-6">
                    <Link href="/" className="text-white text-sm hover:text-[#FDBF2C] transition">
                        Game
                    </Link>

                    {/* Optional Icon or Logo */}
                    <Link href="/">
                        <Image
                            src="/favicon.ico"
                            alt="ChessVision Icon"
                            width={32}
                            height={32}
                            className="rounded"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}
