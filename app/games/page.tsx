"use client";
import {useState} from "react";
import Image from "next/image";
import ImportButton from "@/app/ImportButton";

export default function GamesPage() {
    // Example game data; in a real app you might fetch this from an API or database
    const [games] = useState([
        {id: 1, name: "Game #1", description: "First game description"},
        {id: 2, name: "Game #2", description: "Second game description"},
        {id: 3, name: "Game #3", description: "Third game description"},
    ]);
    const [chosenGameId, setChosenGameId] = useState<number | null>(null);

    return (
        <div className="max-w-3xl mx-auto p-8">
            <h1 className="text-2xl mb-4">Select a Game</h1>
            <ul className="space-y-2">
                {games.map((game) => {
                    return (
                        <li
                            key={game.id}
                            className={`p-4 border border-gray-200 rounded hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors `}
                        >
                            <a
                                href={`/games/game`}
                                className="flex items-center justify-between"
                            >
                                <div>
                                    <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                                        {game.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {game.description}
                                    </p>
                                </div>

                                <Image
                                    src="/greaterThan.svg"
                                    alt="chosen icon"
                                    width={16}
                                    height={16}
                                />

                            </a>
                        </li>
                    );
                })}
            </ul>
            <div className="flex flex-row-reverse items-center py-2">
                <ImportButton/>
            </div>
        </div>
    );
}
