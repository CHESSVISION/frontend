"use client"; // Needed for client-side interactivity in Next.js App Router
import {useEffect, useState} from "react";
import Image from "next/image";
import ImportButton from "@/components/ImportButton";

interface Game {
    id: number;
    title: string;
    description: string;
    position: string;
    moves: string[];
}

export default function GamesPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/games", {
                    method: "GET",
                });

                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }

                const data: Game[] = await res.json();
                setGames(data);
            } catch (err: any) {
                console.error("Failed to fetch games:", err);
                setError(err.message || "Failed to fetch games.");
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (loading) {
        return <p className="text-center">Loading games...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
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
                        <a href={`/games/${game.id}`} className="flex items-center justify-between">
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
                        </a>
                    </li>
                ))}
            </ul>
            <div className="flex flex-row-reverse items-center py-2">
                <ImportButton/>
            </div>
        </div>
    );
}
