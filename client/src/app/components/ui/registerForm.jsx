import React, { useState, useEffect } from "react";
import TextField from "../common/form/textfield";
import { validator } from "../../utils/validator";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/regUser";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
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
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    password: {
      isRequired: {
        message: "Поле пароль обязательно для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру",
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8,
      },
    },
  };

  const validate = () => {
    const erros = validator(data, validatorConfig);
    setErros(erros);
    return Object.keys(erros).length === 0;
  };
  useEffect(() => {
    validate();
  }, [data]);
  const isValid = Object.keys(erros).length === 0;
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(signUp(data));
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

      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Отправить
      </button>
    </form>
  );
};

export default RegisterForm;
