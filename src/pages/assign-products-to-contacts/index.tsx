import styled from "styled-components";
import { Button } from "../../common/button";
import { Input } from "../../common/input";
import { User } from "../../components/user";
import ProductItem from "../add-products/product-item";
import useAssignProducts from "./lib/use-assign-products";

const AssignProductsToContactsStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 450px;
  row-gap: 8px;

  .top {
    h2 {
      margin-bottom: 8px;
    }
  }

  .list-of-products {
    height: 100%;

    .inner {
      max-height: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      overflow-y: auto;
      padding: 2px;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 6px;
    }
  }

  .buttons {
    display: flex;
    column-gap: 8px;
  }
`;

const AssignProductsToContacts = () => {
  const {
    currentContactData,
    products,
    error,
    assignedProducts,
    handleChooseProduct,
    currentContact,
    handlePrevContact,
    handleNextContact,
    chosenContacts,
    handleSend,
  } = useAssignProducts();
  if (!currentContactData) return <h2>Контакты не были выбраны</h2>;

  return (
    <AssignProductsToContactsStyled>
      <div className="top">
        <h2>Выберите товары</h2>
        <User {...currentContactData} />
        {error && <h3>{error}</h3>}
      </div>
      <div className="list-of-products">
        <Input width="100%" placeholder="Поиск продуктов" />
        <div className="inner">
          {products.map((product) => {
            return (
              <ProductItem
                {...product}
                key={product.id}
                size="sm"
                chosen={
                  !!assignedProducts[currentContactData.name].find(
                    (el) => el.product.id === product.id
                  )
                }
                onChoose={handleChooseProduct}
              />
            );
          })}
        </div>
      </div>
      <div className="buttons">
        {currentContact !== 0 && (
          <Button
            color={"var(--tg-theme-hint-color)"}
            background={"var(--tg-theme-secondary-bg-color)"}
            active
            onClick={handlePrevContact}
          >
            Назад
          </Button>
        )}
        {currentContact < chosenContacts.length - 1 && (
          <Button
            color={"var(--tg-theme-button-text-color)"}
            background={"var(--tg-theme-button-color)"}
            active
            onClick={handleNextContact}
          >
            Далее
          </Button>
        )}
        {currentContact === chosenContacts.length - 1 && (
          <Button
            color={"var(--tg-theme-button-text-color)"}
            background={"var(--tg-theme-button-color)"}
            active
            onClick={handleSend}
          >
            Рассчитать
          </Button>
        )}
      </div>
    </AssignProductsToContactsStyled>
  );
};

export default AssignProductsToContacts;
