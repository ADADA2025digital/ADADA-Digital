import { Link } from "react-router-dom";

function ButtonGlobal({
  text,
  type = "button",
  className = "",
  onClickClass = "",
  onClick,
  to,           
  ariaLabel,  
  children,
  ...props
}) {
  const classes = `btn globalbutton border-0 text-white rounded-pill heading ${className} ${onClickClass}`;
  const accessibleName = ariaLabel || text;

  // If "to" is provided, render a Link (navigation)
  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        aria-label={accessibleName}
        {...props}
      >
        {children || text}
      </Link>
    );
  }

  // Otherwise render a normal button (action)
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={accessibleName}
      {...props}
    >
      {children || text}
    </button>
  );
}

export default ButtonGlobal;
