import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    return (
        <header className="w-full bg-white dark:bg-gray-900 shadow">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">

                {/* Left Column (flex-1) */}
                <a className="flex-1" href="/">
                    {/* Put your larger/left image here */}
                    <Image
                        src="/chessvision.svg"
                        alt="chessvision Logo"
                        width={200}
                        height={19}
                    />
                </a>

                {/* Middle Column (flex-1) - optional */}
                <div className="flex text-center">
                    {/* Maybe a smaller image or site title in the center */}
                    <Image
                        src="/favicon.ico"
                        alt="another logo"
                        width={40}
                        height={40}
                    />
                </div>

                {/* Right Column (flex-1) */}
                <nav className="flex-1 text-right">
                    <ul className="inline-flex items-center space-x-4">
                        <li>
                            <Link
                                href="/"
                                className="text-gray-700 dark:text-gray-200 hover:underline"
                            >
                                Game
                            </Link>
                        </li>
                        {/* Add more menu items here */}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
