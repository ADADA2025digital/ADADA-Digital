import { Link } from "react-router-dom";

function ButtonGlobal({
  text,
  type = "button",
  className = "",
  onClickClass = "",
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn globalbutton border-0 text-white rounded-pill heading ${className} ${onClickClass}`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
}

export default ButtonGlobal;
