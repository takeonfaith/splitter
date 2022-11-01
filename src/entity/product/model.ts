import { createStore, createEvent } from "effector";
import { useStore } from "effector-react";
import { TProduct } from "./type";

type TStore = {
  products: TProduct[];
};

const DEFAULT_STORE: TStore = {
  products: [],
};

const getEditedProduct = (
  products: TProduct[],
  id: string,
  newProduct: TProduct
) => {
  const neededProduct = products.find((p) => p.id === id);
  if (neededProduct) {
    neededProduct.name = newProduct.name;
    neededProduct.price = newProduct.price;
    neededProduct.quantity = newProduct.quantity;
  }
  return products;
};

export const addProduct = createEvent<TProduct>();
export const removeProduct = createEvent<string>();
export const editProduct = createEvent<{
  id: string;
  newProduct: TProduct;
}>();

const $productsStore = createStore(DEFAULT_STORE)
  .on(addProduct, (state, product) => ({
    ...state,
    products: [...state.products, product],
  }))
  .on(removeProduct, (state, productId) => ({
    ...state,
    products: state.products.filter((p) => p.id === productId),
  }))
  .on(editProduct, (state, { id, newProduct }) => ({
    ...state,
    products: getEditedProduct(state.products, id, newProduct),
  }));

export const useProducts = () => {
  return useStore($productsStore);
};
