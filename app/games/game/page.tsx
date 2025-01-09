"use client";
import Image from "next/image";
import Button from "@/app/games/game/button";

export default function ChessPage() {
    // Sample data: In a real app, you might fetch or receive this from props
    const gameData = {
        title: "Chess Game #1",
        moves: [
            "e4 e5",
            "Nf3 Nc6",
            "Bb5 a6",
            "Ba4 Nf6",
            "O-O Be7",
        ],
    };

    return (
        <div className="max-w-3xl mx-auto p-4 gap-4">
            <h1 className="text-2xl mb-4">Analyzing</h1>
            <div className="flex">
                <div className=" border border-gray-300 dark:border-gray-700 rounded p-4 m-2 flex flex-col items-center">
                    {/* Centered chessboard */}
                    <Image
                        src="/chessboard.svg"
                        alt="Chessboard"
                        width={400}
                        height={400}
                        className="object-cover"
                    />

                    {/* Buttons row 1 */}
                    <div className="flex justify-center items-center gap-2 mt-4">
                        <Button name={`previous`}/>
                        <Button name={`suggest`}/>
                        <Button name={`next`}/>
                    </div>

                    {/* Buttons row 2 */}
                    <div className="flex justify-center items-center gap-2 mt-2">
                        <Button name="Delete"/>
                    </div>
                </div>


                {/* Right side: Game Data */}
                <div className="flex flex-col p-2 m-2 border border-gray-300 dark:border-gray-700 rounded w-full">
                    {/* Game Title */}
                    <h2 className="text-xl font-bold mb-2">{gameData.title}</h2>

                    {/* Move List */}
                    <ul className="list-decimal list-inside space-y-1">
                        {gameData.moves.map((move, index) => (
                            <li key={index} className="text-sm">
                                {move}
                            </li>
                        ))}
                    </ul>
                    <div className="ml-auto mt-auto p-2">
                        <Button name="Export"/>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2 m-2">
                <Button name="Back" uri="/games"/>
            </div>
        </div>
    );
}
