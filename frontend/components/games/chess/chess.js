import { Fragment, useRef, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ChessBoard from "./chess-board";

export default function Chess(props) {
  const grabPiece = (e) => {
    const element = e.target;
    selectedPieceRef.current = true;
    if (element.classList.contains("bg-no-repeat")) {
      const x =
        e.clientX - e.target.parentNode.offsetLeft - e.target.offsetWidth / 2;
      const y =
        e.clientY - e.target.parentNode.offsetTop - e.target.offsetHeight / 2;

      element.style.position = "absolute";
      element.style.left = x + "px";
      element.style.top = y + "px";
    }
  };

  const movePiece = (e) => {
    const element = e.target;
    if (
      selectedPieceRef.current &&
      element.classList.contains("bg-no-repeat")
    ) {
      const x =
        e.clientX - e.target.parentNode.offsetLeft - e.target.offsetWidth / 2;
      const y =
        e.clientY - e.target.parentNode.offsetTop - e.target.offsetHeight / 2;

      element.style.position = "absolute";
      element.style.left = x + "px";
      element.style.top = y + "px";
    }
  };

  const letPiece = (e) => {
    selectedPieceRef.current = false;
  };

  const theme = props.theme;

  const selectedPieceRef = useRef(false);

  return (
    <>
      <div className="mx-auto h-full w-full lg:w-5/6 max-w-7xl px-2 mt-2 sm:px-6 lg:px-8 select-none">
        <Menu as="div" className="relative inline-block">
          <div>
            <Menu.Button
              className={`inline-flex text-2xl transition-all ease-in duration-300 ${
                theme == "dark" ? "text-white" : "text-neutral-900"
              }`}>
              Chess
              <ChevronDownIcon className="ml-2 mt-2 h-5 w-5" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-in-out duration-300"
            enterFrom="transform opacity-0 scale-0"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in-out duration-300"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-0">
            <Menu.Items
              className={`absolute left-0 mt-2 ml-4 w-40 origin-top rounded-md shadow ${
                theme == "dark" ? "bg-slate-800" : "bg-slate-100"
              }`}>
              <Menu.Item
                className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                  theme == "dark"
                    ? "text-white hover:bg-gray-700"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
                }`}>
                <button className="text-sm ">New game (1P)</button>
              </Menu.Item>
              <Menu.Item
                className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                  theme == "dark"
                    ? "text-white hover:bg-gray-700"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
                }`}>
                <button className="text-sm ">New game (2P)</button>
              </Menu.Item>
              <Menu.Item
                className={` w-full cursor-pointer text-left rounded transition-colors ease-in-out duration-300 ${
                  theme == "dark"
                    ? "text-white hover:bg-gray-700"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-slate-300"
                }`}>
                <button className="text-sm ">Analysis</button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className="flex justify-center h-4/6 mt-6 lg:h-5/6 lg:mt-0">
          <div
            onMouseUp={(e) => letPiece(e)}
            onMouseMove={(e) => movePiece(e)}
            onMouseDown={(e) => grabPiece(e)}
            className="grid grid-rows-[8] grid-cols-8 aspect-square h-[90%] min-h-[384px] max-h-[384px] md:max-h-max cursor-pointer">
            <ChessBoard theme={theme}></ChessBoard>
          </div>
        </div>
      </div>
    </>
  );
}
