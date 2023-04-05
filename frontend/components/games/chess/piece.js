import Image from "next/image";

export default function Piece(props) {
  const [i,j] = props.coords;
  if(i == 6)
    return <Image src={"/images/bP.svg"} alt="piece" fill className="p-2" />;
  else if(i == 1)
    return <Image src={"/images/wP.svg"} alt="piece" fill className="p-2" />;
  else if(i== 0 && (j == 0 || j == 7))
    return <Image src={"/images/wR.svg"} alt="piece" fill className="p-2" />;
  else if(i== 7 && (j == 0 || j == 7))
    return <Image src={"/images/bR.svg"} alt="piece" fill className="p-2" />;
  else if(i== 0 && (j == 1 || j == 6))
    return <Image src={"/images/wN.svg"} alt="piece" fill className="p-2" />;
  else if(i== 7 && (j == 1 || j == 6))
    return <Image src={"/images/bN.svg"} alt="piece" fill className="p-2" />;
  else if(i== 0 && (j == 2 || j == 5))
    return <Image src={"/images/wB.svg"} alt="piece" fill className="p-2" />;
  else if(i== 7 && (j == 2 || j == 5))
    return <Image src={"/images/bB.svg"} alt="piece" fill className="p-2" />;
  else if(i== 0 && j == 3)
    return <Image src={"/images/wQ.svg"} alt="piece" fill className="p-2" />;
  else if(i== 7 && j == 3)
    return <Image src={"/images/bQ.svg"} alt="piece" fill className="p-2" />;
  else if(i== 0 && j == 4)
    return <Image src={"/images/wK.svg"} alt="piece" fill className="p-2" />;
  else if(i== 7 && j == 4)
    return <Image src={"/images/bK.svg"} alt="piece" fill className="p-2" />;
}
