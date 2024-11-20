/** @format */

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  display: true,
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        changeDisplay: (state, action) => {
            state.display = action.payload;
        }
    }
})


export const { changeDisplay } = globalSlice.actions; 
export default globalSlice.reducer;