import React from "react";
import avt from "../../../../img/avt.jpg";
import { useHistory } from "react-router-dom";

const UserCard = ({ user }) => {
  console.log(user);
  const history = useHistory();
  const handlePageBack = () => {
    history.push("/telephonedirectory");
  };
  const handleClickEdit = () => {
    history.push(history.location.pathname + "/edit");
  };
  const getNameFilial = () => {
    let name = "";
    if (user.filial === "kuphg") {
      name = "Канчуринское УПХГ";
    } else if (user.filial === "buavr") {
      name = "Башкирский УАВР";
    } else {
      name = "Внешний абонент";
    }
    return name;
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img src={avt} className="rounded-circle" width="150" />

          <div className="mt-3">
            <h4>{user.name}</h4>

            <h4>
              Филиал: <small>{getNameFilial()}</small>
            </h4>
            <p className="text-secondary mb-1">Телефон: {user.number}</p>
            <hr />
            <button className="btn btn-primary m-3" onClick={handlePageBack}>
              Назад
            </button>
            <button className="btn btn-primary m-3" onClick={handleClickEdit}>
              Изменить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
