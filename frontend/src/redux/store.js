import {configureStore} from "@reduxjs/toolkit";
import accessReducer from "./accessSlice";

export default configureStore({
    reducer: {
        accessReducer: accessReducer
    }
})