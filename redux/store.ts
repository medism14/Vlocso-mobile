import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/globalSlice";
import authReducer from "./features/authSlice";

export default configureStore({
    reducer: {
        global: globalReducer,
        auth: authReducer,
    }
})