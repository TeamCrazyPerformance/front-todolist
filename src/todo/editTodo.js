import {todoList, getTodoHtml} from "./common.js";

function showEditTodoForm(todoId) {
    const todoElement = document.getElementById(todoId);
    const todo = todoList.findById(todoId);

    todoElement.innerHTML =
        `<input id="todo-edit-input${todo.id}" value="${todo.content}">
        <div class="edit-btn-group">
            <button id="edit-todo" onclick="editTodo(${todo.id})">수정</button>
            <button id="cancel-edit-todo" onclick="cancelEdit(${todo.id})">취소</button>
        </div>`;
}

function editTodo(todoId) {
    const todoElement = document.getElementById(todoId);
    const editContent = document.getElementById(`todo-edit-input${todoId}`).value;

    if (editContent === "") {
        alert("내용을 입력해주세요");
        return;
    }
    todoList.editById(todoId, editContent);
    todoElement.innerHTML = getTodoHtml(todoList.findById(todoId));
}

function cancelEdit(todoId) {
    const todoElement = document.getElementById(todoId);
    const todo = todoList.findById(todoId);

    todoElement.innerHTML = getTodoHtml(todo)
}

export {showEditTodoForm, editTodo, cancelEdit};