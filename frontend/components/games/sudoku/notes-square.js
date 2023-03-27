import { useEffect } from "react";

export default function NotesSquare(props) {
  const notes = props.notes;
  useEffect(() => {
    console.log(notes);
  }, []);
  return (
    <div className="w-full h-full p-1.5">
      <div className="w-full h-full grid grid-cols-3 grid-rows-3">
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.one ? "1" : ""}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.two ? "2" : ""}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.three ? "3" : ""}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.four ? "4" : ""}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.five ? "5" : ""}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.six ? "6" : ""}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.seven ? "7" : ""}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.eight ? "8" : ""}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.nine ? "9" : ""}
        </div>
      </div>
    </div>
  );
}
