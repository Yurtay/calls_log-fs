import React, { useState, useEffect } from "react";
import TextField from "../common/form/textfield";
import { validator } from "../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/regUser";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const loginError = useSelector(getAuthErrors());
  const dispatch = useDispatch();
  const [erros, setErros] = useState({});

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
    },

    password: {
      isRequired: {
        message: "Поле пароль обязательно для заполнения",
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const erros = validator(data, validatorConfig);
    setErros(erros);
    return Object.keys(erros).length === 0;
  };
  const isValid = Object.keys(erros).length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(login({ payload: data }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        name="email"
        value={data.email}
        label="Электронная почта"
        onChange={handleChange}
        error={erros.email}
      />
      <TextField
        type="password"
        name="password"
        value={data.password}
        label="Пароль"
        onChange={handleChange}
        error={erros.password}
      />
      {loginError && <p className="text-danger">{loginError}</p>}
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
