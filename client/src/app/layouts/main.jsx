import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRegUser } from "../store/regUser";

const Main = () => {
  const currentUser = useSelector(getRegUser());

  return (
    <div className="d-flex p-2 bd-highlight justify-content-center">
      <hr />
      {currentUser ? (
        <div>
          <h5>
            Добро пожаловать:
            <span className="text-primary">{currentUser.email}</span>
          </h5>
          <Link to="/callslist">
            <button className="btn btn-primary">
              Перейти к просмотру журнала....
            </button>
          </Link>
        </div>
      ) : (
        <h5>Для просмотра журнала звонков необходимо войти в систему... </h5>
      )}

      <hr />
    </div>
  );
};

export default Main;
