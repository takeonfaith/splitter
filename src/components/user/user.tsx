import { Event } from "effector";
import { useCallback } from "react";
import styled from "styled-components";
import { Button } from "../../common/button";
import { TUser } from "../../entity/contacts";
import Avatar from "./avatar";

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
  color: var(--tg-theme-text-color);

  .left {
    display: flex;
    align-items: center;
    width: 100%;
    column-gap: 8px;
  }
`;

type UserProps = TUser & {
  chosen?: boolean;
  onChoose?: Event<{ id: string }>;
  didPay?: boolean;
  paid?: number;
};

const User = ({
  id,
  name,
  photo,
  bank,
  onChoose,
  didPay,
  chosen = false,
}: UserProps) => {
  const handleChoose = useCallback(() => {
    onChoose?.({ id });
  }, [id, onChoose]);

  return (
    <UserStyled onClick={handleChoose} chosen={chosen}>
      <div className="left">
        <Avatar photo={photo} chosen={chosen} />
        <div>
          <h4>{name}</h4>
        </div>
      </div>
      <Button
        background={didPay ? "#388e3c" : "var(--tg-theme-secondary-bg-color)"}
        color="var(--tg-theme-text-color)"
        active
        width="fit-content"
      >
        Платил
      </Button>
    </UserStyled>
  );
};

export default User;
