import React from "react";

const Alert = ({ message }) => {
  return (
    <>
      {message === "" ? null : (
        <div
          id="alert"
          className="fixed z-5 bg-red-200 w-full mx-auto p-4 rounded-md mt-2 transition-all duration-700 ease-in-out"
        >
          <p className="text-red-700 font-bold">{message}</p>
        </div>
      )}
    </>
  );
};

export default Alert;
