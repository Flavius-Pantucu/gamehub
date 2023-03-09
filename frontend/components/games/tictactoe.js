import Image from "next/image";

export default function TicTacToe(props) {
  function createImage() {
    return '<Image src="/images/tictactoe-x.png" width="75" height="75" className="opacity-50" </Image>';
  }

  function chooseBlock(block) {
    const blk = document.getElementById(block);
    console.log(createImage());

    blk.innerHTML = createImage();
  }

  return (
    <div className="mt-10 mx-auto w-4/5 max-w-7xl px-2 sm:px-6 lg:px-8">
      <h1 className="text-3xl text-white">TicTacToe</h1>
      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-3">
          <div className="flex w-32 h-32 items-center justify-center border-r-2 border-b-2 text-white cursor-pointer">
            <Image
              src="/images/tictactoe-x.png"
              alt="X"
              width={75}
              height={75}
              className="opacity-90"></Image>
          </div>
          <div className="flex w-32 h-32 items-center justify-center border-r-2 border-l-2 border-b-2 text-white cursor-pointer">
            <Image
              src="/images/tictactoe-o.png"
              alt="O"
              width={85}
              height={85}
              className="opacity-90"></Image>
          </div>
          <div className="flex w-32 h-32 items-center justify-center border-l-2 border-b-2 text-white cursor-pointer"></div>
          <div className="flex w-32 h-32 items-center justify-center border-t-2 border-r-2 border-b-2 text-white cursor-pointer"></div>
          <div className="flex w-32 h-32 items-center justify-center border-2 text-white cursor-pointer"></div>
          <div className="flex w-32 h-32 items-center justify-center border-l-2 border-t-2 border-b-2 text-white cursor-pointer"></div>
          <div className="flex w-32 h-32 items-center justify-center border-t-2 border-r-2 text-white cursor-pointer"></div>
          <div className="flex w-32 h-32 items-center justify-center border-t-2 border-l-2 border-r-2 text-white cursor-pointer"></div>
          <div
            id="block-9"
            onClick={() => {
              chooseBlock("block-9");
            }}
            className="flex w-32 h-32 items-center justify-center border-l-2 border-t-2 text-white cursor-pointer"></div>
        </div>
      </div>
    </div>
  );
}
