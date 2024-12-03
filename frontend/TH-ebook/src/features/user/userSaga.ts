import { all, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { authFailure, authSusccess, logout, signIn, signUp } from "./userSlice";
import { User } from "../../models/User.ts";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserRespone } from "../../models/UserRespone.ts";

// Định nghĩa signUp và signIn saga có kiểu dữ liệu payload cụ thể

const API_URL = import.meta.env.VITE_API_URL2;
const endpoint = "users";
function* signUpUserSaga({ payload: userPayload }: PayloadAction<User>) {
  try {
    userPayload.avatar = "https://mangadex.org/img/avatar.png";
    console.log("User Payload: ", userPayload);
    const user = new UserRespone(userPayload);
    console.log("User Respone: ", user);
    const response: AxiosResponse<User> = yield axios.post(
      `${API_URL}/${endpoint}`,
      user
    );
    yield put(authSusccess(response.data));
  } catch (error: unknown) {
    yield put(authFailure((error as Error).message));
  }
}

function* signInUserSaga({
  payload: { nameoremail, password },
}: PayloadAction<{ nameoremail: string; password: string }>) {
  try {
    console.log("signInUserSaga");
    console.log(`${API_URL}/customer`);
    const response: AxiosResponse<User[]> = yield axios.get(
      `${API_URL}/${endpoint}`
    );
    const user: User | undefined = response.data.find(
      (user) =>
        (user.username === nameoremail || user.email === nameoremail) &&
        user.password === password
    );
    if (user) {
      yield put(authSusccess(user));
    } else {
      yield put(authFailure("User not found"));
    }
  } catch (error: unknown) {
    yield put(authFailure((error as Error).message));
  }
}

function* logoutUserSaga() {
  try {
    yield logout();
  } catch (error: unknown) {
    yield put(authFailure((error as Error).message));
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(signUp.type, signUpUserSaga),
    takeLatest(signIn.type, signInUserSaga),
    takeLatest(logout.type, logoutUserSaga),
  ]);
}
