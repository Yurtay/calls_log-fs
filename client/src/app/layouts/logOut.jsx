import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/regUser";
const LogOut = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOut());
  }, []);
  return <h1>Выход из системы...</h1>;
};

export default LogOut;
