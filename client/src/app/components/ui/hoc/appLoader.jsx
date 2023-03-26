import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCallsList } from "../../../store/calls";
import { getIsLoggedIn, loadRegUser } from "../../../store/regUser";
import { loadUsersList } from "../../../store/users";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  useEffect(() => {
    dispatch(loadUsersList());
    dispatch(loadCallsList());
    if (isLoggedIn) {
      dispatch(loadRegUser());
    }
  }, [isLoggedIn]);
  return children;
};

export default AppLoader;
