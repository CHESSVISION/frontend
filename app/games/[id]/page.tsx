"use client";
import React, {useEffect, useState} from "react";
import {redirect, useParams} from "next/navigation";
import Button from "@/components/Button";
import MyChessboard from "@/components/Chessboard";
import Loading from "@/app/loading";
import GameInterface from "@/interfaces/GameInterface";
import {router} from "next/client";

export default function GamePage() {
    const {id} = useParams<{ id: string }>();
    const [state, setState] = useState<number>(0);
    const [game, setGame] = useState<GameInterface | null>(null);

    const handleNextButton = () => {
        if (state < game!.fen_positions.length - 1) {
            setState(prevState => (prevState + 1));
        }
    }

    const handlePreviousButton = () => {
        if (state > 0) {
            setState(prevState => (prevState - 1));
        }
    }

    const gamesNavigate = () => {
        redirect("/games")
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/games/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setGame(data))
    }, [id]);

    if (!game) {
        return <Loading/>;
    }

    return (
        <div className="w-full max-w-3xl mx-auto gap-4 py-4 flex flex-col">
            <h1 className="text-2xl ">Analyzing {game.title}</h1>
            <div className="border border-gray-300 rounded flex flex-col items-center bg-gray-50 gap-4 p-4">
                <MyChessboard position={game.fen_positions[state]}/>

                <div className="flex justify-center gap-2">
                    <Button name="Previous" command={handlePreviousButton}/>
                    <Button name="Suggest"/>
                    <Button name="Next" command={handleNextButton}/>
                </div>
            </div>

            <div className="flex flex-col border border-gray-300 rounded gap-4 p-4">
                <h2 className="text-xl font-bold mb-2">{game.title}</h2>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {game.description}
                </p>

                <ul className="list-decimal list-inside space-y-1">
                    {game.moves.map((move, index) => (
                        <li key={index} className="text-sm">
                            {move}
                        </li>
                    ))}
                </ul>
                <div className="ml-auto mt-auto p-2">
                    <Button name="Export"/>
                </div>
            </div>

            <div className="flex justify-end ">
                <Button name="All Games" command={gamesNavigate}/>
            </div>
        </div>
    );
}
