/**
 * Funtion xử lý sự kiện nhập vào input
 * @param {Object} event - Sự kiện nhập
 * @param {Function} setInputValue -  Hàm để thiết lập giá trị input
 */
export const inputChange = (event, setInputValue) => {
    setInputValue(event.target.value);
};

/**
 * Funtion thêm công việc
 * @param {Object} e - Sự kiện click
 * @param {string} inputValue - Giá trị nhập vào
 * @param {Array} todos - Danh sách công việc
 * @param {Function} setTodos - Function cập nhật danh sách công việc
 * @param {Function} setInputValue - Function cập nhật giá trị nhập vào
 * @param {Function} setToast - Function cập nhật thông báo
 */

export const addTodo = (e, inputValue, todos, setTodos, setInputValue, setToast) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
        const newTodo = {
            id: todos.length + 1,
            text: inputValue,
        };
        setTodos([...todos, newTodo]);
        setInputValue('');
        setToast({ show: true, message: 'Thêm công việc thành công!!!' });
    }
};

/**
 * Funtion xóa công việc
 * @param {number} id - ID công việc cần xóa
 * @param {Array} todos - Danh sách công việc
 * @param {Function} setTodos - Function cập nhật danh sách công việc
 * @param {Function} setToast - Function cập nhật thông báo
 */

export const deleteTodo = (id, todos, setTodos, setToast) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setToast({ show: true, message: 'Xóa công việc thành công!!!' });
};

/**
 * Funtion lưu công việc
 * @param {Array} todos - Danh sách công việc
 * @param {Function} setTodos - Function cập nhật danh sách công việc
 * @param {number} editTodoId - ID công việc cần sửa
 * @param {string} inputValue - Giá trị nhập vào
 * @param {Function} setEditTodoId - Function cập nhật ID công việc cần sửa
 * @param {Function} setInputValue - Function cập nhật giá trị nhập vào
 * @param {Function} setToast - Function cập nhật thông báo
 */

export const saveEdit = (todos, setTodos, editTodoId, inputValue, setEditTodoId, setInputValue, setToast) => {
    const updatedTodos = todos.map((todo) => (todo.id === editTodoId ? { ...todo, text: inputValue } : todo));
    setTodos(updatedTodos);
    setEditTodoId(null);
    setInputValue('');
    setToast({ show: true, message: 'Lưu công việc thành công!!!' });
};

/**
 * Funtion sửa công việc
 * @param {number} id - ID công việc cần sửa
 * @param {string} text - Nội dung công việc
 * @param {Function} setEditTodoId - Function cập nhật ID công việc cần sửa
 * @param {Function} setInputValue - Function cập nhật giá trị nhập vào
 */

export const editTodo = (id, text, setEditTodoId, setInputValue) => {
    setEditTodoId(id);
    setInputValue(text);
};

/**
 * Funtion hủy sửa công việc
 * @param {Function} setEditTodoId - Function cập nhật ID công việc cần sửa
 * @param {Function} setInputValue - Function cập nhật giá trị nhập vào
 */

export const cancelEdit = (setEditTodoId, setInputValue) => {
    setEditTodoId(null);
    setInputValue('');
};
