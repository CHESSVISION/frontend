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
                <ImportButton />
                <Link className="flex items-center gap-2 bg-[#2B2B2B] hover:bg-[#403D39] text-white text-sm font-medium px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    href="/games"
                    rel="noopener noreferrer"
                >
                    Check videos
                </Link>
            </div>
        </div>
    );
}
