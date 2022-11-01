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
  const { contacts, chosenContacts, payers } = useContacts();
  console.log(chosenContacts);

  return (
    <ContactListStyled>
      {contacts.map((contact) => {
        return (
          <User
            paid={0}
            didPay={!!payers.find((payer) => payer.id === contact.id)}
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
