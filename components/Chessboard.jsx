"use client";
import { Chessboard } from "react-chessboard";

export default function MyChessboard({ position }) {
    return (
        <div className="w-full max-w-xl">
            <Chessboard
                position={position}
                customBoardStyle={{
                    borderRadius: "2px",
                    overflow: "hidden",
                }}
            />
        </div>
    );
}
