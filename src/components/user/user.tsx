import { Event } from "effector";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { Button } from "../../common/button";
import { Input } from "../../common/input";
import { TUser } from "../../entity/contacts";
import { changePayer } from "../../entity/contacts/model";
import Avatar from "./avatar";

const UserStyled = styled.div<{ chosen: boolean }>`
  width: 100%;
  max-width: 600px;
  background: var(--tg-theme-bg-color);
  padding: 10px;
  border-radius: 6px;
  display: flex;
  box-shadow: 0 2px 3px #0000002d;
  column-gap: 8px;
  color: var(--tg-theme-text-color);
  flex-direction: column;
  row-gap: 8px;

  .user-basic {
    display: flex;
    align-items: center;
  }

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
  canPay?: boolean;
  paid?: number;
};

const User = ({
  id,
  name,
  photo,
  bank,
  onChoose,
  canPay,
  chosen = false,
}: UserProps) => {
  const [didPay, setDidPay] = useState(false);
  const [sum, setSum] = useState<number | undefined>();

  const handleChangePay = () => {
    setDidPay((prev) => !prev);
  };

  const handleChangeSum = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSum(Number.parseFloat(e.target.value));
    changePayer({ name, sum: Number.parseFloat(e.target.value) });
  };

  const handleChoose = useCallback(() => {
    onChoose?.({ id });
  }, [id, onChoose]);

  return (
    <UserStyled chosen={chosen}>
      <div className="user-basic" onClick={handleChoose}>
        <div className="left">
          <Avatar photo={photo} chosen={chosen} />
          <div>
            <h4>{name}</h4>
          </div>
        </div>
        {canPay !== undefined && (
          <Button
            background={
              didPay ? "#388e3c" : "var(--tg-theme-secondary-bg-color)"
            }
            color="var(--tg-theme-text-color)"
            active
            width="fit-content"
            onClick={handleChangePay}
          >
            Платил
          </Button>
        )}
      </div>
      {didPay && (
        <Input
          width="100%"
          type="number"
          placeholder="Сколько заплатил?"
          value={sum}
          onChange={handleChangeSum}
        />
      )}
    </UserStyled>
  );
};

export default User;
