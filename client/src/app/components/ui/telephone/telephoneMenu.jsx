import { Link } from "react-router-dom";

const TelephoneMenu = ({ onSort, selectedItem }) => {
  const nameMenu = ["Все абоненты", "Канчуринское УПХГ", "Башкирский УАВР"];

  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 p-3 mt-1">
        <ul className="list-group m-3">
          {nameMenu.map((name, index) => (
            <li
              key={index}
              className={
                "list-group-item" + (index === selectedItem ? " active" : "")
              }
              role="button"
              onClick={() => onSort(index)}
            >
              {name}
            </li>
          ))}
        </ul>
        <Link to={"/telephonedirectory/new"}>
          <button className="btn btn-success p-2 m-3">Добавить абонента</button>
        </Link>
      </div>
    </>
  );
};

export default TelephoneMenu;
