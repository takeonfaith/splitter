import React from "react";
import { Input } from "../../common/input";
import { User } from "../../components/user";
import styled from "styled-components";
import { TUser } from "../../entity/contacts";

const SplitBillStyled = styled.div`
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const SplitBill = () => {
  const contacts = JSON.parse(
    localStorage.getItem("contacts") ?? "[]"
  ) as TUser[];
  console.log(contacts);

  return (
    <SplitBillStyled>
      <h2>Выберите участников</h2>
      <Input placeholder="Поиск контактов" />
      {contacts.map(({ name, login, bank }) => {
        return (
          <User id={name} name={name} photo={""} bank={bank} chosen={false} />
        );
      })}
    </SplitBillStyled>
  );
};

export default SplitBill;
