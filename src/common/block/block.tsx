import styled from "styled-components";

const BlockStyled = styled.div<{
  color?: string;
  background?: string;
  width?: string;
}>`
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 1px 3px #00000030;
  width: ${({ width }) => width ?? "100%"};
  color: ${({ color }) => color ?? "var(--tg-theme-text-color)"};
  background: ${({ background }) => background ?? "var(--tg-theme-bg-color)"};
`;

export default BlockStyled;
