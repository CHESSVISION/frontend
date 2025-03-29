"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/Button";
import MyChessboard from "@/components/Chessboard";
import Loading from "@/app/loading";
import { FaStepBackward, FaStepForward, FaPlay, FaBackward, FaForward } from "react-icons/fa";
import { Chess } from "chess.js";
import {pieceSymbols, fenToBoard, convertMoveToChessNotation, normalizeFen} from "@/app/games/[id]/utils";

export default function GamePage() {
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<number>(0);
    const [game, setGame] = useState<{
        title: string;
        description: string;
        fen_positions: string[];
        moves: string[];
    } | null>(null);

    // Store previous FEN for reference (optional if needed)
    const [previousFen, setPreviousFen] = useState<string>("");

    // Analysis
    const [possibleMoves, setPossibleMoves] = useState<{ moves: string[]; cp: number }[]>([]);
    const [evaluation, setEvaluation] = useState<number>(0);

    // 1. Fetch the game data from your backend
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/games/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setGame(data);
                if (data.fen_positions && data.fen_positions.length > 0) {
                    const firstFen = normalizeFen(data.fen_positions[0]);
                    setPreviousFen(firstFen);
                    updateGameState(firstFen);
                }
            });
    }, [id]);

    // 2. Whenever `state` changes, update the board position
    useEffect(() => {
        if (game && game.fen_positions[state]) {
            setPossibleMoves([])
            console.log(game.fen_positions[state])
            updateGameState(game.fen_positions[state]);
        }
    }, [state, game]);

    const fetchPossibleMoves = async (fen: string) => {
        try {
            const response = await fetch(`https://lichess.org/api/cloud-eval?fen=${fen}`);
            console.log("suggest position: ", fen)
            const data = await response.json();

            if (data.pvs) {
                const top3 = data.pvs.slice(0, 3).map((pv: any) => ({
                    moves: pv.moves.split(" "),
                    cp: pv.cp ?? 0, // use ?? to catch 0 or undefined
                }));

                const maxEval = Math.max(...top3.map((m) => m.cp));

                setPossibleMoves(top3);
                setEvaluation(maxEval);
            } else {
                setPossibleMoves([]);
                setEvaluation(0);
            }
        } catch (error) {
            console.error("❌ Failed to fetch possible moves:", error);
            setPossibleMoves([]);
            setEvaluation(0);
        }
    };


    const suggestMoveForColor = (color: "w" | "b") => {
        if (!previousFen) return;
        const fenFields = previousFen.split(" ");
        fenFields[1] = color; // override the active color
        const fenForSuggestion = fenFields.join(" ");
        console.log("Suggesting moves for", color, "with FEN:", fenForSuggestion);
        fetchPossibleMoves(fenForSuggestion);
    };

    // 4. Navigation handlers
    const handleNextButton = () => {
        if (game && state < game.fen_positions.length - 1) {
            setState((prevState) => prevState + 1);
        }
    };

    const handlePreviousButton = () => {
        if (state > 0) {
            setState((prevState) => prevState - 1);
        }
    };

    // 5. Core state-updating function
    const updateGameState = (position: string) => {
        setPreviousFen(position)
        // fetchPossibleMoves(position.split(" ")[0]);
    };

    const [showEditForm, setShowEditForm] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const handleEditButton = () => {
        if (game) {
            setEditTitle(game.title);
            setEditDescription(game.description);
            setShowEditForm(true);
        }
    };

    const updateGame = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/games/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: editTitle,
                    description: editDescription,
                }),
            });
            const data = await response.json();
            if (game) {
                setGame({ ...game, title: data.title, description: data.description });
            } else {
                // Optionally, initialize game with complete data if available
                setGame({
                    title: data.title,
                    description: data.description,
                    fen_positions: data.fen_positions || [],
                    moves: data.moves || [],
                });
            }
        } catch (error) {
            console.error("❌ Failed to fetch possible moves:", error);
        }
    }

    if (!game) {
        return <Loading />;
    }

    const handleExport = () => {
        if (!game) return;
    
        const movesText = game.moves.reduce((result: string[], _, index, moves) => {
            try {
                if (index % 2 === 0) {
                    const boardWhite = fenToBoard(game.fen_positions[index]);
                    const whiteMove = convertMoveToChessNotation(moves[index], boardWhite);
    
                    const blackMove = moves[index + 1]
                        ? convertMoveToChessNotation(
                            moves[index + 1],
                            fenToBoard(game.fen_positions[index + 1])
                        )
                        : "";
    
                    result.push(`${index / 2 + 1}. ${whiteMove} ${blackMove}`);
                }
            } catch {}
            return result;
        }, []).join('\n');
    
        const blob = new Blob([movesText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${game.title || "chess_game"}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    

    // Evaluation bar logic
    const evalHeight = Math.min(Math.max(50 - evaluation / 5, 0), 100);
    const evalText = evaluation > 0 ? `+${(evaluation / 100).toFixed(2)}` : (evaluation / 100).toFixed(2);

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#121212] text-white p-6">
            <div>
                {showEditForm && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-[#2B2B2B] text-white p-6 rounded-lg w-96 shadow-lg">
                            <h2 className="text-lg font-bold mb-4">Edit Game Info</h2>

                            <label className="block mb-2 text-sm">Title</label>
                            <input
                                className="w-full p-2 mb-4 rounded bg-[#3C3C3C] text-white"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />

                            <label className="block mb-2 text-sm">Description</label>
                            <input
                                className="w-full p-2 mb-4 rounded bg-[#3C3C3C] text-white"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                    onClick={() => setShowEditForm(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                    onClick={() => {
                                        console.log("Saving:", editTitle, editDescription);
                                        updateGame()
                                        setShowEditForm(false);
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <h1 className="text-2xl font-bold">Analyzing {game.title}</h1>
            <div className="flex flex-row justify-center items-start w-full h-full gap-6 p-6">

                {/* Evaluation bar & Chessboard */}
                <div className="flex flex-row items-center gap-4">
                    {/* Evaluation bar */}
                    <div className="relative flex flex-col items-center w-10 self-start">
                        <div className="relative w-6 h-[480px] rounded overflow-hidden border border-black">
                            {/* Evaluation number */}
                            <span
                                className={`absolute left-1/2 transform -translate-x-1/2 px-1 rounded text-xs font-bold z-10 ${evaluation >= 0 ? "bottom-[2px] text-[#403D39] bg-white" : "top-[2px] text-white bg-black"
                                    }`}
                                style={{ backgroundColor: evaluation < 0 ? "#403d39" : "#ffffff" }}
                            >
                                {evalText}
                            </span>
                            {/* White portion */}
                            <div
                                className="absolute bottom-0 w-full bg-white transition-all duration-500"
                                style={{ height: `${100 - evalHeight}%` }}
                            />
                            {/* Black portion */}
                            <div
                                className="absolute top-0 w-full bg-black transition-all duration-500"
                                style={{ height: `${evalHeight}%`, backgroundColor: "#403d39" }}
                            />
                        </div>
                    </div>

                    {/* Board & Nav Buttons */}
                    <div className="flex flex-col items-center gap-2">
                        <MyChessboard
                            position={game.fen_positions[state]}
                            onMove={(newFen) => {
                                // remove the setState increment!
                                updateGameState(newFen);
                            }}
                        />

                        {/* Navigation Buttons */}
                        <div className="flex justify-center gap-2 mt-3 bg-[#2B2B2B] p-2 rounded-lg">
                            <button
                                onClick={() => setState(0)}
                                className="bg-[#3C3C3C] text-white p-3 rounded-lg hover:bg-[#5C5C5C] transition"
                            >
                                <FaStepBackward size={18} />
                            </button>
                            <button
                                onClick={handlePreviousButton}
                                className="bg-[#3C3C3C] text-white p-3 rounded-lg hover:bg-[#5C5C5C] transition"
                            >
                                <FaBackward size={18} />
                            </button>
                            <button
                                onClick={() => console.log("Play/Pause functionality")}
                                className="bg-[#3C3C3C] text-white p-3 rounded-lg hover:bg-[#5C5C5C] transition"
                            >
                                <FaPlay size={18} />
                            </button>
                            <button
                                onClick={handleNextButton}
                                className="bg-[#3C3C3C] text-white p-3 rounded-lg hover:bg-[#5C5C5C] transition"
                            >
                                <FaForward size={18} />
                            </button>
                            <button
                                onClick={() => setState(game.fen_positions.length - 1)}
                                className="bg-[#3C3C3C] text-white p-3 rounded-lg hover:bg-[#5C5C5C] transition"
                            >
                                <FaStepForward size={18} />
                            </button>
                        </div>
                        {/* New Suggestion Buttons */}
                        <div className="flex justify-center gap-2 mt-3 bg-[#2B2B2B] p-2 rounded-lg">
                            <button
                                onClick={() => suggestMoveForColor("w")}
                                className="bg-[#3C3C3C] text-white p-3 rounded-lg hover:bg-[#5C5C5C] transition"
                            >
                                Suggest White
                            </button>
                            <button
                                onClick={() => suggestMoveForColor("b")}
                                className="bg-[#3C3C3C] text-white p-3 rounded-lg hover:bg-[#5C5C5C] transition"
                            >
                                Suggest Black
                            </button>
                        </div>

                    </div>
                </div>

                {/* Moves List & Possible Moves */}
                <div className="flex flex-col gap-6 w-1/3">
                    {/* Move list */}
                    <div
                        className="border border-gray-600 rounded-lg p-6 bg-[#2B2B2B] text-white max-h-96 overflow-y-auto">
                        <div className="flex justify-between gap-2">
                            <h2 className="text-lg font-bold text-white mb-2">{game.title}</h2>
                            <button onClick={handleEditButton}>
                                Edit
                            </button>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">{game.description}</p>

                        {/* All Moves */}
                        <div className="flex flex-col gap-2">
                            {game.moves.reduce((result: React.ReactNode[], _, index, moves) => {
                                try {
                                    if (index % 2 === 0) {
                                        const boardWhite = fenToBoard(game.fen_positions[index]);
                                        const whiteMove = convertMoveToChessNotation(moves[index], boardWhite);

                                        const blackMove = moves[index + 1]
                                            ? convertMoveToChessNotation(
                                                moves[index + 1],
                                                fenToBoard(game.fen_positions[index + 1])
                                            )
                                            : "";

                                        result.push(
                                            <div key={index / 2} className="flex items-center bg-[#403d39] rounded p-2">
                                                <span className="px-2 py-1 rounded text-sm font-bold text-white mr-2">
                                                    {index / 2 + 1}.
                                                </span>
                                                <span className="text-sm font-mono text-gray-200">
                                                    {whiteMove} {blackMove}
                                                </span>
                                            </div>
                                        );
                                    }
                                } catch {
                                }
                                return result;
                            }, [])}
                        </div>

                        <div className="mt-4">
                        <button onClick={handleExport}
                                className="bg-[#3C3C3C] hover:bg-[#5C5C5C] text-white px-4 py-2 rounded-lg transition"
                        >
                        Export
                            </button>
                        </div>
                    </div>

                    {/* Possible / Engine Moves */}
                    <div className="border border-gray-600 rounded-lg p-4 bg-[#2B2B2B] text-white">
                        <div className="flex flex-col gap-2">
                            {possibleMoves.map((move, index) => {
                                const board = fenToBoard(game.fen_positions[state]);
                                return (
                                    <div key={index} className="flex flex-col bg-[#403d39] rounded p-2">
                                        <span
                                            className={`px-2 py-1 rounded text-sm font-bold mb-1 w-fit ${move.cp > 0 ? "bg-white text-[#403D39]" : "bg-black text-white"
                                                }`}
                                        >
                                            {move.cp >= 0
                                                ? `+${(move.cp / 100).toFixed(2)}`
                                                : (move.cp / 100).toFixed(2)}
                                        </span>
                                        <span className="text-sm font-mono text-gray-300">
                                            {move.moves
                                                .reduce((formattedMoves: string[], rawMove, i) => {
                                                    const moveNotation = convertMoveToChessNotation(rawMove, board);
                                                    if (i % 2 === 0) {
                                                        formattedMoves.push(`${i / 2 + 1}.${moveNotation} `);
                                                    } else {
                                                        formattedMoves[formattedMoves.length - 1] += `${moveNotation} |`;
                                                    }
                                                    return formattedMoves;
                                                }, [])
                                                .join(" ")}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
