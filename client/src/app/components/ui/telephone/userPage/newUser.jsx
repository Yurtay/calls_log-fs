import React, { useEffect, useState } from "react";
import RadioField from "../../../common/form/radioField";
import TextField from "../../../common/form/textfield";
import { validator } from "../../../../utils/validator";
import { useDispatch } from "react-redux";
import { createUser } from "../../../../store/users";
import classes from "../../../../style/style.module.css";

const NewUser = () => {
  const [erros, setErros] = useState({});
  const [data, setData] = useState({
    name: "",
    number: "",
    filial: "",
  });
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

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
    dispatch(createUser(data));
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <h2 className={classes.textBtn}>Добавление нового абонента</h2>
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                type="text"
                value={data.name}
                label="Абонент"
                onChange={handleChange}
                error={erros.name}
                autoFocus
              />
              <TextField
                name="number"
                type="text"
                value={data.number}
                label="Номер"
                onChange={handleChange}
                error={erros.id}
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
              />

              <button
                disabled={!isValid}
                type="submit"
                className="btn btn-primary w-100 mx-auto"
              >
                Добавить
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewUser;
