const btnGroup = document.getElementById("header-btn-group");

function toggleCreateTodoForm() {
    const createTodoForm = document.getElementById("todo-form");

    if (createTodoForm.style.display === "block") {
        createTodoForm.style.display = "none";
        showBtnGroup();
    } else {
        createTodoForm.style.display = "block";
        hideBtnGroup();
    }
}

function hideBtnGroup() {
    btnGroup.style.display = "none";
}

function showBtnGroup() {
    btnGroup.style.display = "flex";
}

export {toggleCreateTodoForm, hideBtnGroup, showBtnGroup};