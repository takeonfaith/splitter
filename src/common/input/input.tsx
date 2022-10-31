import React, { FC } from "react";
import styled from "styled-components";

const InputStyled = styled.div<{ width?: string }>`
  width: ${({ width }) => width ?? "100%"};

  input {
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 6px;
    background: #e0e0e0;
  }
`;

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  width?: string;
};

const Input: FC<Props> = ({ width, ...restProps }) => {
  return (
    <InputStyled width={width}>
      <input type="text" {...restProps} />
    </InputStyled>
  );
};

export default Input;
