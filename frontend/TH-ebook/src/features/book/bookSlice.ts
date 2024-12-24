import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../models/Book";
import { BookStateType } from "../../type/BookStateType.ts";

const booksInitState: BookStateType<Book[]> = {
  data: null,
  isLoading: false,
  errors: "",
};

export const bookSlice = createSlice({
  name: "books",
  initialState: booksInitState,
  reducers: {
    getBooksAction(state: BookStateType<Book[]>) {
      state.isLoading = true;
      state.errors = "";
    },
    getBooksSuccessAction(state, { payload: books }: PayloadAction<Book[]>) {
      state.data = books;
      state.isLoading = false;
    },
    getBooksFailureAction(state, { payload: error }: PayloadAction<string>) {
      state.errors = error;
      state.isLoading = false;
    },
  },
});

export const { getBooksAction, getBooksSuccessAction, getBooksFailureAction } =
  bookSlice.actions;

export default bookSlice.reducer;
