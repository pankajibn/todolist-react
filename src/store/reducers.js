import taskReducer from "./taskSlice"
import alertReducer from "./alertSlice"
import { combineReducers } from "@reduxjs/toolkit"

export default combineReducers({
    tasks: taskReducer,
    alert:alertReducer
})