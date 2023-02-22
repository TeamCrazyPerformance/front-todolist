import TodoList from "./TodoList.js";

const todoList = new TodoList();

function getTodoHtml(todo) {
    return `<div class="todo-text">${todo.content}</div>
            <div class="todo-btn-group">
                <button class="todo-btn" onclick="showEditTodoForm(${todo.id})"><img src="image/edit.png" alt="편집"></button>
                <button class="todo-btn" onclick="removeTodo(${todo.id})">X</button>
            </div>`;
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
        todoContainer.innerHTML = `<div id="empty-notice">남은 일정이 없어요</div>`;
    }

    function appendTodoElement(todo) {
        const todoElement = createTodoElement(todo);
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

export {todoList, reloadTodoList, getTodoHtml};