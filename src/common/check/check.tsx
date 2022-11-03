import React from "react";
import styled from "styled-components";
import { Check as CheckIcon } from "react-feather";

const CheckStyled = styled.div<{
  chosen: boolean;
  absolute: boolean;
  showEmptyCircle: boolean;
}>`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  position: ${({ absolute }) => (absolute ? "absolute" : "relative")};
  bottom: ${({ absolute }) => (absolute ? "-2px" : "0")};
  right: ${({ absolute }) => (absolute ? "-2px" : "0")};
  .inner-circle {
    border-radius: 100%;
    width: 20px;
    height: 20px;
    transform: ${({ chosen }) => (chosen ? "scale(1)" : "scale(0.8)")};
    opacity: ${({ chosen }) => (chosen ? "1" : "0")};
    transition: 0.2s transform, 0.2s opacity;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--tg-theme-button-color);
  }
  outline: ${({ showEmptyCircle }) =>
    showEmptyCircle ? "2px solid #000" : "2px solid var(--tg-theme-bg-color)"};

  svg {
    width: 12px !important;
    color: #fff;
  }
`;

type Props = {
  absolute?: boolean;
  chosen: boolean;
  showEmptyCircle?: boolean;
};

const Check = ({ chosen, absolute = true, showEmptyCircle = false }: Props) => {
  return (
    <CheckStyled
      chosen={chosen}
      absolute={absolute}
      showEmptyCircle={showEmptyCircle}
    >
      <div className="inner-circle">
        <CheckIcon />
      </div>
    </CheckStyled>
  );
};

export default Check;
