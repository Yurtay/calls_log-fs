import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../../store/users";
import Loading from "../../common/loading";
import _ from "lodash";
import MyButton from "../myButton";

const TelephoneTable = ({ currentList }) => {
  const users = useSelector(getUsers());
  const [searchNumber, setSearchNumber] = useState("");
  const dispatch = useDispatch();
  const handleSearchNumber = ({ target }) => {
    setSearchNumber(target.value);
  };

  let filterUsers = [];
  if (currentList === 0) {
    filterUsers = users;
  } else if (currentList === 1) {
    filterUsers = users.filter((user) => user.filial === "kuphg");
  } else if (currentList === 2) {
    filterUsers = users.filter((user) => user.filial === "buavr");
  }
  const sortUsers = _.orderBy(filterUsers, ["number"], ["asc"]);

  const getFilterUsers = searchNumber
    ? sortUsers.filter((user) => user.number.indexOf(searchNumber) !== -1)
    : sortUsers;

  const handleDeleteUser = async (id) => {
    dispatch(deleteUser(id));
    console.log(id);
  };

  return (
    <>
      {users ? (
        <div className="d-flex justify-content-center p-3">
          <div className="container mt-1">
            <div className="row">
              <input
                type="text"
                name="search"
                placeholder="Поиск по номеру телефона..."
                onChange={handleSearchNumber}
                value={searchNumber}
              />
              {getFilterUsers.length !== 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Телефон</th>
                      <th scope="col">Абонент</th>
                      <th scope="col">Подробнее</th>
                      <th scope="col">Редактирование</th>
                      <th scope="col">Удаление</th>
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      {getFilterUsers.map((tel, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{tel.number}</td>
                          <td>{tel.name}</td>
                          <td>
                            <MyButton
                              path={`/telephonedirectory/${tel._id}`}
                              color="secondary"
                              label="Подробнее"
                              regularBtn={true}
                            />
                          </td>
                          <td>
                            <MyButton
                              path={`/telephonedirectory/${tel._id}/edit`}
                              color="secondary"
                              label="Редактировать"
                              regularBtn={true}
                            />
                          </td>
                          <td>
                            <MyButton
                              color="danger"
                              label="Удалить"
                              regularBtn={true}
                              onClick={() => handleDeleteUser(tel._id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </>
                  </tbody>
                </table>
              ) : (
                <h5>Результат не найден...</h5>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default TelephoneTable;
