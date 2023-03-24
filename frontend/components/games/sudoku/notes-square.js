export default function NotesSquare(props) {
  const notes = props.notes;

  return (
    <div className="w-full h-full p-1.5">
      <div className="w-full h-full grid grid-cols-3 grid-rows-3">
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.one}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.two}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.three}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.four}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.five}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.six}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.seven}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.eight}
        </div>
        <div className="text-xs font-mono self-center justify-self-center text-gray-300/70">
          {notes.nine}
        </div>
      </div>
    </div>
  );
}
