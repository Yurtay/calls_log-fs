import React, { useCallback, useEffect, useState } from "react";
import RadioField from "../../../common/form/radioField";
import TextField from "../../../common/form/textfield";
import { validator } from "../../../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../../../../store/users";

const UserPageEdit = ({ userId }) => {
  const dispatch = useDispatch();
  const [erros, setErros] = useState({});
  const user = useSelector(getUserById(userId));
  console.log("user edit", user);
  const [data, setData] = useState({
    _id: "",
    name: "",
    number: "",
    filial: "",
  });
  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  useEffect(() => {
    if (user)
      setData({
        _id: user._id,
        name: user.name,
        number: user.number,
        filial: user.filial,
      });
  }, [user]);

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Поле абонент не может быть пустым",
      },
    },
    number: {
      isRequired: {
        message: "Не должно быть пустым",
      },
      isDigit: {
        message: "Только цифры",
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(updateUser(data));
  };

  const handleKeyDown = useCallback((event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const form = event.target.form;
      const indexField = Array.prototype.indexOf.call(form, event.target);
      form.elements[indexField + 1].focus();
    }
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <h2>Редактирование абонентов</h2>
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                type="text"
                value={data.name}
                label="Абонент"
                onChange={handleChange}
                error={erros.name}
                autoFocus
                onKeyDown={handleKeyDown}
              />
              <TextField
                name="number"
                type="text"
                value={data.number}
                label="Номер"
                onChange={handleChange}
                error={erros.number}
                onKeyDown={handleKeyDown}
              />
              <RadioField
                options={[
                  { name: "КУПХГ", value: "kuphg" },
                  { name: "БУАВР", value: "buavr" },
                  { name: "Внешние абоненты", value: "other" },
                ]}
                value={data.filial}
                name="filial"
                onChange={handleChange}
                label=""
                onKeyDown={handleKeyDown}
              />
              <button
                disabled={!isValid}
                type="submit"
                className="btn btn-primary w-100 mx-auto"
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPageEdit;
