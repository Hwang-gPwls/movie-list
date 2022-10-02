import { atom, selector } from "recoil";

export const searchKeyword = atom<string>({
  key: "keyword",
  default: "",
});

export const modalOpen = atom<boolean>({
  key: "modalOpen",
  default: false,
});

export const modalSelector = selector({
  key: "modalOpenState",
  get: ({ get }) => {
    const modalOpenState = get(modalOpen);

    return !modalOpenState;
  },
});
