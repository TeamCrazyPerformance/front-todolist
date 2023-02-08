const plusButton = document.getElementById("plus-button");

function toggleCreateTodoForm() {
    const createTodoForm = document.getElementById("todo-form");

    if (createTodoForm.style.display === "block") {
        createTodoForm.style.display = "none";
        visiblePlusImage()
    } else {
        createTodoForm.style.display = "block";
        invisiblePlusImage()
    }
}

function invisiblePlusImage() {
    plusButton.style.display = "none";
}

function visiblePlusImage() {
    plusButton.style.display = "block";
}

export {toggleCreateTodoForm, invisiblePlusImage, visiblePlusImage};