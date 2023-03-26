import React from "react";
import avt from "../../img/avt.jpg";
import MyButton from "./myButton";
import classes from "../../style/style.module.css";

function NavProfile({ currentUser }) {
  return (
    <div className="dropdown">
      <div className="dropdown d-flex align-items-center">
        <div className="me-2">
          <h5 className={classes.textBtn}>{currentUser.email}</h5>
        </div>
        <div>
          <img
            src={avt}
            alt=""
            height="60"
            className="img-responsive rounded-circle m-3"
          />
          <MyButton label="Выйти" path="/logout" />
        </div>
      </div>
    </div>
  );
}

export default NavProfile;
