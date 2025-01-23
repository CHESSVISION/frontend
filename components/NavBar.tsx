import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    return (
        <header className="w-full bg-white dark:bg-gray-900 shadow">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
                <Link className="flex-1" href="/">
                    <Image
                        src="/chessvision.svg"
                        alt="chessvision Logo"
                        width={200}
                        height={19}
                    />
                </Link>

                <div className="flex text-center">
                    <Link className="flex-1" href="/">
                        <Image
                            src="/favicon.ico"
                            alt="another logo"
                            width={40}
                            height={40}
                        />
                    </Link>
                </div>

                <nav className="flex-1 text-right">
                    <ul className="inline-flex items-center space-x-4">
                        <li>
                            <Link href="/" className="text-gray-700 dark:text-gray-200 hover:underline">
                                Game
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
