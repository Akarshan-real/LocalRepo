import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, type TodoType, updateTodo } from '../features/todo/todoSlice';
import { useEffect, useRef, useState } from 'react';

const Todos = () => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const editRef = useRef<HTMLInputElement | null>(null);
    const [updatingTodoInfo, setUpdatingTodoInfo] = useState<{ id: string, text: string }>({ id: "", text: "" });
    const todos = useSelector((x: any) => x.todos);
    const dispatch = useDispatch();

    function updateTodoHandler(e: any): void {
        e.preventDefault();
        dispatch(updateTodo(updatingTodoInfo));
        setUpdatingTodoInfo({ id: "", text: "" });
        setEditingId(null);
    };

    function editButtonClick(x: any) {
        setEditingId(x.id);
        setUpdatingTodoInfo({ id: x.id, text: x.text });
    };

    useEffect(() => {
        if (editingId && editRef.current) {
            editRef.current.focus();
        }
    }, [editingId]);


    return (
        <>
            <div className='mt-4 text-4xl flex text-white'>Todos -</div>
            <ul className="list-none">
                {todos.map((x: TodoType) => (
                    <li
                        className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
                        key={x.id}
                    >
                        {
                            editingId === x.id ?
                                <form id={`update-form-${x.id}`} onSubmit={updateTodoHandler}>

                                    <input
                                        className='text-white focus:outline-none'
                                        type="text"
                                        ref={editRef}
                                        placeholder='Update your todo then press save'
                                        value={updatingTodoInfo.text}
                                        onChange={(e) => setUpdatingTodoInfo({ id: x.id, text: e.target.value })}
                                    />
                                </form>
                                :
                                <div className='text-white'>{x.text}</div>
                        }
                        <div className='flex gap-4'>

                            <button
                                type={`${editingId === x.id ? "submit" : "button"}`}
                                form={`${editingId === x.id ? `update-form-${x.id}` : ""}`}
                                className='text-white rounded-sm py-1 px-4 bg-orange-400 cursor-pointer hover:bg-orange-500 duration-150 transition-colors ease-in-out'
                                onClick={() => editButtonClick(x)}
                            >
                                {editingId === x.id ? <img src="/save.svg" alt="save" className='text-white' /> : <img src="/update.svg" alt="update" className='text-white' />}
                            </button>
                            <button
                                onClick={() => dispatch(removeTodo({ id: x.id }))}
                                className="cursor-pointer text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Todos
