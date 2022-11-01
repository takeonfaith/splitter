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
  animation: fadeIn 0.5s forwards;

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
      <h4>{name}</h4>
      <span>{price}</span>
      <span>{quantity}</span>
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
