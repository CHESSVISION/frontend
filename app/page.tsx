import Image from "next/image";
import ImportButton from "@/components/ImportButton";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="flex items-center">
                <Image
                    src="/chessvision.svg"
                    alt="chessvision logo"
                    width={360}
                    height={35}
                />
            </div>

            <ol className="list-inside list-decimal text-sm">
                <li>Get started by import your <b>videos</b>.</li>
                <li>Enjoy the interactive game instantly.</li>
            </ol>

            <div className="flex items-center gap-4">
                <ImportButton/>
                <Link className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                    href="/games"
                    rel="noopener noreferrer"
                >
                    Check videos
                </Link>
            </div>
        </div>
    );
}
