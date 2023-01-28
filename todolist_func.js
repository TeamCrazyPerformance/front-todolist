const emptyNotice = document.getElementById("empty-notice");
const plusButton = document.getElementById("plus-button");
let todoNum = 0;

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

    const todo = createTodoElement(todoContent);
    appendTodo(todo);
    todoNum++;

    if (!isTodoListEmpty()) {
        removeEmptyNotice();
    }

    clearTodoContent(todoContentElement);
    toggleCreateTodoForm()
    visiblePlusImage();


    function createTodoElement(todoContent) {
        const todo = document.createElement("div");
        todo.className = "todo";
        todo.innerHTML =
            `<div class="todo-text">${todoContent}</div>
            <button class="delete-button" onclick="removeTodo(this)">x</button>`;
        return todo;
    }

    function appendTodo(todo) {
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

function removeTodo(deleteButton) {
    deleteButton.parentElement.remove();
    todoNum--;

    if (isTodoListEmpty()) {
        showEmptyNotice();
    }

    function showEmptyNotice() {
        emptyNotice.style.display = "flex";
    }
}

function isTodoListEmpty() {
    return todoNum === 0;
}


function invisiblePlusImage() {
    plusButton.style.display = "none";
}

function visiblePlusImage() {
    plusButton.style.display = "block";
}