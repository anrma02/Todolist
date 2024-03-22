import { useState, useEffect, useRef } from 'react';
import { MdDeleteOutline } from "react-icons/md";

import { addTodo, cancelEdit, deleteTodo, editTodo, inputChange, saveEdit } from './utils/todoHandle';
import Button from './components/Button';
import { ActionButton } from './components/ActionButton';
import moment from 'moment';

function App() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '' });
    const [time, setTime] = useState(moment.duration(0));
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);


    useEffect(() => {
        setTodos([]);
    }, []);

    useEffect(() => {
        if (toast.show) {
            setTimeout(() => {
                setToast({ show: false, message: '' });
            }, 2000);
        }
    }, [toast]);


    useEffect(() => {
        if (isRunning) {
            // Nếu đang chạy thì tăng thời gian lên 1 giây
            intervalRef.current = setInterval(() => {
                setTime(prevTime => moment.duration(prevTime.asSeconds() + 1, 'seconds'));
            }, 1000);
        }
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    //  Function bắt đầu timer
    const handleStartTimer = () => {
        setIsRunning(true);
    };

    // Function dừng timer
    const handleStopTimer = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
    };

    // Function reset timer
    const handleResetTimer = () => {
        setTime(moment.duration(0));
        setIsRunning(false);
        clearInterval(intervalRef.current);
    }

    // Function nhập dữ liệu
    const handleInputChange = event => {
        inputChange(event, setInputValue);
    };

    // Function thêm công việc
    const handleAddTodo = (e) => {
        e.preventDefault();
        addTodo(e, inputValue, todos, setTodos, setInputValue, setToast);
    };

    // Function sửa công việc
    const handleEditButtonClick = (id, text) => {
        editTodo(id, text, setEditTodoId, setInputValue)
    };

    // Function lưu công việc
    const handleSaveEdit = () => {
        saveEdit(todos, setTodos, editTodoId, inputValue, setEditTodoId, setInputValue, setToast);
    };

    // Function hủy sửa công việc
    const handleCancelEdit = () => {
        cancelEdit(setEditTodoId, setInputValue);
    };

    // Function xóa công việc
    const handleDeleteTodo = (id) => {
        deleteTodo(id, todos, setTodos, setToast);
    };

    return (
        <div className='bg-slate-400 text-center h-screen w-screen'>
            <h1 className='pt-6'>Todo List</h1>
            <div className='my-4 '>
                <div className='text-[18px] py-5 font-bold text-red-800'> {`${time.hours()} Hour : ${time.minutes()} Minute : ${time.seconds()} Second`}</div>
                <Button onClick={handleStartTimer} className='btn' >Toggle</Button>  &nbsp; &nbsp;
                <Button onClick={handleStopTimer} className='btn' >Stop</Button>&nbsp; &nbsp;
                <Button onClick={handleResetTimer} className='btn' >Reset</Button>
            </div>
            <form onSubmit={handleAddTodo} className="gap-4 flex justify-center">
                <input type="text" value={inputValue} onChange={handleInputChange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[400px]" placeholder="Nhập công việc" />
                <ActionButton
                    action={editTodoId !== null ? 'edit' : 'add'}
                    onClick={handleSaveEdit}
                    onCancel={handleCancelEdit}

                />
            </form>
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
                                        <ActionButton
                                            action="editItem"
                                            item={item}
                                            handleEditButtonClick={handleEditButtonClick}
                                        />
                                        <Button onClick={() => handleDeleteTodo(item.id)}>
                                            <MdDeleteOutline />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {toast.show && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-success">
                        <span className='text-[18px] font-semibold text-white'>{toast.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
