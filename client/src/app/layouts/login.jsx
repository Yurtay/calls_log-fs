import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
  const toggleFormType = (params) => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            {formType === "register" ? (
              <>
                <h3 className="mb-4 text-primary">Регистрация</h3>
                <RegisterForm />
                <p>
                  У вас уже есть аккаунт?
                  <a
                    role="button"
                    onClick={toggleFormType}
                    className="text-primary"
                  >
                    Войти
                  </a>
                </p>
              </>
            ) : (
              <>
                <h3 className="mb-4 text-primary">Вход в ситему</h3>
                <LoginForm />
                <p>
                  У вас нет аккаунта?
                  <a
                    role="button"
                    onClick={toggleFormType}
                    className="text-primary"
                  >
                    Зарегистрироваться
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
