import React from "react";
import styled from "styled-components";
import { Block } from "../../common/block";
import { Button } from "../../common/button";
import { TProduct } from "../../entity/product/type";
import { Edit2 } from "react-feather";
import Avatar from "../../components/user/avatar";

const ProductItemStyled = styled(Block)<{ chosen: boolean }>`
  display: flex;
  align-items: center;

  &.md {
    justify-content: space-between;
    column-gap: 8px;
    animation: fadeIn 0.2s forwards;
    border: ${({ chosen }) =>
      chosen ? "2px solid var(--tg-theme-button-color)" : "none"};

    .left {
      display: flex;
      column-gap: 8px;
      align-items: center;

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
    }
  }

  &.sm {
    flex-direction: column;

    .text {
      margin-top: 10px;

      .info {
        display: none;
      }
    }

    .edit-btn {
      display: none;
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

const icons = {
  Пицца: "🍕",
  Бургер: "🍔",
  Кола: "🥤",
  Спрайт: "🥤",
  Фанта: "🥤",
  Пепси: "🥤",
  Напитки: "🥤",
  Коктейль: "🍸",
  Виски: "🥃",
  Вино: "🍷",
  Пиво: "🍺",
  Шашлык: "🍢",
  Мясо: "🥩",
  Вода: "💧",
};

type Props = TProduct & {
  chosen?: boolean;
  onEdit: (id: string) => void;
  size?: "sm" | "md";
};

const ProductItem = ({
  id,
  name,
  price,
  quantity,
  onEdit,
  size = "md",
  chosen = false,
}: Props) => {
  const handleEdit = () => {
    onEdit(id);
  };

  return (
    <ProductItemStyled chosen={chosen} className={"product-item " + size}>
      <div className="left">
        <Avatar icon={icons[name.trim() as keyof typeof icons] ?? "📦"} />
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
      </div>
      <Button
        color={"var(--tg-theme-text-color)"}
        background={"var(--tg-theme-secondary-bg-color)"}
        active
        onClick={handleEdit}
        className="edit-btn"
        width="40px"
      >
        <Edit2 />
      </Button>
    </ProductItemStyled>
  );
};

export default ProductItem;
