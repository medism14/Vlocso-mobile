import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/globalSlice";
import authReducer from "./features/authSlice";
import imagesLoadsReducer from "./features/imagesLoads";

export default configureStore({
    reducer: {
        global: globalReducer,
        auth: authReducer,
        imagesLoad: imagesLoadsReducer,
    }
})