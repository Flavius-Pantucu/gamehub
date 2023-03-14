import TicTacToe from "./games/tictactoe/tictactoe";
import Sudoku from "./games/sudoku";
import NoPage from "../pages/nopage";

export default function Window(props) {
  const current = props.window;

  if (current == "TicTacToe")
    return <TicTacToe theme={props.theme} setToast={props.setToast} />;
  else if (current == "Sudoku")
    return <Sudoku theme={props.theme} setToast={props.setToast} />;
  else return <NoPage theme={props.theme} />;
}
