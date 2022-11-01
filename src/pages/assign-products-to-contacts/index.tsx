import React, { useState, useEffect } from "react";
import { User } from "../../components/user";
import { useProducts } from "../../entity/product/model";
import ProductItem from "../add-products/product-item";
import styled from "styled-components";
import { useContacts } from "../../entity/contacts/model";
import { Button } from "../../common/button";
import { TProduct } from "../../entity/product/type";
import useTelegram from "../../hooks/use-telegram";
import { Input } from "../../common/input";

const AssignProductsToContactsStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 450px;
  row-gap: 8px;

  .top {
    h2 {
      margin-bottom: 8px;
    }
  }

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
  const { tg } = useTelegram();
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

  useEffect(() => {
    if (currentContact === chosenContacts.length - 1) {
      tg.MainButton.show();
    }
  }, [chosenContacts.length, currentContact, tg.MainButton]);

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
        <h2>Выберите товары</h2>
        <User {...currentContactData} />
      </div>
      <div className="list-of-products">
        <Input width="100%" placeholder="Поиск продуктов" />
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
