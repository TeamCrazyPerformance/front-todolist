const TODOLIST_KEY = "todoList";

export default class TodoList {

    constructor() {
        const todoList = JSON.parse(localStorage.getItem(TODOLIST_KEY));
        if (todoList === null) {
            this._todoList = [];
            this._todoId = 1;
            this._asc = false;
        } else {
            this._todoList = todoList._todoList;
            this._todoId = todoList._todoId;
            this._asc = todoList._asc;
        }
    }

    _updateLocalStorage() {
        localStorage.setItem(TODOLIST_KEY, JSON.stringify(this));
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

    editById(todoId, content) {
        this._todoList.filter(todo => todo.id === todoId)
            .map(todo => todo.content = content);
        this._updateLocalStorage();
    }

    sort() {
        if (this._asc) {
            this._todoList.sort((a, b) => {
                if (a.content.toUpperCase() < b.content.toUpperCase()) return 1;
                if (a.content.toUpperCase() === b.content.toUpperCase()) return 0;
                if (a.content.toUpperCase() > b.content.toUpperCase()) return -1;
            });
        } else {
            this._todoList.sort((a, b) => {
                if (a.content.toUpperCase() < b.content.toUpperCase()) return -1;
                if (a.content.toUpperCase() === b.content.toUpperCase()) return 0;
                if (a.content.toUpperCase() > b.content.toUpperCase()) return 1;
            });
        }
        this._asc = !this._asc;
        this._updateLocalStorage();
    }

    get todoList() {
        return this._todoList;
    }
}