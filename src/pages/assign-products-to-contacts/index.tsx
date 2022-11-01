import React, { useState } from "react";
import { User } from "../../components/user";
import { useProducts } from "../../entity/product/model";
import ProductItem from "../add-products/product-item";
import styled from "styled-components";
import { useContacts } from "../../entity/contacts/model";
import { Button } from "../../common/button";

const AssignProductsToContactsStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 450px;
  row-gap: 8px;

  .list-of-products {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-y: auto;
    padding: 0 1px;
    flex-wrap: wrap;
    height: 100%;
    gap: 8px;
  }
`;

const AssignProductsToContacts = () => {
  const { contacts, chosenContacts } = useContacts();
  const { products } = useProducts();
  const [currentContact, setCurrentContact] = useState(0);
  const currentContactData = contacts.find(
    (c) => c.id === chosenContacts[currentContact]
  );

  if (!currentContactData) return null;

  return (
    <AssignProductsToContactsStyled>
      <div className="top">
        <User {...currentContactData} />
      </div>
      <div className="list-of-products">
        {products.map((product) => {
          return <ProductItem {...product} key={product.id} size="sm" />;
        })}
      </div>
      <Button color={""} background={""} active>
        Следующий пользователь
      </Button>
    </AssignProductsToContactsStyled>
  );
};

export default AssignProductsToContacts;
