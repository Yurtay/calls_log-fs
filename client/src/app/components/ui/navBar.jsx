import { useSelector } from "react-redux";
import { getIsLoggedIn, getRegUser } from "../../store/regUser";
import NavProfile from "./navProfile";
import phg from "../../img/phg.png";
import DateNow from "../../utils/dateNow";
import { useState, useEffect } from "react";
import MyButton from "./myButton";
import classes from "../../style/style.module.css";

const NavBar = () => {
  const currentUser = useSelector(getRegUser());
  const [value, setValue] = useState(new Date());
  const isLoggedIn = useSelector(getIsLoggedIn());
  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <nav className="navbar navbar-light bg-light m-3">
      <div className="container-fluid">
        <DateNow value={value} />

        <img src={phg} alt="" className="d-inline-block align-text-top" />
        {isLoggedIn ? (
          <ul className="nav">
            <li className="nav-item">
              <MyButton path="/" label="Главная" />
            </li>
            <li className="nav-item">
              <MyButton path="/callslist" label="Журнал вызовов" />
            </li>
            <li className="nav-item">
              <MyButton path="/telephonedirectory" label="Справочник" />
            </li>
          </ul>
        ) : (
          <h1 className={classes.textBtn}>-Calls log-</h1>
        )}
        {currentUser ? (
          <NavProfile currentUser={currentUser} />
        ) : (
          <MyButton path="/login" label="Войти" />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
