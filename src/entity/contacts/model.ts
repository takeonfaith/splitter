import { createStore } from "effector";
import { TUser } from "./type";

type TStore = {
  contacts: TUser[];
};

const DEFAULT_STORE: TStore = {
  contacts: [],
};

const userStore = createStore(DEFAULT_STORE);
