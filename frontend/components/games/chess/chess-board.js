export default function ChessBoard(props) {
  const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const theme = props.theme;

  const createBoard = () => {
    var board = [];
    for (var i = yAxis.length - 1; i >= 0; i--) {
      for (var j = 0; j < xAxis.length; j++) {
        board.push(
          <div
            className={`h-full w-full relative text-white flex justify-center items-center
              ${(i + j) % 2 == 1 ? "bg-[#f0d9b5]" : "bg-[#b58863]"}`}>
            {i == 0 ? (
              <div className="absolute ml-1 bottom-0 left-0 text-xs md:text-base">
                {" "}
                {xAxis[j]}{" "}
              </div>
            ) : (
              ""
            )}
            {j == 7 ? (
              <div className="absolute mr-1 top-0 right-0 text-xs md:text-base">
                {" "}
                {yAxis[i]}{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        );
      }
    }
    return board;
  };

  return createBoard();
}
