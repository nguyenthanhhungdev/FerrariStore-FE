import { all } from "redux-saga/effects";
import bookSaga from "../features/book/bookSaga";
import userSaga from "../features/user/userSaga.ts";

export default function* rootSaga() {
  console.log("Root saga started");
  yield all([bookSaga(), userSaga()]);
}
