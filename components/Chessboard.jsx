"use client";
import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function MyChessboard({ position, onMove }) {
  const [game, setGame] = useState(new Chess());

  /**
   * Normalize a FEN string to ensure it has all 6 fields.
   * For example, if you get a partial FEN without castling or en-passant fields, this fills them in.
   */
  const normalizeFen = (fen) => {
    if (!fen) return "start"; // Default to initial board if empty
    let fields = fen.trim().split(" ");
    while (fields.length < 6) {
      fields.push("-"); // Fill missing fields
    }
    return fields.join(" ");
  };

  /**
   * Example function that can modify or log FEN fields if needed.
   * This function is optional – it just shows how you might intercept castling or special moves
   * and update the FEN string or track logs.
   */
  const updateFenFields = (fen, lastMove) => {
    const newGame = new Chess(fen);
    const updatedFen = newGame.fen();

    // Simple example: if the SAN notation shows castling, log that it happened
    if (lastMove.includes("O-O") || lastMove.includes("O-O-O")) {
      console.log("♜ Castling detected. Updating FEN fields if necessary.");
    }

    console.log("🔄 Board Updated - FEN:", updatedFen);
    return updatedFen;
  };

  /**
   * Whenever `position` (a FEN) is passed from the parent,
   * load that position into our local game state.
   */
  useEffect(() => {
    if (position) {
      try {
        const validFen = normalizeFen(position);
        setGame(new Chess(validFen));
      } catch (error) {
        console.error("Invalid FEN provided:", position, error);
      }
    }
  }, [position]);

  /**
   * Called by react-chessboard on a successful piece drop from square `from` to square `to`.
   */
  const handleMove = (from, to) => {
    // Clone our existing position
    const newGame = new Chess(game.fen());
    // Attempt to make the move in Chess.js
    const move = newGame.move({ from, to });

    if (move) {
      // If the move is valid, update the local game and notify the parent
      const updatedFen = updateFenFields(newGame.fen(), move.san);
      setGame(new Chess(updatedFen));
      // onMove callback notifies the parent component (page.tsx) of the new FEN
      onMove(updatedFen);
    }
  };

  return (
    <div className="w-full max-w-xl">
      <Chessboard
        position={game.fen()}
        onPieceDrop={(from, to) => handleMove(from, to)}
        customBoardStyle={{
          width: "480px",
          height: "480px",
          transition: "none",
        }}
      />
    </div>
  );
}
