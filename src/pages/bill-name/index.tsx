import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../common/button";
import { Input } from "../../common/input";
import { changeName } from "../../entity/bill-name/model";

const BillNameStyled = styled.div`
  width: 100%;
  max-width: 450px;
  height: 100%;
  display: flex;
  flex-direction: column;

  .top {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    height: 100%;
  }
`;

const BillName = () => {
  const [name, setName] = useState<string>("");

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    changeName(e.target.value);
  };
  return (
    <BillNameStyled>
      <div className="top">
        <h2>Введите название расчета</h2>

        <Input
          value={name}
          onChange={handleChangeName}
          placeholder="Название расчета"
        />
      </div>
      <div className="bottom">
        <Button
          color={"var(--tg-theme-button-text-color)"}
          background={"var(--tg-theme-button-color)"}
          active={!!name.length}
          navigateTo="/choose-contacts"
        >
          Далее
        </Button>
      </div>
    </BillNameStyled>
  );
};

export default BillName;
