import { createStore, createEvent, createEffect } from "effector";
import { useStore } from "effector-react";
import { TUser } from "./type";

type TStore = {
  contacts: TUser[];
  chosenContacts: string[];
  payers: { id: string; paid: number }[];
};

const DEFAULT_STORE: TStore = {
  contacts: [],
  chosenContacts: [],
  payers: [],
};

export const choose = createEvent<{ id: string }>();
export const addPayer = createEvent<{ id: string; paid: number }>();
const getContacts = createEffect(() => {
  return JSON.parse(localStorage.getItem("contacts") ?? "[]") as TUser[];
});

const $userStore = createStore(DEFAULT_STORE)
  .on(choose, ({ payers, contacts, chosenContacts }, { id }) => ({
    payers,
    contacts,
    chosenContacts: chosenContacts.find((el) => el === id)
      ? chosenContacts.filter((el) => el !== id)
      : [...chosenContacts, id],
  }))
  .on(getContacts.doneData, (state, contacts) => ({
    ...state,
    contacts,
  }))
  .on(addPayer, (state, payer) => ({
    ...state,
    payers: [...state.payers, payer],
  }));

getContacts();

export const useContacts = () => {
  return useStore($userStore);
};
