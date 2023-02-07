import Todo from "./Todo.js";

export default class TodoList {

    constructor() {
        this._todoList = [];
        this._todoId = 1;
    }

    addTodo(content) {
        this._todoList.push(new Todo(this._todoId, content));
        this._todoId++;
    }

    deleteTodoById(todoId) {
        this._todoList = this._todoList.filter(todo => todo.id !== todoId);
    }
}