import { createSlice, nanoid ,type PayloadAction } from "@reduxjs/toolkit";

export type TodoType = {
    id: string,
    text: string
};

const initialState = {
    todos: [{ id: "1", text: "Hello World" }, { id: "2", text: "Hello Redux Toolkit" }, { id: "3", text: "Hello React" }]
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action : PayloadAction<string>) => {
            const todo : TodoType = {
                id: nanoid(10),
                text: action.payload
            }
            state.todos.push(todo);
        },
        removeTodo: (state, action : PayloadAction<Pick<TodoType , "id">>) => {
            state.todos = state.todos.filter(x => x.id !== action.payload.id);
        },
        updateTodo: (state, action : PayloadAction<{id : string , text : string}>) => {
            state.todos = state.todos.map(x => x.id === action.payload.id ? { ...x, text: action.payload.text } : x);
        },
    },
});

export const { addTodo, removeTodo , updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
