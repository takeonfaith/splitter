import styled from "styled-components";

const DividerStyled = styled.div<{ margin?: string }>`
  width: 100%;
  height: 0.5px;
  margin: ${({ margin }) => margin ?? "8px 0"};
  background: var(--tg-theme-hint-color);
  opacity: 0.6;
`;

export default DividerStyled;
