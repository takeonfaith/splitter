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
    background: var(--tg-theme-secondary-bg-color);
    color: var(--tg-theme-text-color);
  }

  input::placeholder {
    color: var(--tg-theme-hint-color);
  }
`;

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  width?: string;
};

const Input: FC<Props> = ({ width, ref, ...restProps }) => {
  return (
    <InputStyled width={width}>
      <input type={restProps.type ?? "text"} ref={ref} {...restProps} />
    </InputStyled>
  );
};

export default Input;
