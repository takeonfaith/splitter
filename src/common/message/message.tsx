import React from "react";
import styled from "styled-components";

const MessageStyled = styled.div`
  margin: auto;
  max-width: 250px;
  width: 100%;
  text-align: center;
  background: var(--tg-theme-secondary-bg-color);
  color: var(--tg-theme-hint-color);
  width: fit-content;
  padding: 10px;
  border-radius: 5px;

  h4 {
    margin-bottom: 8px;
  }
`;

type Props = {
  title?: string;
  children: React.ReactNode;
};

const Message = ({ title, children }: Props) => {
  return (
    <MessageStyled>
      {!!title && <h4>{title}</h4>}
      {children}
    </MessageStyled>
  );
};

export default Message;
