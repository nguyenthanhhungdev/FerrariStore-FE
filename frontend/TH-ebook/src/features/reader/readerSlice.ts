import {ReaderStateType} from "../../type/ReaderStateType.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const readerInitState: ReaderStateType = {
    setting: null,
    isDone: false,
    error: ''
}

export const readerSlice = createSlice({

    name: 'reader',
    initialState: readerInitState,
    reducers: {

        setSettingAction(state: ReaderStateType) {
            state.error = '';
        },

        setSettingActionSuccess(state: ReaderStateType, {payload: setting}: PayloadAction<string>) {
            state.setting = setting;
        },

        setSettingActionFailure(state: ReaderStateType, {payload: error}: PayloadAction<string>) {
            state.error = error;
        }
    }
});

export const {
    setSettingActionSuccess,
    setSettingAction,
    setSettingActionFailure
} = readerSlice.actions;

export default readerSlice.reducer;
