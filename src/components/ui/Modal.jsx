import { useState } from "react";
import styled from "styled-components";

const ModalBody = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1;
    max-width: 300px;
    height: 100%;
    background-color: white;
    margin: auto 0 0 auto;
    padding: 20px;
    width: 60%;
    border-radius: 10px 0 0 10px;
    box-shadow: 0 0 7px 2px #888;
`;

export const Modal = ({ children, hideBtn, showBtn }) => {
  const [shouldShow, setShouldShow] = useState(false);

  return (
    <>
      <button onClick={() => setShouldShow(true)}> {showBtn} </button>
      {shouldShow && (
          <ModalBody
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button onClick={() => setShouldShow(false)}> {hideBtn} </button>
            {children}
          </ModalBody>
      )}
    </>
  );
};
