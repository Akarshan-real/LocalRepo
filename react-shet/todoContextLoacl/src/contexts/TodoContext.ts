import { useContext, createContext } from "react";

type Todo = {
    id : number | Date,
    todo : string , 
    completed : boolean
}

type TodoContextType = {
  todos: Todo[];
  addTodo: (todo: string) => void;
  updateTodo: (id: number, todo: string) => void;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
};

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo msg",
            completed : false
        }
    ],
    addTodo : (todo : any) => {},
    updateTodo : (id : number ,todo : string) => {},
    deleteTodo : (id : number) => {},
    toggleComplete : (id : number) => {}
});

export const useTodo = () => (useContext(TodoContext));

export const TodoProvider = TodoContext.Provider;