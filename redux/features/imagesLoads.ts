/** @format */

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  numberOfImagesLoaded: 0,
};

export const imagesLoadsSlice = createSlice({
  name: "myAnnouncesImages",
  initialState,
  reducers: {
    incrementImagesLoad: (state) => {
      state.numberOfImagesLoaded++;
    },
    resetImagesLoad: (state) => {
      state.numberOfImagesLoaded = 0;
    },
  },
});

export const { incrementImagesLoad, resetImagesLoad } = imagesLoadsSlice.actions;
export default imagesLoadsSlice.reducer;
