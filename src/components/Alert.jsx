import React from "react";

const Alert = ({ message }) => {
  return (
    <>
      {message === "" ? null : (
        <div
          id="alert"
          className="fixed z-50 bg-green-500 w-full mx-auto p-4 rounded-md mt-2 transition-all duration-700 ease-in-out"
        >
          {message}
        </div>
      )}
    </>
  );
};

export default Alert;
