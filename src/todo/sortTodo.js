import {reloadTodoList, todoList} from "./common.js";

function sort() {
    todoList.sort();
    reloadTodoList();
}

export {sort};