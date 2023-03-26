import React from "react";

const TableBody = ({ calls, users }) => {
  const getUserByNumber = (numb) => {
    const filterUsers = users.filter((user) => {
      return user.number === numb;
    });

    return filterUsers.length > 0
      ? filterUsers[0].name
      : "Добавить в справочник";
  };
  const getDirection = (direction) => {
    if (direction === "T") {
      return "Транзит";
    } else if (direction === "I") {
      return "Входящий";
    } else if (direction === "O") {
      return "Исходящий внш.";
    } else if (direction === "L") {
      return "Исходящий внтр.";
    }
  };

  return (
    <>
      <tbody>
        {calls.map((item, index) => (
          <tr key={item._id}>
            <td>{index}</td>
            <td>{item.date}</td>
            <td>{getDirection(item.direction)}</td>
            <td>{item.numberOne}</td>
            <td>{getUserByNumber(item.numberOne)}</td>
            <td>{item.numberTwo}</td>
            <td>{getUserByNumber(item.numberTwo)}</td>
            <td>{item.duration}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TableBody;
