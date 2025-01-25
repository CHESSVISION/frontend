'use server';
import Image from "next/image";
import ImportButton from "@/components/ImportButton";
import Link from "next/link";
import GameInterface from "@/interfaces/GameInterface";


export default async function GamesPage() {
    let games: GameInterface[] | null = null;

    try {
        const response = await fetch("http://127.0.0.1:8000/games");
        games = await response.json();
    } catch (err) {
        console.error("Failed to fetch games:", err);
    }

    return (
        <div className="w-full max-w-3xl mx-auto mt-4">
            <h1 className="text-2xl mb-4 ml-0">Select a Game</h1>
            <ul className="space-y-2">
                {games.map((game) => (
                    <li
                        key={game.id}
                        className="p-4 border border-gray-200 rounded hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Link href={`/games/${game.id}`} className="flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold text-gray-800 dark:text-gray-100">{game.title}</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{game.description}</p>
                            </div>
                            <Image
                                src="/greaterThan.svg"
                                alt="Navigate to game"
                                width={16}
                                height={16}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="flex flex-row-reverse items-center py-2">
                <ImportButton/>
            </div>
        </div>
    );
}
