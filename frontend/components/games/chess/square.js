import Image from "next/image";

export default function Square(props) {
  const theme = props.theme;
  const [i, j] = props.coords;
  const [xAxis, yAxis] = props.axis;
  const image = props.image;
  return (
    <div
      className={`relative flex justify-center items-center
      ${
        (i + j) % 2 == 1
          ? "bg-[#f0d9b5] text-[#b58863]"
          : "bg-[#b58863] text-[#f0d9b5]"
      }`}>
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className={`piece w-full h-full z-20`}></div>
      )}

      {i == 7 ? (
        <div className="absolute ml-1 bottom-0 left-0 text-xs md:text-sm">
          {xAxis[j]}
        </div>
      ) : (
        ""
      )}
      {j == 7 ? (
        <div className="absolute mr-1 top-0 right-0 text-xs md:text-sm">
          {yAxis[i]}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
