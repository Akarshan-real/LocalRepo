import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";
import type { TodoType } from "./contexts/TodoContext";

const App = () => {

  const [todos, setTodos] = useState<TodoType[]>([]);

  //-------------------------------------------------------------------------------------
  const addTodo = (todo: string) => {
    setTodos(x => [...x, { id: Date.now(), todo, completed: false }])
  }
  const updateTodo = (id: number, todo: string) => {
    setTodos(x => x.map(y => (y.id === id ? { ...y, todo } : y)))
  }
  const deleteTodo = (id: number) => {
    setTodos(x => x.filter(todo => todo.id !== id))
  }
  const toggleComplete = (id: number) => {
    setTodos(x => x.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }
  //-------------------------------------------------------------------------------------

  useEffect(() => {
    const locallySavedTodos = localStorage.getItem("todos");
    if (!locallySavedTodos) return;

    try {
      const parsed = JSON.parse(locallySavedTodos);

      if (Array.isArray(parsed)) {
        setTodos(parsed);
      } else {
        localStorage.removeItem("todos");
      }
    } catch {
      localStorage.removeItem("todos");
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);




  return (
    <TodoProvider value={{ todos, updateTodo, deleteTodo, toggleComplete, addTodo }}>
      <div className='bg-gray-700 min-h-screen py-8'>
        <div className='w-full max-w-2xl mx-auto shadow-2xl rounded-lg px-4 py-3 text-white'>
          <h1 className='text-center text-2xl font-bold mb-8 mt-2'>Manage your todos</h1>
          <div className='mb-4'>
            <TodoForm />
          </div>
          <div className='flex flex-wrap flex-col gap-y-3'>
            {todos.map((todo) => (
              <div key={todo.id} className="">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App

