import React, { FC } from "react";
import styled from "styled-components";

const BlockStyled = styled.div`
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 1px 3px #00000030;
  background: var(--tg-theme-bg-color);
`;

const Block: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...restProps
}) => {
  return <BlockStyled {...restProps}>{children}</BlockStyled>;
};

export default Block;
