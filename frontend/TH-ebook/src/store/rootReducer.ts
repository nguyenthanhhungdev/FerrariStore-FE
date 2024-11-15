import { combineReducers } from '@reduxjs/toolkit';
import bookReducer from '../features/book/bookSlice';
import userReducer from '../features/user/userSlice';
import {BookStateType} from "../type/BookStateType.ts";
import {Book} from "../models/Book.ts";
import {UserStateType} from "../type/UserStateType.ts";
import {User} from "../models/User.ts";

export type StateType = {
  books: BookStateType<Book[]>;
  user: UserStateType<User>;
};

const rootReducer = combineReducers({
  books: bookReducer,
  user: userReducer,
});

export default rootReducer;