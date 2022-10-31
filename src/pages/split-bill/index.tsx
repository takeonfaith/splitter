/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Input } from "../../common/input";
import { User } from "../../components/user";
import styled from "styled-components";
import { TUser } from "../../entity/contacts";
import { Button } from "../../common/button";

const SplitBillStyled = styled.div`
  width: 100%;
  max-width: 550px;
  height: 100%;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  .users {
    height: 100%;
    padding: 0px 2px;
    overflow-y: auto;
  }
`;

const SplitBill = () => {
  const contacts = JSON.parse(
    localStorage.getItem("contacts") ?? "[]"
  ) as TUser[];
  const [chosenContacts, setChosenContacts] = useState<string[]>([]);
  const isActive = chosenContacts.length >= 2;
  console.log(contacts);

  return (
    <SplitBillStyled>
      <h2>Выберите участников</h2>
      <Input placeholder="Поиск контактов" />
      <div className="users">
        {contacts.map(({ name, login, bank }) => {
          return (
            <User id={name} name={name} photo={""} bank={bank} chosen={false} />
          );
        })}
      </div>
      <Button
        background="var(--tg-theme-button-color)"
        color="var(--tg-theme-button-text-color)"
        active={isActive}
      >
        Далее
      </Button>
    </SplitBillStyled>
  );
};

export default SplitBill;
