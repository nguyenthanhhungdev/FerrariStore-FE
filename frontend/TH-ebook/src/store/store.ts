import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./rootSaga.ts";
import rootReducer from "./rootReducer.ts";
import { createLogger } from "redux-logger";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, createLogger()),
});

// Thêm log để debug
sagaMiddleware.run(rootSaga);
console.log("Saga middleware started");

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
