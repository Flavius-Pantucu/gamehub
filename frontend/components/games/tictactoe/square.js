import Image from "next/image";

export default function Square(props) {
  const state = props.state;

  if (state == "x")
    return (
      <Image
        src="/images/tictactoe-x.png"
        alt="X"
        width={75}
        height={75}
        className="opacity-90"></Image>
    );
  else if (state == "o")
    return (
      <Image
        src="/images/tictactoe-o.png"
        alt="O"
        width={85}
        height={85}
        className="opacity-90"></Image>
    );
  else return "";
}
