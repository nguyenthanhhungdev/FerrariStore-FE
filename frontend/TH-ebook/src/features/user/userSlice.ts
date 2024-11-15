import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../models/User.ts";
import {UserStateType} from "../../type/UserStateType.ts";

const initialState: UserStateType<User>= {
    data: null,
    isLogin: false,
    errors: '',
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signIn: (state: UserStateType<User>, {payload: {nameoremail, password}}: PayloadAction<{nameoremail: string, password: string}>) => {
            state.errors = '';
        },
        signUp: (state: UserStateType<User>, {payload: {username, password, confirmPassword, email}}: PayloadAction<{username: string, password: string, confirmPassword: string, email: string}>) => {
            state.errors = '';
        },
        authSusccess: (state, {payload: user}: PayloadAction<User>) => {
            state.data = user;
            state.isLogin = true;
        },
        authFailure: (state, {payload: error}: PayloadAction<string>) => {
            state.errors = error
        },
        logout: (state: UserStateType<User>) => {
            state.data = null;
            state.isLogin = false;
        }
     },
})

export const { signIn, signUp, authSusccess, authFailure, logout} = userSlice.actions;

export default userSlice.reducer;