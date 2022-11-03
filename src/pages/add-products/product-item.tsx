import React from "react";
import styled from "styled-components";
import { Block } from "../../common/block";
import { Button } from "../../common/button";
import { TProduct } from "../../entity/product/type";
import { Edit2 } from "react-feather";
import Avatar from "../../components/user/avatar";

const ProductItemStyled = styled(Block)<{ edit: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &.md {
    justify-content: space-between;
    column-gap: 8px;
    animation: fadeIn 0.2s forwards;
    border: ${({ edit }) =>
      edit ? "2px solid var(--tg-theme-button-color)" : "none"};

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
    height: fit-content;
    width: calc(100% / 3 - 5.4px);
    display: inline-flex;

    .left {
      display: flex;
      flex-direction: column;
      align-items: center;

      .text {
        margin-top: 10px;

        b {
          font-size: 0.9rem;
        }

        .info {
          display: none;
        }
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
  Соус: "🧴",
  Шоколад: "🍫",
  Конфеты: "🍬",
  Мороженное: "🍦",
  Суп: "🥣",
  Торт: "🎂",
  Сыр: "🧀",
  "Хот-дог": "🌭",
  Блины: "🥞",
  Хлеб: "🍞",
  Сэндвич: "🥪",
  Пончик: "🍩",
  Арбуз: "🍉",
  Банан: "🍌",
  Яблоко: "🍎",
  Клубника: "🍓",
  Огурец: "🥒",
  Мокровь: "🥕",
  Батон: "🥖",
  Суши: "🍣",
  Кофе: "☕",
  Чай: "☕",
  Сок: "🧃",
  Куруруза: "🌽",
};

type Props = TProduct & {
  edit?: boolean;
  chosen?: boolean;
  onEdit?: (id: string) => void;
  onChoose?: (product: TProduct) => void;
  index?: number;
  size?: "sm" | "md";
};

const ProductItem = ({
  id,
  name,
  price,
  quantity,
  onEdit,
  onChoose,
  index,
  size = "md",
  edit = false,
  chosen = false,
}: Props) => {
  const handleEdit = () => {
    onEdit?.(id);
  };

  const handleChoose = () => {
    onChoose?.({ id, name, price, quantity } as TProduct);
  };

  return (
    <ProductItemStyled
      edit={edit}
      className={"product-item " + size}
      onClick={handleChoose}
    >
      <div className="left">
        {index && <span>{index}. </span>}
        <Avatar
          icon={icons[name.trim() as keyof typeof icons] ?? "📦"}
          chosen={chosen}
        />
        <div className="text">
          <b>
            {size === "sm"
              ? name.substring(0, 10) + (name.length > 10 ? "..." : "")
              : name}
          </b>
          <div className="info">
            <div>
              Цена: <span>{price}</span> руб.
            </div>
            •
            <div>
              Кол-во: <span>{quantity}</span> шт.
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
