export default function TicTacToe(props) {
  return (
    <div className="mt-10 mx-auto w-4/5 max-w-7xl px-2 sm:px-6 lg:px-8">
      <h1 className="text-3xl text-white">TicTacToe</h1>
      <div className="columns-3 md:columns-4 hover:columns-2">
        <div className="w-full">1</div>
        <div className="w-full">2</div>
        <div className="w-full">3</div>
      </div>
    </div>
  );
}
