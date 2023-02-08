import Todo from "./Todo.js";

export default class TodoList {

    constructor() {
        const todoList = JSON.parse(localStorage.getItem("todoList"));
        if (todoList === null) {
            this._todoList = [];
            this._todoId = 1;
        } else {
            this._todoList = todoList._todoList
            this._todoId = todoList._todoId
        }
    }

    _updateLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this));
    }

    addTodo(content) {
        const newTodoId = this._todoId++;
        this._todoList.push({
            id: newTodoId,
            content: content
        });
        this._updateLocalStorage();
        return newTodoId;
    }

    findById(todoId) {
        return this._todoList.find(todo => todo.id === todoId);
    }

    removeById(todoId) {
        this._todoList = this._todoList.filter(todo => todo.id !== todoId);
        this._updateLocalStorage();
    }

    size() {
        return this._todoList.length;
    }

    get todoList() {
        return this._todoList;
    }
}