import {configureStore} from "@reduxjs/toolkit";
import dealReducer from "./dealSlice";
import accessReducer from "./accessSlice";

export default configureStore({
    reducer: {
        dealReducer: dealReducer,
        accessReducer: accessReducer
    }
})