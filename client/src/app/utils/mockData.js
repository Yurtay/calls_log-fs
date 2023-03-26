import { useEffect, useState } from "react";
import users from "../mockData/users.json";
import calls from "../mockData/calls.json";
import httpService from "../services/http.servise";

const useMockData = () => {
  const statusConsts = {
    idle: "Not Started",
    pending: "In Process",
    successed: "Ready",
    error: "Error occurred",
  };
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConsts.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = users.length + calls.length;
  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };
  const updateProgress = () => {
    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending);
    }
    const newProgress = Math.floor((count / summaryCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(statusConsts.successed);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);
  async function initialize() {
    try {
      for (const user of users) {
        await httpService.put("user/" + user.id, user);
        incrementCount();
      }
      for (const call of calls) {
        await httpService.put("call/" + call._id, call);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConsts.error);
    }
  }

  return { error, initialize, progress, status };
};

export default useMockData;
