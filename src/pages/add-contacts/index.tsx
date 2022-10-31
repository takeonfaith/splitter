import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../common/button";
import { Input } from "../../common/input";
import { v4 as uuidv4 } from "uuid";

const AddContactsStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  justify-content: space-between;

  .list {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
`;

const AddContacts = () => {
  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [bank, setBank] = useState<string>("");
  const isActive = !!name && !!bank;

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handleChangeBank = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBank(e.target.value);
  };

  const handleAddContact = () => {
    const contacts = JSON.parse(localStorage.getItem("contacts") ?? "[]");
    contacts.push({
      id: uuidv4(),
      name,
      login: login ?? null,
      bank,
    });
    localStorage.setItem("contacts", JSON.stringify(contacts));
    setName("");
    setLogin("");
    setBank("");
  };

  return (
    <AddContactsStyled>
      <h2>Добавить контакт</h2>
      <div className="list">
        <Input placeholder="Имя" value={name} onChange={handleChangeName} />
        <Input
          placeholder="Логин (необязательно)"
          value={login}
          onChange={handleChangeLogin}
        />
        <Input
          placeholder="Банковский номер или номер телефона"
          value={bank}
          onChange={handleChangeBank}
        />
      </div>
      <Button
        background="var(--tg-theme-button-color)"
        color="var(--tg-theme-button-text-color)"
        active={isActive}
        onClick={handleAddContact}
      >
        Добавить
      </Button>
    </AddContactsStyled>
  );
};

export default AddContacts;
