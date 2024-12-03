import { put, takeLatest } from "redux-saga/effects";
import {
  setSettingActionSuccess,
  setSettingAction,
  setSettingActionFailure,
} from "./readerSlice.ts";
import { PayloadAction } from "@reduxjs/toolkit";

function* getSetting({ payload: setting }: PayloadAction<string>) {
  try {
    yield put(setSettingActionSuccess(setting));
  } catch (error: unknown) {
    // Nếu có lỗi, dispatch action getBooksFailure với thông báo lỗi
    yield put(setSettingActionFailure((error as Error).message));
  }
}

export default function* readerSaga() {
  yield takeLatest(setSettingAction.type, getSetting);
}
