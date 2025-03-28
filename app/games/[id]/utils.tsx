// Helper map for chess pieces
export const pieceSymbols: Record<string, string> = {
    p: "", // Pawn
    n: "♘",
    b: "♗",
    r: "♖",
    q: "♕",
    k: "♔",
    P: "",
    N: "♞",
    B: "♝",
    R: "♜",
    Q: "♛",
    K: "♚",
};

// Convert FEN to a 2D board array
export const fenToBoard = (fen: string): string[][] => {
    const rows = fen.split(" ")[0].split("/");
    return rows.map((row) =>
        row
            .replace(/\d/g, (digit) => " ".repeat(parseInt(digit)))
            .split("")
    );
};

export const convertMoveToChessNotation = (move: string, board: string[][]): string => {
    const fromFile = move.charCodeAt(0) - "a".charCodeAt(0);
    const fromRank = 8 - parseInt(move[1]);
    const toFile = move.charCodeAt(2) - "a".charCodeAt(0);
    const toRank = 8 - parseInt(move[3]);
    const piece = board[fromRank][fromFile];
    const toSquare = move.slice(2, 4);

    // 🏰 Castling logic FIRST (before looking at captures)
    if (piece === 'K' && (move === 'e1h1' || move === 'e1g1')) return 'O-O';
    if (piece === 'K' && (move === 'e1a1' || move === 'e1c1')) return 'O-O-O';
    if (piece === 'k' && (move === 'e8h8' || move === 'e8g8')) return 'O-O';
    if (piece === 'k' && (move === 'e8a8' || move === 'e8c8')) return 'O-O-O';

    const targetPiece = board[toRank][toFile];
    const pieceSymbol = pieceSymbols[piece] || "";
    const captureSymbol = targetPiece.trim() !== "" ? "x" : "";

    // ♟️ Pawn moves
    if (pieceSymbol === "") {
        if (captureSymbol) {
            return `${move[0]}x${toSquare}`;
        }
        return `${toSquare}`;
    }

    // Normal piece move
    return `${pieceSymbol}${captureSymbol}${toSquare}`;
};

export const normalizeFen = (fen: string): string => {
    if (!fen) return "start";
    const fields = fen.trim().split(" ");
    if (fields.length === 1) {
        return `${fields[0]} w KQkq - 0 1`;
    }
    while (fields.length < 6) {
        if (fields.length === 1) fields.push("w");
        else if (fields.length === 2) fields.push("KQkq");
        else if (fields.length === 3) fields.push("-");
        else if (fields.length === 4) fields.push("0");
        else if (fields.length === 5) fields.push("1");
    }
    return fields.join(" ");
};
