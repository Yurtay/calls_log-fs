import React, { useState } from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../../components/common/pagination";
import _ from "lodash";
import { useSelector } from "react-redux";
import { getUsers } from "../../../store/users";
import { getCalls } from "../../../store/calls";
import Loading from "../../common/loading";

const Table = ({ selectedMonths, currentPage, onPageChange }) => {
  const users = useSelector(getUsers());
  const calls = useSelector(getCalls());
  const [searchNumber, setSearchNumber] = useState();
  const pageSize = 100;
  const [sortBy, setSortBy] = useState({ iter: "date", order: "asc" });
  const handleSearchNumber = ({ target }) => {
    setSearchNumber(target.value);
  };

  const filterCallsLogMonth = searchNumber
    ? calls?.filter((numb) => numb.numberOne.indexOf(searchNumber) !== -1)
    : selectedMonths
    ? calls?.filter((call) => call.date.slice(3, 5) === selectedMonths)
    : calls;
  const count = filterCallsLogMonth?.length;
  const handleSort = (item) => {
    setSortBy(item);
  };
  const sortCallsLog = _.orderBy(
    filterCallsLogMonth,
    [sortBy.iter],
    [sortBy.order]
  );
  const callsCrop = paginate(sortCallsLog, currentPage, pageSize);

  return (
    <>
      {calls ? (
        <div className="d-flex flex-column p-3">
          <input
            type="text"
            name="search"
            placeholder="Поиск по номеру телефона..."
            onChange={handleSearchNumber}
            value={searchNumber}
          />
          <table className="table">
            <TableHeader onSort={handleSort} currentSort={sortBy} />
            <TableBody calls={callsCrop} users={users} />
          </table>
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Table;
