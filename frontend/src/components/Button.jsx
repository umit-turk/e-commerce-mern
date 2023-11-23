import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="w-[200px] h-10 flex items-center justify-center text-lg bg-black rounded-md text-white"
      onClick={onclick}
    >
      {text}
    </button>
  );
};

export default Button;
