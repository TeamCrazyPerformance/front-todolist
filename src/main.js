import TodoList from "./todo/TodoList.js";
import * as header from "./header/header.js";

const todoList = new TodoList();

function createTodo() {
    const todoContentElement = document.getElementById("todo-content");
    const todoContent = todoContentElement.value;

    if (todoContent === "") {
        alert("내용을 입력해주세요");
        return;
    }

    todoList.addTodo(todoContent);
    reloadTodoList();

    clearTodoContent(todoContentElement);
    header.toggleCreateTodoForm()
    header.showBtnGroup();

    function clearTodoContent(todoContentElement) {
        todoContentElement.value = "";
    }
}

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

function reloadTodoList() {
    const todoContainer = document.getElementById("todo-container");
    todoContainer.innerHTML = "";
    if (isTodoListEmpty()) {
        showEmptyNotice();
        return;
    }
    todoList.todoList.forEach(todo => appendTodoElement(todo));


    function showEmptyNotice() {
        todoContainer.innerHTML = `<div id="empty-notice">남은 일정이 없어요</div>`
    }

    function appendTodoElement(todo) {
        const todoElement = createTodoElement(todo)
        todoContainer.appendChild(todoElement);
    }

    function createTodoElement(todo) {
        const todoElement = document.createElement("div");
        todoElement.className = "todo";
        todoElement.id = todo.id;
        todoElement.innerHTML = getTodoHtml(todo);
        return todoElement;
    }

    function isTodoListEmpty() {
        return todoList.size() === 0;
    }
}

function getTodoHtml(todo) {
    return `<div class="todo-text">${todo.content}</div>
            <div class="todo-btn-group">
                <button class="todo-btn" onclick="showEditTodoForm(${todo.id})"><img src="image/edit.png" alt="편집"></button>
                <button class="todo-btn" onclick="removeTodo(${todo.id})">X</button>
            </div>`;
}

function removeTodo(todoId) {
    todoList.removeById(todoId)
    reloadTodoList();
}

function toggleCreateTodoForm() {
    header.toggleCreateTodoForm();
}

reloadTodoList();

export {toggleCreateTodoForm, createTodo, removeTodo, showEditTodoForm, cancelEdit, editTodo};