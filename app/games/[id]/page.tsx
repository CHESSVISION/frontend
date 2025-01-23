import Image from "next/image";
import Button from "@/components/Button";

interface Game {
    id: number;
    title: string;
    description: string;
    position: string;
    moves: string[];
}

export default async function GameDetailsPage({params}: {params: {id: string}}) {
    const {id} = params;
    let gameData: Game | null = null;

    try {
        const response = await fetch(`http://127.0.0.1:8000/games/${id}`, {cache: "no-store"});
        gameData = await response.json();
    } catch (error) {
        console.error("Failed to fetch games:", error);
    }

    return (
        <div className="w-full max-w-3xl mx-auto gap-4 mt-4">
            <h1 className="text-2xl mb-4">Analyzing {gameData.title}</h1>
            <div className="flex flex-col md:flex-row">
                {/* Left Side: Chessboard and Buttons */}
                <div
                    className="border border-gray-300 dark:border-gray-700 rounded p-4 m-2 flex flex-col items-center">
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
                        <Button name={`Previous`}/>
                        <Button name={`Suggest`}/>
                        <Button name={`Next`}/>
                    </div>

                    {/* Buttons row 2 */}
                    <div className="flex justify-center items-center gap-2 mt-2">
                        <Button name="Delete"/>
                    </div>
                </div>

                {/* Right Side: Game Data */}
                <div
                    className="flex flex-col p-2 m-2 border border-gray-300 dark:border-gray-700 rounded w-full">
                    {/* Game Title */}
                    <h2 className="text-xl font-bold mb-2">{gameData.title}</h2>

                    {/* Game Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {gameData.description}
                    </p>

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

            {/* Back Button */}
            <div className="flex justify-end gap-2 m-2">
                <Button name="Back" uri="/games"/>
            </div>
        </div>
    );
}
