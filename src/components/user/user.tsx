import React from "react";
import { TUser } from "../../entity/contacts";
import styled from "styled-components";
import Avatar from "./avatar";

const UserStyled = styled.div`
  width: 100%;
  max-width: 600px;
  background: var(--tg-theme-bg-color);
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 3px #0000002d;

  column-gap: 8px;

  &:hover {
    background: var(--tg-theme-secondary-bg-color);
  }
`;

type UserProps = TUser & {
  chosen: boolean;
};

const User = ({ id, name, photo, phone, chosen }: UserProps) => {
  return (
    <UserStyled>
      <Avatar photo={photo} />
      <div>
        <h4>{name}</h4>
      </div>
    </UserStyled>
  );
};

export default User;
