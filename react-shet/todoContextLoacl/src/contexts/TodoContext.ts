import { useContext, createContext } from "react";

export type TodoType = {
    id : number ,
    todo : string , 
    completed : boolean
}

type TodoContextType = {
  todos: TodoType[];
  addTodo: (todo: string) => void;
  updateTodo: (id: number, todo: string) => void;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
};

export const TodoContext = createContext<TodoContextType>({
    todos: [],
    addTodo : () => {},
    updateTodo : () => {},
    deleteTodo : () => {},
    toggleComplete : () => {}
});

export const useTodo = () => (useContext(TodoContext));

export const TodoProvider = TodoContext.Provider;