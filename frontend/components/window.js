import TicTacToe from "./games/tictactoe/tictactoe";
import Sudoku from "./games/sudoku";
import NoPage from "../pages/nopage";
import Dashboard from "./dashboard";

export default function Window(props) {
  const current = props.window;
  switch (current) {
    case "Dashboard":
      return <Dashboard />;
    case "TicTacToe":
      return <TicTacToe theme={props.theme} setToast={props.setToast} />;
    case "Sudoku":
      return <Sudoku theme={props.theme} setToast={props.setToast} />;
    default:
      return <NoPage theme={props.theme} />;
  }
}
