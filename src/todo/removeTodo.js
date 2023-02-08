import {reloadTodoList, todoList} from "./common.js";

function removeTodo(todoId) {
    todoList.removeById(todoId);
    reloadTodoList();
}

export {removeTodo};