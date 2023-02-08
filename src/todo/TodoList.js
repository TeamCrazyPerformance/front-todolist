import Todo from "./Todo.js";

export default class TodoList {

    constructor() {
        this._todoList = [];
        this._todoId = 1;
    }

    addTodo(content) {
        this._todoList.push(new Todo(this._todoId, content));
        return this._todoId++;
    }

    findById(todoId) {
        return this._todoList.find(todo => todo.id === todoId);
    }

    removeById(todoId) {
        this._todoList = this._todoList.filter(todo => todo.id !== todoId);
    }

    size() {
        return this._todoList.length;
    }
}