import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    return (
        <header className="w-full bg-[#1A1A1A] shadow-md border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
                {/* Left: Logo Title */}
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <Image
                            src="/chessvision.svg"
                            alt="CHESSVISION Logo"
                            width={180}
                            height={24}
                            className="object-contain"
                        />
                    </Link>
                </div>

                {/* Center: Favicon icon */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <Link href="/">
                        <Image
                            src="/favicon.ico"
                            alt="ChessVision Icon"
                            width={32}
                            height={32}
                            className="rounded invert"
                        />
                    </Link>
                </div>

                {/* Right: Nav links */}
                <div className="flex items-center space-x-6">
                    <Link
                        href="/"
                        className="text-white text-sm hover:text-[#FDBF2C] transition"
                    >
                        Game
                    </Link>
                </div>
            </div>
        </header>
    );
}
