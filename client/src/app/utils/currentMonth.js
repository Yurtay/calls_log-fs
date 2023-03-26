const date = new Date();
const getCurrentMonth = () => {
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  return month;
};

export default getCurrentMonth;
