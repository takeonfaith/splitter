import React from "react";
import styled from "styled-components";
import { Block } from "../../common/block";
import { Button } from "../../common/button";
import { TProduct } from "../../entity/product/type";
import { Edit2 } from "react-feather";

const ProductItemStyled = styled(Block)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
  animation: fadeIn 0.2s forwards;

  .text {
    display: flex;
    flex-direction: column;

    .info {
      font-size: 0.85rem;
      margin-top: 4px;
      color: var(--tg-theme-hint-color);
      display: flex;
      column-gap: 8px;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

type Props = TProduct & {
  onEdit: (id: string) => void;
};

const ProductItem = ({ id, name, price, quantity, onEdit }: Props) => {
  const handleEdit = () => {
    onEdit(id);
  };

  return (
    <ProductItemStyled>
      <div className="text">
        <h4>{name}</h4>
        <div className="info">
          <div>
            Цена: <span>{price}</span> руб.
          </div>
          •
          <div>
            Количество: <span>{quantity}</span> шт.
          </div>
        </div>
      </div>
      <Button
        color={"var(--tg-theme-text-color)"}
        background={"var(--tg-theme-secondary-bg-color)"}
        active
        onClick={handleEdit}
        width="40px"
      >
        <Edit2 />
      </Button>
    </ProductItemStyled>
  );
};

export default ProductItem;
