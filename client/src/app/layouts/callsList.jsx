import React, { useEffect, useState } from "react";
import GroupList from "../components/ui/listGroupDate";
import Table from "../components/ui/table/table";
import getCurrentMonth from "../utils/currentMonth";

const CallsList = () => {
  const currentMonth = getCurrentMonth();
  const [selectedMonths, setSelectedMonths] = useState(currentMonth);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchNumber, setSearchNumber] = useState();

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonths]);

  const handleMonthsSelect = (item) => {
    setSelectedMonths(item);
  };
  const handleClearFilter = () => {
    setSelectedMonths(currentMonth);
    setCurrentPage(1);
  };
  const hadlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="d-flex justify-content-center">
      <GroupList
        onItemSelect={handleMonthsSelect}
        selectedItem={selectedMonths}
        onClearFilter={handleClearFilter}
      />

      <Table
        selectedMonths={selectedMonths}
        currentPage={currentPage}
        onPageChange={hadlePageChange}
      />
    </div>
  );
};

export default CallsList;
