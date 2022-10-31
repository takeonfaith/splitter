import React, { FC } from "react";
import styled from "styled-components";

const InputStyled = styled.div`
  width: 100%;

  input {
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 6px;
    background: #e0e0e0;
  }
`;

const Input: FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...restProps
}) => {
  return (
    <InputStyled>
      <input type="text" {...restProps} />
    </InputStyled>
  );
};

export default Input;
