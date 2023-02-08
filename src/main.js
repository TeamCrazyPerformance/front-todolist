import {reloadTodoList} from "./todo/common.js";
import * as header from "./header/header.js";
import * as edit from "./todo/editTodo.js";
import * as create from "./todo/createTodo.js"
import * as remove from "./todo/remove.js"
import * as sort from "./todo/sortTodo.js";

function createTodo() {
    create.createTodo();
}

function toggleCreateTodoForm() {
    header.toggleCreateTodoForm();
}

function showEditTodoForm(todoId) {
    edit.showEditTodoForm(todoId);
}

function editTodo(todoId) {
    edit.editTodo(todoId);
}

function cancelEdit(todoId) {
    edit.cancelEdit(todoId);
}

function removeTodo(todoId) {
    remove.removeTodo(todoId);
}

function sortTodoList() {
    sort.sort();
}

reloadTodoList();

export {toggleCreateTodoForm, createTodo, removeTodo, showEditTodoForm, cancelEdit, editTodo, sortTodoList};