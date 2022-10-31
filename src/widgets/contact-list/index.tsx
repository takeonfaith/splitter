import React from "react";
import { User } from "../../components/user";
import { choose, useContacts } from "../../entity/contacts/model";
import styled from "styled-components";

const ContactListStyled = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  height: 100%;
  overflow-y: auto;
  padding: 0px 1px;
`;

const ContactList = () => {
  const { contacts, chosenContacts } = useContacts();
  return (
    <ContactListStyled>
      {contacts.map((contact) => {
        return (
          <User
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
