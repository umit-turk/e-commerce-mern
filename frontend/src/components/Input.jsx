import React from "react";

const Input = ({ placeholder, value, name, id, type, onChange }) => {
  return (
    <input
      className="w-full my-2 h-10 p-2 outline-none rounded-md border"
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    />
  );
};

export default Input;
