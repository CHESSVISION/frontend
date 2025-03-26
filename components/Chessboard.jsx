"use client";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";

/**
 * Converts a FEN string (piece placement only) into an object mapping squares to piece codes.
 * For example, "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" becomes:
 * { a8: "bR", b8: "bN", …, a1: "wR", … }
 */
function fenToBoardState(fen) {
  const boardState = {};
  // We only need the piece placement portion if a full FEN is provided.
  const placement = fen.split(" ")[0];
  const rows = placement.split("/");
  // Row index 0 corresponds to rank 8, index 7 to rank 1.
  for (let i = 0; i < rows.length; i++) {
    let file = 0;
    for (const char of rows[i]) {
      if (/\d/.test(char)) {
        file += parseInt(char, 10);
      } else {
        const square = String.fromCharCode("a".charCodeAt(0) + file) + (8 - i);
        // Uppercase letters represent White pieces, lowercase represent Black.
        const color = char === char.toUpperCase() ? "w" : "b";
        boardState[square] = color + char.toUpperCase();
        file++;
      }
    }
  }
  return boardState;
}

/**
 * Converts a board state object into a FEN string.
 * Defaults are provided for active color, castling, en passant, half-move clock, and full move number.
 */
function boardStateToFen(
  boardState,
  activeColor = "w",
  castling = "KQkq",
  enPassant = "-",
  halfMoveClock = 0,
  fullMoveNumber = 1
) {
  const fenRows = [];
  // Process each rank from 8 to 1.
  for (let rank = 8; rank >= 1; rank--) {
    let emptyCount = 0;
    let fenRow = "";
    for (let file = 0; file < 8; file++) {
      const square = String.fromCharCode("a".charCodeAt(0) + file) + rank;
      const piece = boardState[square];
      if (piece) {
        if (emptyCount > 0) {
          fenRow += emptyCount;
          emptyCount = 0;
        }
        // The piece is stored as e.g. "wK". In FEN, white is uppercase, black is lowercase.
        let fenChar = piece[1];
        fenChar = piece[0] === "w" ? fenChar.toUpperCase() : fenChar.toLowerCase();
        fenRow += fenChar;
      } else {
        emptyCount++;
      }
    }
    if (emptyCount > 0) {
      fenRow += emptyCount;
    }
    fenRows.push(fenRow);
  }
  const piecePlacement = fenRows.join("/");
  return `${piecePlacement} ${activeColor} ${castling} ${enPassant} ${halfMoveClock} ${fullMoveNumber}`;
}

export default function MyChessboard({ position, onMove }) {
  // Initialize board state using the provided FEN position.
  const [boardState, setBoardState] = useState(() =>
    position
      ? fenToBoardState(position)
      : fenToBoardState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
  );

  // When the `position` prop changes (e.g., via navigation), update the board state.
  useEffect(() => {
    if (position) {
      const newBoard = fenToBoardState(position);
      setBoardState(newBoard);
      const newFen = boardStateToFen(newBoard);
      console.log("Board Updated via navigation - FEN:", newFen);
    }
  }, [position]);

  /**
   * Handles a piece drop by updating the board state without checking move legality.
   * After moving, it converts the board state to a FEN string, logs it, and calls the onMove callback.
   */
  const handleMove = (from, to) => {
    setBoardState((prevState) => {
      const newState = { ...prevState };
      if (newState[from]) {
        newState[to] = newState[from];
        delete newState[from];
      }
      const newFen = boardStateToFen(newState);
      console.log("Board Updated via move - FEN:", newFen);
      if (onMove) onMove(newFen);
      return newState;
    });
    // Return true to indicate the move has been handled.
    return true;
  };

  return (
    <div className="w-full max-w-xl">
      <Chessboard
        position={boardState}
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
