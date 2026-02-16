import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";

const App = () => {

  const [todos, setTodos] = useState([]);

  //-------------------------------------------------------------------------------------
  const addTodo = (todo: string) => {
    setTodos(x => [...x, { id: Date.now(), ...todo }, ...x])
  }
  const updateTodo = (id: number | Date, todo: string) => {
    setTodos(x => x.map(x => (x.id === id ? todo : x)))
  }
  const deleteTodo = (id: number | Date) => {
    setTodos(x => x.filter(todo => todo.id !== id))
  }
  const toggleComplete = (id: number | Date) => {
    setTodos(x => x.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }
  //-------------------------------------------------------------------------------------

  useEffect(() => {
    const locallySavedTodos = localStorage.getItem("todos");
    if (locallySavedTodos && locallySavedTodos.length > 0) {
      const parsedJson = JSON.parse(locallySavedTodos);
      setTodos(parsedJson);
    };
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
          <div className='flex flex-wrap gap-y-3'>
            {todos.map((todo) => (
              <div key={todo.id} className="w-4">
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App

