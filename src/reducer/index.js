import { combineReducers } from "@reduxjs/toolkit";

import emailSchedularSlice from "../slices/emailSchedularSlice";



const rootReducer = combineReducers({
    emailSchedular: emailSchedularSlice
})

export default rootReducer;