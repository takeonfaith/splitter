import React, { useState } from "react";
import { User } from "../../components/user";
import { useProducts } from "../../entity/product/model";
import ProductItem from "../add-products/product-item";
import styled from "styled-components";
import { useContacts } from "../../entity/contacts/model";
import { Button } from "../../common/button";
import { TProduct } from "../../entity/product/type";

const AssignProductsToContactsStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 450px;
  row-gap: 8px;

  .list-of-products {
    height: 100%;

    .inner {
      max-height: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      overflow-y: auto;
      padding: 2px;
      flex-wrap: wrap;
      gap: 8px;
    }
  }

  .buttons {
    display: flex;
    column-gap: 8px;
  }
`;

const AssignProductsToContacts = () => {
  const { contacts, chosenContacts } = useContacts();
  const { products } = useProducts();
  const [currentContact, setCurrentContact] = useState(0);
  const [assignedProducts, setAssignedProducts] = useState(
    contacts.reduce((acc, contact) => {
      acc[contact.name] = [];
      return acc;
    }, {} as Record<string, { product: TProduct; proportion: number }[]>)
  );

  const currentContactData = contacts.find(
    (c) => c.id === chosenContacts[currentContact]
  );

  if (!currentContactData) return null;

  const handleNextContact = () => {
    setCurrentContact((prev) => prev + 1);
  };

  const handlePrevContact = () => {
    setCurrentContact((prev) => prev - 1);
  };

  const handleChooseProduct = (product: TProduct) => {
    const alreadyAssigned = !!assignedProducts[currentContactData.name].find(
      (el) => el.product.id === product.id
    );
    let newAssigned = assignedProducts;

    if (alreadyAssigned) {
      newAssigned[currentContactData.name] = newAssigned[
        currentContactData.name
      ].filter((el) => el.product.id !== product.id);
    } else {
      newAssigned[currentContactData.name].push({
        product,
        proportion: 1 / chosenContacts.length,
      });
    }

    setAssignedProducts({ ...newAssigned });
  };

  return (
    <AssignProductsToContactsStyled>
      <div className="top">
        <User {...currentContactData} />
      </div>
      <div className="list-of-products">
        <div className="inner">
          {products.map((product) => {
            return (
              <ProductItem
                {...product}
                key={product.id}
                size="sm"
                chosen={
                  !!assignedProducts[currentContactData.name].find(
                    (el) => el.product.id === product.id
                  )
                }
                onChoose={handleChooseProduct}
              />
            );
          })}
        </div>
      </div>
      <div className="buttons">
        {currentContact !== 0 && (
          <Button
            color={"var(--tg-theme-hint-color)"}
            background={"var(--tg-theme-secondary-bg-color)"}
            active
            onClick={handlePrevContact}
          >
            Назад
          </Button>
        )}
        <Button
          color={"var(--tg-theme-button-text-color)"}
          background={"var(--tg-theme-button-color)"}
          active
          onClick={handleNextContact}
        >
          Далее
        </Button>
      </div>
    </AssignProductsToContactsStyled>
  );
};

export default AssignProductsToContacts;
