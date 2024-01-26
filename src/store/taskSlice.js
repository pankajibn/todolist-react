import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    task: null,
    filter:'All'
}
export const taskSlice = createSlice({
    name:"task",
    initialState,
    reducers: {
        addTask: (state, action) => {
            console.log('action', action)
            const tasks = state.items;
            const taskId =
            tasks && tasks.length > 0
              ? Math.max(...tasks?.map((item) => item.id)) + 1
              : 1;
            const newItem = { id: taskId, title: action.payload.title, isCompleted: false };
            const availableItems = [...state.items, newItem];
            state.items= availableItems;
        },
        updateTask: (state, action) => {
            state.items = state.items.map(item => item.id === action.payload.id ? {...item, title:action.payload.title, isCompleted: action.payload.isCompleted} : item)
        },
        deleteTask: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        setTask:(state, action) => {
            state.task = action.payload
        },
        setFilter:(state, action) => {
            state.filter = action.payload
        }

    }
})

export const {addTask, updateTask, deleteTask, setTask, setFilter} = taskSlice.actions;
export default taskSlice.reducer;