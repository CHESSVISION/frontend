import Image from "next/image";

export default function videos() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Image
                    className="dark:invert"
                    src="/chessvision.svg"
                    alt="chessvision logo"
                    width={360}
                    height={76}
                />
                <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    <li className="mb-2">Get started by import your <b>videos</b>.</li>
                    <li>Enjoy the interactive game instantly.</li>
                </ol>

                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <a
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                        href="/import"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <Image
                            className="dark:invert"
                            src="/import.svg"
                            alt="import icon"
                            width={20}
                            height={20}
                        />
                        Import now
                    </a>
                    <a
                        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                        href="/videos"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Check videos
                    </a>
                </div>
            </main>
        </div>
    );
}
