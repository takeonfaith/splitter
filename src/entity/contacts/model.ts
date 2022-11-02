import { createStore, createEvent, createEffect } from "effector";
import { useStore } from "effector-react";
import { TUser } from "./type";

type Payers = Record<string, number>;

type TStore = {
  contacts: TUser[];
  chosenContacts: string[];
  payers: Payers;
};

const DEFAULT_STORE: TStore = {
  contacts: [],
  chosenContacts: [],
  payers: {},
};

const deletePayerHelper = (payers: Payers, name: string) => {
  const { [name]: removedProperty, ...rest } = payers;
  return rest;
};

export const choose = createEvent<{ id: string }>();
export const changePayer = createEvent<{ name: string; sum: number }>();
export const deletePayer = createEvent<{ name: string }>();
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
  .on(changePayer, (state, { name, sum }) => ({
    ...state,
    payers: { ...state.payers, [name]: sum },
  }))
  .on(deletePayer, (state, { name }) => ({
    ...state,
    payers: deletePayerHelper(state.payers, name),
  }));

getContacts();

export const useContacts = () => {
  return useStore($userStore);
};
