/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Input } from "../../common/input";
import { User } from "../../components/user";
import styled from "styled-components";
import { TUser } from "../../entity/contacts";
import { Button } from "../../common/button";
import ContactList from "../../widgets/contact-list";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../../entity/contacts/model";

const ChooseContactsStyled = styled.div`
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

const ChooseContacts = () => {
  const { chosenContacts } = useContacts();
  const isActive = chosenContacts.length >= 2;
  const navigate = useNavigate();

  return (
    <ChooseContactsStyled>
      <h2>Выберите участников</h2>
      <Input placeholder="Поиск контактов" />
      <ContactList />
      <Button
        background="var(--tg-theme-button-color)"
        color="var(--tg-theme-button-text-color)"
        active={isActive}
        onClick={() => navigate("/add-products")}
      >
        Далее
      </Button>
    </ChooseContactsStyled>
  );
};

export default ChooseContacts;
