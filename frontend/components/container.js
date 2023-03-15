export default function Container(props) {
  return (
    <div
      className={` h-screen w-full transition-all ease-in duration-200  ${
        props.theme == "dark" ? "bg-gray-800" : "bg-slate-100"
      }`}>
      {props.children}
    </div>
  );
}
