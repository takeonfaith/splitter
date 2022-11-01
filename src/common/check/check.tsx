import React from "react";
import styled from "styled-components";
import { Check as CheckIcon } from "react-feather";

const CheckStyled = styled.div<{ chosen: boolean }>`
  width: 20px;
  height: 20px;
  transform: ${({ chosen }) => (chosen ? "scale(1)" : "scale(0.9)")};
  opacity: ${({ chosen }) => (chosen ? "1" : "0")};
  transition: 0.2s transform, 0.2s opacity;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -2px;
  right: -2px;
  background: red;
  border: 2px solid var(--tg-theme-bg-color);

  svg {
    width: 12px !important;
    color: #fff;
  }
`;

type Props = {
  chosen: boolean;
};

const Check = ({ chosen }: Props) => {
  return (
    <CheckStyled chosen={chosen}>
      <CheckIcon />
    </CheckStyled>
  );
};

export default Check;
