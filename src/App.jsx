import { useState, useEffect } from 'react';
import { MdEdit, MdDeleteOutline } from "react-icons/md";

function App() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);
    const [toast, setToast] = useState(false);

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            const newTodo = {
                id: todos.length + 1,
                text: inputValue
            };
            setTodos([...todos, newTodo]);
            setInputValue('');
            setToast(true);
        }
    };

    const handleEditButtonClick = (id, text) => {
        setEditTodoId(id);
        setInputValue(text);
    };

    const handleSaveEdit = () => {
        const updatedTodos = todos.map(todo =>
            todo.id === editTodoId ? { ...todo, text: inputValue } : todo
        );
        setTodos(updatedTodos);
        setEditTodoId(null);
        setInputValue('');
    };

    const handleCancelEdit = () => {
        setEditTodoId(null);
        setInputValue('');
    };

    const handleDeleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };


    useEffect(() => {
        setTodos([]);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setToast(false);
        }, 3000);
    }, [todos, toast]);


    return (
        <div className='bg-slate-400 text-center h-screen w-screen'>
            <h1 className='py-6'>Todo List</h1>
            <div className="gap-4 flex justify-center">
                <input type="text" value={inputValue} onChange={handleInputChange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[400px]" placeholder="Nhập công việc" />
                {editTodoId !== null ? (
                    <>
                        <button onClick={handleSaveEdit} className="btn">Lưu</button>
                        <button onClick={handleCancelEdit} className="btn">Hủy</button>
                    </>
                ) : (
                    <button onClick={handleAddTodo} className="btn">Thêm mới</button>
                )}
            </div>
            <div className='flex justify-center mt-7'>
                <div className="relative overflow-x-auto">
                    <table className="w-[510px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    STT
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Công việc
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((item, index) => (
                                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-200 transition duration-100">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[16px]">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-2 text-xl">
                                        {item.text}
                                    </td>
                                    <td className="flex justify-center gap-4 py-6 text-[16px]">
                                        {editTodoId === item.id ? (
                                            null
                                        ) : (
                                            <button onClick={() => handleEditButtonClick(item.id, item.text)}><MdEdit /></button>
                                        )}
                                        <button onClick={() => handleDeleteTodo(item.id)}><MdDeleteOutline /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {toast && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-success">
                        <span className='text-[18px] font-semibold text-white'>Thêm công việc thành công!!!</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
