import React from "react";

const TableHeader = ({ onSort, currentSort }) => {
  const handleSort = (item) => {
    if (currentSort.iter === item) {
      onSort({
        ...currentSort,
        order: currentSort.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSort({ iter: item, order: "asc" });
    }
  };
  const renderSortArrow = () => {};

  return (
    <>
      <thead className="table-primary">
        <tr>
          <th scope="col">#</th>
          <th onClick={() => handleSort("date")} scope="col" role="button">
            Дата/время {<i class="bi bi-arrow-down-up"></i>}
          </th>
          <th scope="col">Направление</th>
          <th onClick={() => handleSort("numberOne")} scope="col" role="button">
            Номер (кто) {<i class="bi bi-arrow-down-up"></i>}
          </th>
          <th scope="col">Контакт (кто)</th>
          <th scope="col">Номер (кому)</th>
          <th scope="col">Контакт (кому)</th>
          <th onClick={() => handleSort("duration")} scope="col" role="button">
            Длительность разговора {<i class="bi bi-arrow-down-up"></i>}
          </th>
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;
