
export default function Moves(props) {
    const createList = (moveList) => {
        for(var i = 0; i < moveList.length; i+=2) {
            if(i + 1 >= moveList.length){
                var move = (1 + i/2) + ". ";
                if(moveList[i].special == 'empassant' || moveList[i].special == 'capture')
                    move += whitePieces[moveList[i].piece] + xAxis[moveList[i].old_x] + "x" + xAxis[moveList[i].new_x] + yAxis[moveList[i].new_y];
                else if(moveList[i].special == 'short-castle' || moveList[i].special == 'long-castle')
                    moveList[i].special == 'short-castle' ? move += whitePieces[moveList[i].piece] + 'O-O' : move += whitePieces[moveList[i].piece] + 'O-O-O'; 
                else
                    move += whitePieces[moveList[i].piece] + xAxis[moveList[i].new_x] + yAxis[moveList[i].new_y];
            } else{
                var move = (1 + i/2) + ". ";
                if(moveList[i].special == 'empassant' || moveList[i].special == 'capture')
                    move += whitePieces[moveList[i].piece] + xAxis[moveList[i].old_x] + "x" + xAxis[moveList[i].new_x] + yAxis[moveList[i].new_y];
                else if(moveList[i].special == 'short-castle' || moveList[i].special == 'long-castle')
                    moveList[i].special == 'short-castle' ? move += whitePieces[moveList[i].piece] + 'O-O' : move += whitePieces[moveList[i].piece] + 'O-O-O'; 
                else
                    move += whitePieces[moveList[i].piece] + xAxis[moveList[i].new_x] + yAxis[moveList[i].new_y];
                
                move += " - ";

                if(moveList[i + 1].special == 'empassant' || moveList[i + 1].special == 'capture')
                    move += blackPieces[moveList[i + 1].piece] + xAxis[moveList[i + 1].old_x] + "x" + xAxis[moveList[i + 1].new_x] + yAxis[moveList[i + 1].new_y];
                else if(moveList[i + 1].special == 'short-castle' || moveList[i + 1].special == 'long-castle')
                    moveList[i + 1].special == 'short-castle' ? move += blackPieces[moveList[i + 1].piece] + 'O-O' : move += blackPieces[moveList[i + 1].piece] + 'O-O-O'; 
                else
                    move += blackPieces[moveList[i + 1].piece] + xAxis[moveList[i + 1].new_x] + yAxis[moveList[i + 1].new_y];
            }
            moves.push(move);
            moves.push((<br></br>))
        }
    } 
    const whitePieces = {'king' : '\u{2654}', 'queen' : '\u{2655}', 'rook' : '\u{2656}', 'bishop' : '\u{2657}', 'knight' : '\u{2658}', 'pawn' : '\u{2659}'};
    const blackPieces = {'king' : '\u{265A}', 'queen' : '\u{265B}', 'rook' : '\u{265C}', 'bishop' : '\u{265D}', 'knight' : '\u{265E}', 'pawn' : '\u{265F}'};
    const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const yAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];
    const moves = [];

    createList(props.moves);

    return (<><h1 className="text-white"> {moves}</h1></>);
}