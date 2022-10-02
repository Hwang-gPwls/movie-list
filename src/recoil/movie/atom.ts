import { atom } from "recoil";
import { IMovie } from "../../api/movie";
import localStorageEffect from "../../utilities/localStorage";

export const searchKeywordState = atom<string>({
  key: "searchKeywordState",
  default: "",
});

export const bookmarkItemState = atom<IMovie[]>({
  key: "bookmarkItemState",
  default: [] as IMovie[],
  effects: [localStorageEffect("bookmarkItem")],
});
