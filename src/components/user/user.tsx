import React, { useCallback } from "react";
import { TUser } from "../../entity/contacts";
import styled from "styled-components";
import Avatar from "./avatar";
import { Event } from "effector";
import { Check } from "react-feather";

const UserStyled = styled.div<{ chosen: boolean }>`
  width: 100%;
  max-width: 600px;
  background: var(--tg-theme-bg-color);
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 3px #0000002d;

  column-gap: 8px;

  .checkbox {
    width: ${({ chosen }) => (chosen ? "25px" : "0")};
    opacity: ${({ chosen }) => (chosen ? "1" : "0")};
    transition: 0.2s width;
    height: 25px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--tg-theme-button-color);

    svg {
      width: 14px;
      height: 14px;
    }
  }

  &:hover {
    background: var(--tg-theme-secondary-bg-color);
  }
`;

type UserProps = TUser & {
  chosen: boolean;
  onChoose: Event<{ id: string }>;
};

const User = ({ id, name, photo, bank, chosen, onChoose }: UserProps) => {
  const handleChoose = useCallback(() => {
    onChoose({ id });
  }, [id, onChoose]);

  return (
    <UserStyled onClick={handleChoose} chosen={chosen}>
      <div className="checkbox">
        <Check />
      </div>
      <Avatar photo={photo} />
      <div>
        <h4>{name}</h4>
      </div>
    </UserStyled>
  );
};

export default User;
