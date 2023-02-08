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
        todoElement.innerHTML =
            `<div class="todo-text">${todo.content}</div>
            <div class="todo-btn-group">
                <button class="todo-btn" onclick=""><img src="image/edit.png" alt="편집"></button>
                <button class="todo-btn" onclick="removeTodo(${todo.id})">x</button>
            </div>`;
        return todoElement;
    }

    function isTodoListEmpty() {
        return todoList.size() === 0;
    }
}

function removeTodo(todoId) {
    todoList.removeById(todoId)
    reloadTodoList();
}

function toggleCreateTodoForm() {
    header.toggleCreateTodoForm();
}

reloadTodoList();

export {toggleCreateTodoForm, createTodo, removeTodo};