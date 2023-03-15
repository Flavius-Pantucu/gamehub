import { Menu } from "@headlessui/react";

export default function Sudoku(props) {
  const theme = props.theme;

  return (
    <div className="mx-auto h-5/6 w-4/5 max-w-7xl px-2 sm:px-6 lg:px-8">
      <Menu as="div" className="relative inline-block">
        <div>
          <Menu.Button
            className={` inline-flex text-2xl transition-all ease-in duration-300 ${
              theme == "dark" ? "text-white" : "text-neutral-900"
            }`}>
            Sudoku
          </Menu.Button>
        </div>
      </Menu>
    </div>
  );
}
