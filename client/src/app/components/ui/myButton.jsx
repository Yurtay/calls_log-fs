import React from "react";
import { Link } from "react-router-dom";
import classes from "../../style/style.module.css";

const MyButton = ({
  path,
  label,
  color = "outline-primary m-2",
  regularBtn = false,
  ...props
}) => {
  return (
    <button {...props} className={"btn btn-" + color}>
      <Link
        className={regularBtn ? "nav-link text-white p-0" : "nav-link"}
        to={path}
      >
        {regularBtn ? label : <h4 className={classes.textBtn}>{label}</h4>}
      </Link>
    </button>
  );
};

export default MyButton;
