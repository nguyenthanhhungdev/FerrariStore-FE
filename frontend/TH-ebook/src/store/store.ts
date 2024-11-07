import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/book/bookSlice.ts';
import userReducer from "../features/user/userSlice.ts";

const store = configureStore({
  reducer: {
    books: booksReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;