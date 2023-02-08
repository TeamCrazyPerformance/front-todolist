import TodoList from "./todo/TodoList.js";

const emptyNotice = document.getElementById("empty-notice");
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

    const newTodoId = todoList.addTodo(todoContent);
    const todo = createTodoElement(todoList.findById(newTodoId));
    appendTodoElement(todo);

    if (!isTodoListEmpty()) {
        removeEmptyNotice();
    }

    clearTodoContent(todoContentElement);
    toggleCreateTodoForm()
    visiblePlusImage();


    function createTodoElement(todo) {
        const todoElement = document.createElement("div");
        todoElement.className = "todo";
        todoElement.innerHTML =
            `<div class="todo-text">${todo.content}</div>
            <button class="delete-button" onclick="removeTodo(${todo.id}, this)">x</button>`;
        return todoElement;
    }

    function appendTodoElement(todo) {
        const todoContainer = document.getElementById("todo-container");
        todoContainer.appendChild(todo);
    }

    function clearTodoContent(todoContentElement) {
        todoContentElement.value = "";
    }

    function removeEmptyNotice() {
        emptyNotice.style.display = "none";
    }

}

function removeTodo(todoId, deleteButton) {
    deleteButton.parentElement.remove();
    todoList.removeById(todoId)

    if (isTodoListEmpty()) {
        showEmptyNotice();
    }

    function showEmptyNotice() {
        emptyNotice.style.display = "flex";
    }
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

export {toggleCreateTodoForm, createTodo, removeTodo};