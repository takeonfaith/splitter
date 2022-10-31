import React, { useState } from "react";
import ProductItem from "./product-item";
import styled from "styled-components";
import { TProduct } from "../../entity/product/type";
import { Input } from "../../common/input";
import { Button } from "../../common/button";
import { v4 as uuid } from "uuid";

const AddProductsStyled = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  .list-of-products {
    height: 100%;
    overflow-y: auto;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    .inputs {
      display: flex;
      align-items: center;
      column-gap: 8px;
    }
    width: 100%;
  }
`;

const AddProducts = () => {
  const [addedProducts, setAddedProducts] = useState<TProduct[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const isActive = !!name && !!price && !!quantity;

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
    setAddedProducts((prev) => [
      ...prev,
      {
        id: uuid(),
        name,
        price,
        quantity,
      } as TProduct,
    ]);
  };

  return (
    <AddProductsStyled>
      <div className="list-of-products">
        {addedProducts.map((product) => {
          return <ProductItem {...product} key={product.id} />;
        })}
      </div>
      <div className="bottom">
        <div className="inputs">
          <Input
            placeholder="Название"
            value={name}
            onChange={handleChangeName}
          />
          <Input
            placeholder="Цена"
            width="130px"
            value={price}
            onChange={handleChangePrice}
          />
          <Input
            placeholder="Кол-во"
            width="130px"
            value={quantity}
            onChange={handleChangeQuantity}
          />
        </div>
        <Button
          color="var(--tg-theme-button-text-color)"
          background="var(--tg-theme-secondary-bg-color)"
          active={isActive}
          onClick={handleAddProduct}
        >
          Добавить
        </Button>
      </div>
    </AddProductsStyled>
  );
};

export default AddProducts;
