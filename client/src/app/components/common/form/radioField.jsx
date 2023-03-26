import React from "react";

const RadioField = ({ label, name, value, onChange, options }) => {
  return (
    <div className="mb-4">
      <label htmlFor="form-label">{label}</label>

      {options.map((option, index) => (
        <div className="form-check form-check-inline" key={index}>
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={option.name + "_" + option.value}
            checked={option.value === value}
            value={option.value}
            onChange={onChange}
          />
          <label
            htmlFor={option.name + "_" + option.value}
            className="form-check-label"
          >
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioField;
