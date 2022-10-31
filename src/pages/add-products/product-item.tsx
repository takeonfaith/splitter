import React from "react";
import styled from "styled-components";
import { TProduct } from "../../entity/product/type";

const ProductItemStyled = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

const ProductItem = ({ name, price, quantity }: TProduct) => {
  return (
    <ProductItemStyled>
      <span>{name}</span>
      <span>{price}</span>
      <span>{quantity}</span>
    </ProductItemStyled>
  );
};

export default ProductItem;
