import { createStore, createEvent, createEffect } from "effector";
import { useStore } from "effector-react";
import { TUser } from "./type";

type TStore = {
  contacts: TUser[];
  chosenContacts: string[];
};

const DEFAULT_STORE: TStore = {
  contacts: [],
  chosenContacts: [],
};

export const choose = createEvent<{ id: string }>();
const getContacts = createEffect(() => {
  return JSON.parse(localStorage.getItem("contacts") ?? "[]") as TUser[];
});

const $userStore = createStore(DEFAULT_STORE)
  .on(choose, ({ contacts, chosenContacts }, { id }) => ({
    contacts,
    chosenContacts: chosenContacts.find((el) => el === id)
      ? chosenContacts.filter((el) => el !== id)
      : [...chosenContacts, id],
  }))
  .on(getContacts.doneData, (state, contacts) => ({
    ...state,
    contacts,
  }));

getContacts();

export const useContacts = () => {
  return useStore($userStore);
};
