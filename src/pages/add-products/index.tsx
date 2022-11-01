import React, { useState } from "react";
import ProductItem from "./product-item";
import styled from "styled-components";
import { TProduct } from "../../entity/product/type";
import { Input } from "../../common/input";
import { Button } from "../../common/button";
import { v4 as uuid } from "uuid";
import { ChevronRight, Trash } from "react-feather";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  editProduct,
  removeProduct,
  useProducts,
} from "../../entity/product/model";

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

  const handleAddProduct = () => {
    if (isActive) {
      addProduct({
        id: uuid(),
        name,
        price,
        quantity,
      } as TProduct);
      setName("");
      setPrice(undefined);
      setQuantity(undefined);
    }
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
    setName("");
    setPrice(undefined);
    setQuantity(undefined);
  };

  const handleRemove = () => {
    removeProduct(edit as string);
  };

  const handleGoNext = () => {
    navigate("/assign-products-to-contacts");
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit");

    if (!!edit) {
      return editHandle();
    }

    handleAddProduct();
  };

  return (
    <AddProductsStyled>
      <h2>Список продуктов</h2>
      <div className="list-of-products">
        {products.map((product) => {
          return (
            <ProductItem
              {...product}
              key={product.id}
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
                color="var(--tg-theme-button-text-color)"
                background="var(--tg-theme-button-color)"
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
