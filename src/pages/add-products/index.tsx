import React, { useState } from "react";
import ProductItem from "./product-item";
import styled from "styled-components";
import { TProduct } from "../../entity/product/type";
import { Input } from "../../common/input";
import { Button } from "../../common/button";
import { v4 as uuid } from "uuid";
import { ChevronRight } from "react-feather";
import { useNavigate } from "react-router-dom";

const AddProductsStyled = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  height: 100%;

  .list-of-products {
    height: 100%;
    overflow-y: auto;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    width: 100%;

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
  const [addedProducts, setAddedProducts] = useState<TProduct[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const isActive = !!name && !!price && !!quantity;
  const isNext = addedProducts.length >= 1;
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

  const handleGoNext = () => {
    navigate("/assign-product-to-contacts");
  };

  return (
    <AddProductsStyled>
      <h2>Список продуктов</h2>
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
        <div className="buttons-list">
          <Button
            color="var(--tg-theme-button-text-color)"
            background="var(--tg-theme-button-color)"
            active={isActive}
            onClick={handleAddProduct}
          >
            Добавить
          </Button>
          <Button
            color="var(--tg-theme-button-text-color)"
            background="var(--tg-theme-button-color)"
            active={isNext}
            onClick={handleGoNext}
            width="50px"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </AddProductsStyled>
  );
};

export default AddProducts;
