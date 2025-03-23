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
        <div className="w-screen h-screen flex flex-col items-center justify-start bg-[#121212] text-white p-6">
            <div className="w-full max-w-4xl flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Select a Game</h1>
                <ImportButton />
            </div>

            {games?.length ? (
                <div className="w-full max-w-4xl flex flex-col gap-4">
                    {games.map((game) => (
                        <Link
                            key={game.id}
                            href={`/games/${game.id}`}
                            className="flex justify-between items-center p-4 bg-[#2B2B2B] hover:bg-[#403D39] border border-gray-700 rounded-lg transition"
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-white">{game.title}</h2>
                                <p className="text-sm text-gray-400">{game.description}</p>
                            </div>
                            <Image
                                src="/greaterThan.svg"
                                alt="Navigate to game"
                                width={20}
                                height={20}
                                className="ml-4"
                            />
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-gray-400 mt-8">No games available.</div>
            )}
        </div>
    );
}
