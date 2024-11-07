import {createSlice} from "@reduxjs/toolkit";
import {User} from "../../models/User.ts";

const initialState: User[] = []

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
        }
    },
})

export const { addUser } = userSlice.actions;

export default userSlice.reducer;