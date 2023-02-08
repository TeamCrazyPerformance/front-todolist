import * as header from "../header/header.js";
import {todoList, reloadTodoList} from "./common.js";

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

export {createTodo};