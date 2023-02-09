const emptyNotice = document.getElementById('empty-notice');
const plusButton = document.getElementById('plus-button');
const sortbutton = document.getElementById('sort-button');
const editbuttons = document.getElementById('editbuttons');
const amendbuttons = document.getElementById('amendbuttons');
const firstbuttons = document.getElementById('firtstbuttongroup');
let todoNum = 0;

function toggleCreateTodoForm() {
    const createTodoForm = document.getElementById('todo-form');

    if (createTodoForm.style.display === 'block') {
        createTodoForm.style.display = 'none';
        visiblePlusImage()
        return;
    }

    {
        createTodoForm.style.display = 'block';
        invisiblePlusImage()
    }
}

function createTodo() {
    const todoContentElement = document.getElementById('todo-content');
    todoContent = todoContentElement.value;
    if (todoContent === '') {
        window.alert("내용을 입력해주세요");
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
        const todo = document.createElement('div');
        todo.className = "todo";
        todo.innerHTML =
            `<div class='todo-text'>${todoContent}</div>
            <button class="editbuttons" onclick='check1()'><img src="editbutton.png" alt="편집버튼"></button>
            <button class="editbuttons" onclick='removeSchedule(this)'><img src="cancelbutton.png" alt="삭제버튼"></button>
            `;
        return todo;
    }

    function appendTodo(todo) {
        const todoContainer = document.getElementById("todo-container");
        todoContainer.appendChild(todo);
    }

    function clearTodoContent(todoContentElement) {
        todoContentElement.value = '';
    }

    function removeEmptyNotice() {
        emptyNotice.style.display = 'none';
    }

}

function removeSchedule(deleteButton) {
    deleteButton.parentElement.remove();
    todoNum--;

    if (isTodoListEmpty()) {
        showEmptyNotice();
    }

    function showEmptyNotice() {
        emptyNotice.style.display = 'flex';
    }
}

function isTodoListEmpty() {
    return todoNum === 0;
}


function invisiblePlusImage() {
    firstbuttons.style.display = 'none';

}

function visiblePlusImage() {
    firstbuttons.style.display = 'flex';
}


//편집창 활성화
function check1() {
    console.log("222hihihihhi");
    const todocon = document.getElementById(todoContent);

    todocon.innerHTML =
        `<div class='todo-text'>${todoContent}</div>
        <button class="editbuttons" onclick='check1()'>수정</button>
        <button class="editbuttons" onclick='removeSchedule(this)'>취소</button>`;
}