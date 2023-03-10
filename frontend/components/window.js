import TicTacToe from "./games/tictactoe/tictactoe";
import Sudoku from "./games/sudoku";
import NoPage from "../pages/nopage";

export default function Window(props) {
  const current = props.window;

  if (current == "TicTacToe") return <TicTacToe />;
  else if (current == "Sudoku") return <Sudoku />;
  else return <NoPage />;
}
