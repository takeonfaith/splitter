import { ChevronRight, Trash } from "react-feather";
import styled from "styled-components";
import { Button } from "../../common/button";
import { Divider } from "../../common/divider";
import { Input } from "../../common/input";
import { Message } from "../../common/message";
import useAddProducts from "./lib/use-add-products";
import ProductItem from "./product-item";

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

    .info {
      color: var(--tg-theme-hint-color);
    }

    .inputs,
    .info {
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
  const {
    products,
    bottomRef,
    handleSubmit,
    productsSum,
    name,
    nameRef,
    handleChangeName,
    totalCost,
    price,
    handleChangePrice,
    edit,
    editingStartHandle,
    quantity,
    handleChangeQuantity,
    isActive,
    isNext,
    handleGoNext,
    handleRemove,
    handleShare,
  } = useAddProducts();
  return (
    <AddProductsStyled>
      <h2>Список продуктов</h2>
      <div className="list-of-products">
        {products.length === 0 && (
          <Message title="Подсказка">
            Введине название товара, его цену и количество
          </Message>
        )}
        {products.map((product, index) => {
          return (
            <ProductItem
              {...product}
              key={product.id}
              index={index + 1}
              chosen={edit === product.id}
              onHandleShare={handleShare}
              onEdit={editingStartHandle}
            />
          );
        })}
        <div ref={bottomRef}></div>
      </div>
      <form className="bottom" onSubmit={handleSubmit}>
        <Divider margin="0 0 8px 0" />
        <div className="inputs">
          <div>
            Итого: <span>{productsSum}</span> руб.
          </div>
          •
          <div>
            Заплачено: <span>{totalCost}</span> руб.
          </div>
        </div>
        <div className="inputs">
          <Input
            placeholder="Название"
            value={name}
            innerRef={nameRef}
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
