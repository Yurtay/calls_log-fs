import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CallsList from "./layouts/callsList";
import Login from "./layouts/login";
import TelephoneDirectory from "./layouts/telephoneDirectory";
import NavBar from "./components/ui/navBar";
// import { ToastContainer } from "react-toastify";
import Main from "./layouts/main";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";
import RegisterForm from "./components/ui/registerForm";

const App = () => {
  return (
    <>
      <AppLoader>
        <NavBar />
        <Switch>
          <Route path="/login/:type?" component={Login} />
          <Route path="/register" component={RegisterForm} />

          <ProtectedRoute path="/callslist" component={CallsList} />
          <Route
            path="/telephonedirectory/:userId?/:edit?"
            component={TelephoneDirectory}
          />
          <Route path="/logout" component={LogOut} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </AppLoader>
      {/* <ToastContainer /> */}
    </>
  );
};

export default App;
