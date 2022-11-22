import React from "react";
import { User } from "../../components/user";
import { choose, useContacts } from "../../entity/contacts/model";
import styled from "styled-components";
import { Message } from "../../common/message";
import { Button } from "../../common/button";
import { useNavigate } from "react-router-dom";

const ContactListStyled = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  height: 100%;
  overflow-y: auto;
  padding: 0px 1px;
`;

const ContactList = () => {
  const { contacts, chosenContacts, payers } = useContacts();
  const navigate = useNavigate();
  const handleNaviate = () => {
    navigate("/add-contacts");
  };

  return (
    <ContactListStyled>
      {!contacts.length && (
        <Message>
          У вас нет добавленных контактов
          <Button
            color={"var(--tg-theme-button-text-color)"}
            background={"var(--tg-theme-button-color)"}
            active
            onClick={handleNaviate}
          >
            Добавить
          </Button>
        </Message>
      )}
      {contacts.map((contact) => {
        return (
          <User
            paid={0}
            canPay={
              !!Object.keys(payers).find((payer) => payer === contact.name)
            }
            key={contact.id}
            {...contact}
            chosen={chosenContacts.includes(contact.id)}
            onChoose={choose}
          />
        );
      })}
    </ContactListStyled>
  );
};

export default ContactList;
