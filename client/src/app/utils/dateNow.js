import React from "react";
import classes from "../style/style.module.css";

const DateNow = ({ value }) => {
  const time = [value.getHours(), value.getMinutes(), value.getSeconds()];
  const date = [value.getDate(), value.getMonth() + 1, value.getFullYear()];
  if (time[0] < 10) {
    time[0] = "0" + time[0];
  }
  if (time[1] < 10) {
    time[1] = "0" + time[1];
  }
  if (time[2] < 10) {
    time[2] = "0" + time[2];
  }
  if (date[1] < 10) {
    date[1] = "0" + date[1];
  }
  const currenTime = [time[0], time[1], time[2]].join(":");
  const currenDate = [date[0], date[1], date[2]].join(" / ");

  return (
    <div>
      <h2 className={classes.time}>{currenTime}</h2>
      <p className={classes.time}>{currenDate}</p>
    </div>
  );
};

export default DateNow;
