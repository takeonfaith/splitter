import React, { useRef, useState } from "react";
import { ChevronRight, Trash } from "react-feather";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { Button } from "../../common/button";
import { Input } from "../../common/input";
import {
  addProduct,
  editProduct,
  removeProduct,
  useProducts,
} from "../../entity/product/model";
import { TProduct } from "../../entity/product/type";
import ProductItem from "./product-item";

const MessageBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 350px;
  width: 100%;
  text-align: center;
  background: var(--tg-theme-secondary-bg-color);
  color: var(--tg-theme-hint-color);
  width: fit-content;
  padding: 10px;
  border-radius: 5px;
`;

const AddProductsStyled = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  height: 100%;

  .list-of-products {
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 1px;
    row-gap: 8px;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    width: 100%;
    padding-top: 8px;
    border-top: 1px solid var(--tg-theme-hint-color);

    .inputs {
      display: flex;
      align-items: center;
      column-gap: 8px;
    }

    .buttons-list {
      display: flex;
      align-items: center;
      column-gap: 8px;
    }
  }
`;

const AddProducts = () => {
  const { products } = useProducts();
  const [edit, setEdit] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | undefined>();
  const [quantity, setQuantity] = useState<number | undefined>();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const isActive = !!name && !!price && !!quantity;
  const isNext = products.length >= 1;
  const navigate = useNavigate();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number.parseInt(e.target.value));
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number.parseInt(e.target.value));
  };

  const resetFields = () => {
    setName("");
    setPrice(undefined);
    setQuantity(undefined);
  };

  const handleAddProduct = () => {
    if (isActive) {
      addProduct({
        id: uuid(),
        name,
        price,
        quantity,
      } as TProduct);
    }
    resetFields();
    console.log(nameRef.current);

    nameRef.current?.focus();
  };

  const editingStartHandle = (id: string) => {
    const { name, price, quantity } = products.find((p) => p.id === id)!;
    setEdit(id);
    setName(name);
    setPrice(price);
    setQuantity(quantity);
  };

  const editHandle = () => {
    setEdit(null);
    if (edit && price && quantity) {
      const newProduct = { id: edit, name, price, quantity } as TProduct;
      editProduct({ id: edit, newProduct });
    }
    resetFields();
  };

  const handleRemove = () => {
    removeProduct(edit as string);
    resetFields();
    setEdit(null);
  };

  const handleGoNext = () => {
    navigate("/assign-products-to-contacts");
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!!edit) {
      return editHandle();
    }

    handleAddProduct();
  };

  return (
    <AddProductsStyled>
      <h2>Список продуктов</h2>
      <div className="list-of-products">
        {products.length === 0 && (
          <MessageBlock>
            Введине название товара, его цену и количество
          </MessageBlock>
        )}
        {products.map((product) => {
          return (
            <ProductItem
              {...product}
              key={product.id}
              chosen={edit === product.id}
              onEdit={editingStartHandle}
            />
          );
        })}
      </div>
      <form className="bottom" onSubmit={handleSubmit}>
        <div className="inputs">
          <Input
            placeholder="Название"
            value={name}
            ref={nameRef}
            onChange={handleChangeName}
          />
          <Input
            type="number"
            placeholder="Цена"
            width="130px"
            value={price}
            onChange={handleChangePrice}
          />
          <Input
            type="number"
            placeholder="Кол-во"
            width="130px"
            value={quantity}
            onChange={handleChangeQuantity}
          />
        </div>
        <div className="buttons-list">
          {!edit && (
            <>
              <Button
                color="var(--tg-theme-button-text-color)"
                background="var(--tg-theme-button-color)"
                active={isActive}
                type="submit"
              >
                Добавить
              </Button>
              <Button
                color="var(--tg-theme-button-text-color)"
                background="var(--tg-theme-button-color)"
                active={isNext}
                onClick={handleGoNext}
                width="40px"
              >
                <ChevronRight />
              </Button>
            </>
          )}
          {!!edit && (
            <>
              <Button
                color="var(--tg-theme-button-text-color)"
                background="var(--tg-theme-button-color)"
                active={isActive}
                type="submit"
              >
                Изменить
              </Button>
              <Button
                color="#fff"
                background="#e53935"
                active
                onClick={handleRemove}
                width="40px"
                type="button"
              >
                <Trash />
              </Button>
            </>
          )}
        </div>
      </form>
    </AddProductsStyled>
  );
};

export default AddProducts;
