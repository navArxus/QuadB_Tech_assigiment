import { configureStore, createSlice } from "@reduxjs/toolkit"

// TO genrate unique id for every task 
const idgenerator = () => {
    let date = new Date()
    let id = String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds() + String(date.getMilliseconds()))
    return id
}

// Adding initial state for the slice
const taskinitialState = {
    tasks: JSON.parse(localStorage.getItem( "task" ) ) ,
    currentSearch: "all",
}

const localStorageMaintain = (tasks) => {
    localStorage.setItem('task', JSON.stringify(tasks))
}

// Creating the slice for task 
const taskSlice = createSlice({
    name: "tasks",
    initialState: taskinitialState,
    reducers: {

        // For adding task 
        addTask(state, action) {
            const newtask = {
                ...action.payload,
                id: idgenerator(),
            }
            state.tasks.push(newtask)
            const loacltasks = state.tasks
            localStorageMaintain(loacltasks);
        },
        
        // For remove the task
        removeTask(state, action) {
            state.tasks = state.tasks.filter((item) => item.id !== action.payload.id)
            const loacltasks = state.tasks
            localStorageMaintain(loacltasks);
        },

        // To Mark as completed
        completeTask(state, action) {
            const index = state.tasks.findIndex((item) => item.id === action.payload.id);
            const newtasks = { ...state.tasks[index], isCompleted: true };
            state.tasks[index] = newtasks;
            const loacltasks = state.tasks
            localStorageMaintain(loacltasks);
        },

        changeSearch(state, action) {
            state.currentSearch = action.payload
        }
    }
})

// configure store 
const store = configureStore({
    reducer: {
        tasks: taskSlice.reducer
    }
})

export const taskaction = taskSlice.actions

export default store