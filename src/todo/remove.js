import {reloadTodoList, todoList} from "./common";

function removeTodo(todoId) {
    todoList.removeById(todoId)
    reloadTodoList();
}

export {removeTodo};