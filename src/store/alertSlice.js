import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message:null,
    isVisible: false
}
export const alertSlice = createSlice({
    name:"alertSlice",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setVisible: (state, action) => {
            state.isVisible = action.payload;
        },

    }
})

export const {setMessage, setVisible} = alertSlice.actions;
export default alertSlice.reducer;