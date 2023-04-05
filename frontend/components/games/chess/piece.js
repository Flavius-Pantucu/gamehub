import Image from "next/image";

export default function Piece(props) {
  const piece = "/images/" + props.piece;

  return <Image src={piece} alt="piece" width={50} height={50} />;
}
