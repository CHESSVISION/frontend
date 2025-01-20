import Image from "next/image";

export default function Footer() {
    return (
        <footer className="flex gap-6 flex-wrap items-center justify-center p-4 border-t dark:border-gray-700">
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://github.com/CHESSVISION/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    aria-hidden
                    src="/github.svg"
                    alt="github icon"
                    width={16}
                    height={16}
                />
                Github
            </a>
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://www.instagram.com/kuisskui"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    aria-hidden
                    src="/person.svg"
                    alt="person icon"
                    width={16}
                    height={16}
                />
                kuisskui
            </a>
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://www.instagram.com/banana._.zzz/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    aria-hidden
                    src="/person.svg"
                    alt="person icon"
                    width={16}
                    height={16}
                />
                bananaz
            </a>
        </footer>
    )
}
