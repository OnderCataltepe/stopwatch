import {configureStore} from "@reduxjs/toolkit";
import timeReducer from "./TimeSlice";


export default configureStore({
    reducer:{
        timeReducer,
    }
});