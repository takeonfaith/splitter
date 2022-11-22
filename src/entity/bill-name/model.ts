import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";

const DEFAULT_STORE = {
  name: "",
};

export const changeName = createEvent<string>();

const $billName = createStore(DEFAULT_STORE).on(changeName, (state, name) => ({
  name,
}));

export const useBillName = () => {
  return useStore($billName);
};
