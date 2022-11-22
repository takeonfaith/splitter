import React, { useState } from "react";
import styled from "styled-components";
import { Block } from "../../common/block";
import { Button } from "../../common/button";
import { TProduct } from "../../entity/product/type";
import { Edit2, MoreVertical } from "react-feather";
import Avatar from "../../components/user/avatar";
import { Checkbox } from "../../common/checkbox";
import { Divider } from "../../common/divider";

const ProductItemStyled = styled(Block)<{
  edit: boolean;
  openContext: boolean;
}>`
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  position: relative;

  .context {
    transition: 0.2s opacity, 0.2s transform;
    position: absolute;
    top: 60px;
    right: 20px;
    transform: ${({ openContext }) =>
      openContext ? "translateY(0)" : "translateY(-20px)"};
    opacity: ${({ openContext }) => +openContext};
    visibility: ${({ openContext }) => (openContext ? "visible" : "hidden")};
    background: var(--tg-theme-bg-color);
    box-shadow: 0 1px 3px #00000030;
    padding: 10px;
    border-radius: 6px;
    width: 200px;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  &.md {
    justify-content: space-between;
    column-gap: 8px;
    animation: fadeIn 0.2s forwards;
    border: ${({ edit }) =>
      edit ? "2px solid var(--tg-theme-button-color)" : "none"};

    .left {
      width: 100%;
      display: flex;
      column-gap: 8px;
      align-items: center;

      .text {
        display: flex;
        flex-direction: column;

        .name {
          display: flex;
          align-items: center;
          column-gap: 8px;

          .tag {
            padding: 2px 5px;
            font-size: 0.8rem;
            color: var(--tg-theme-hint-color);
            background: var(--tg-theme-secondary-bg-color);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

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

    .more-btn {
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
  onHandleShare?: (product: TProduct) => void;
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
  onHandleShare,
  edit = false,
  chosen = false,
}: Props) => {
  const [openContext, setOpenContext] = useState(false);
  const [separate, setSeparate] = useState(false);
  const [proportion, setProportion] = useState(false);
  const handleEdit = () => {
    onEdit?.(id);
    setOpenContext(false);
  };

  const handleChoose = () => {
    onChoose?.({ id, name, price, quantity } as TProduct);
  };

  const handleOpenContext = () => {
    setOpenContext((prev) => !prev);
  };

  const handleSeparate = (value: boolean) => {
    setSeparate(value);
    onHandleShare?.({
      id,
      name,
      price,
      quantity,
      shared_by_all: true,
    } as TProduct);
  };

  const handleProportion = (value: boolean) => {
    setProportion(value);
  };

  return (
    <ProductItemStyled
      edit={edit}
      className={"product-item " + size}
      onClick={handleChoose}
      openContext={openContext}
    >
      <div className="left">
        {index && <span>{index}. </span>}
        <Avatar
          icon={icons[name.trim() as keyof typeof icons] ?? "📦"}
          chosen={chosen}
        />
        <div className="text">
          <div className="name">
            <b>
              {size === "sm"
                ? name.substring(0, 10) + (name.length > 10 ? "..." : "")
                : name}
            </b>
            {separate && <span className="tag">На всех</span>}
            {proportion && <span className="tag">Пропорция</span>}
          </div>
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
        onClick={handleOpenContext}
        className="more-btn"
        width="40px"
      >
        <MoreVertical />
      </Button>
      <div className="context">
        <Checkbox
          title="Разделить на всех"
          onChange={handleSeparate}
          view="toggle"
          active={!proportion}
        />
        <Checkbox
          title="Пропорции"
          onChange={handleProportion}
          view="toggle"
          active={!separate}
        />
        <Divider margin="0" />
        <Button
          color={"var(--tg-theme-text-color)"}
          background={"var(--tg-theme-bg-color)"}
          active
          onClick={handleEdit}
          className="edit-btn"
          width="100%"
          align="left"
        >
          <Edit2 />
          Изменить
        </Button>
      </div>
    </ProductItemStyled>
  );
};

export default ProductItem;
