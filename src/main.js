import TodoList from "./todo/TodoList.js";

const plusButton = document.getElementById("plus-button");
const todoList = new TodoList();

function toggleCreateTodoForm() {
    const createTodoForm = document.getElementById("todo-form");

    if (createTodoForm.style.display === "block") {
        createTodoForm.style.display = "none";
        visiblePlusImage()
    } else {
        createTodoForm.style.display = "block";
        invisiblePlusImage()
    }
}

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
    toggleCreateTodoForm()
    visiblePlusImage();

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
            <button class="delete-button" onclick="removeTodo(${todo.id})">x</button>`;
        return todoElement;
    }
}

function removeTodo(todoId) {
    todoList.removeById(todoId)
    reloadTodoList();
}

function isTodoListEmpty() {
    return todoList.size() === 0;
}

function invisiblePlusImage() {
    plusButton.style.display = "none";
}

function visiblePlusImage() {
    plusButton.style.display = "block";
}

reloadTodoList();

export {toggleCreateTodoForm, createTodo, removeTodo};