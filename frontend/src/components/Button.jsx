import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="w-full h-10 flex items-center justify-center text-lg bg-black rounded-md text-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
