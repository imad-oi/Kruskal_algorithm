import { useState } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
position  : fixed;
left : 0  ; 
top : 0 ; 
z-index : 1;
width : 100%;
height: 100%;
background-color : rgba(0,0,0,0.5);
overflow  : auto ;
`;

const ModalBody = styled.div`
  background-color : white  ; 
  margin  :  10% 20% ; 
  padding  : 20px ;
  width : 60%  ; 
  border-radius : 20px;
  `;

export const Modal = ({ children, hideBtn, showBtn }) => {
  const [shouldShow, setShouldShow] = useState(false);

  return (
    <>
      <button onClick={() => setShouldShow(true)}> {showBtn} </button>
      {shouldShow && (
        <ModalBackground
          onClick={() => {
            setShouldShow(false);
          }}
        >
          <ModalBody
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button onClick={() => setShouldShow(false)}> {hideBtn} </button>
            {children}
          </ModalBody>
        </ModalBackground>
      )}
    </>
  );
};
