import Tile from "./tile";

export default function ChessBoard(props) {
  const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const theme = props.theme;

  const createBoard = () => {
    var board = [];
    for (var i = yAxis.length - 1; i >= 0; i--) {
      for (var j = 0; j < xAxis.length; j++) {
        board.push(
          <Tile key={[i,j]} theme={theme} coords={[i, j]} values={[xAxis, yAxis]} />
        );
      }
    }
    return board;
  };

  return createBoard();
}
