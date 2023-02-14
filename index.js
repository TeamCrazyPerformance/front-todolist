localStorage.setItem("cnt",0);

function main (){
    if (localStorage.length > 1){
        addInitialUl();
        const ul = document.getElementById("todo-ul");

        for(const key in localStorage){
            if (localStorage.getItem(key)==null || key == "cnt")
                continue
            const val = localStorage.getItem(key);
            ul.appendChild(createLi(key,val));
        }
    }
}

function createDeleteBtn(key){
    const deleteBtn = document.createElement("button");
    deleteBtn.id = "delete-btn-"+key;
    deleteBtn.className = "delete-btn";
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener("click", function(){
        this.parentNode.remove();
        deleteTodo(key)
    });
    return deleteBtn;
}

function createEditBtn(key){
    const editBtn = document.createElement("button");
    editBtn.id = "edit-btn-"+key;
    editBtn.className = "edit-btn";
    const imgSource  = "https://cdn-icons-png.flaticon.com/512/84/84380.png"
    const editImg = document.createElement("img");
    editImg.className = "edit-img";
    editImg.src = imgSource;
    editBtn.appendChild(editImg);
    editBtn.addEventListener("click", function(){
        const parentNode = document.getElementById("todo-list-"+key);
        editTodo(parentNode,key);
    });
    return editBtn;
}

function createLi(key,value){
    const li = document.createElement("li");
    li.className = "todo-list";
    li.id = "todo-list-"+key;

    // make p
    const p = document.createElement("p");
    p.innerText = value;
    p.id = "todo-text-"+key;
    p.className = "todo-text";

    // make delete-button
    const deleteBtn = createDeleteBtn(key);

    // make edit-button
    const editBtn = createEditBtn(key);

    li.appendChild(p);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    return li;
}

function editTodo(parentNode,key){
    const todoTextNode = document.getElementById("todo-text-"+key);
    const backupEditBtn = document.getElementById("edit-btn-"+key);
    const backupDeleteBtn = document.getElementById("delete-btn-"+key);
    document.getElementById("edit-btn-"+key).remove();
    document.getElementById("delete-btn-"+key).remove();
    document.getElementById("todo-text-"+key).remove();
    
    const editInput = document.createElement("input");
    editInput.value = todoTextNode.innerText;
    editInput.id = "edit-input-"+key;
    editInput.className = "edit-input";
    parentNode.appendChild(editInput);

    // when complete button pressed
    const completeEditBtn = document.createElement("button");
    completeEditBtn.id = "complete-edit-btn-"+key;
    completeEditBtn.className = "complete-edit-btn";
    completeEditBtn.innerText = "수정";

    completeEditBtn.addEventListener("click", function(){
        const editedTodo = editInput.value;
        localStorage.setItem(key, editedTodo);
        todoTextNode.innerText = editedTodo;

        parentNode.appendChild(todoTextNode);
        parentNode.appendChild(backupEditBtn);
        parentNode.appendChild(backupDeleteBtn);
        
        clearEditElements(key);
    });
    
    // when cancel button pressed
    const cancelEditBtn = document.createElement("button");
    cancelEditBtn.id = "cancel-edit-btn-"+key;
    cancelEditBtn.className = "cancel-edit-btn";
    cancelEditBtn.innerText = "취소";

    cancelEditBtn.addEventListener("click", function(){
        parentNode.appendChild(todoTextNode);
        parentNode.appendChild(backupEditBtn);
        parentNode.appendChild(backupDeleteBtn);
        
        clearEditElements(key);
    });

    parentNode.appendChild(completeEditBtn);
    parentNode.appendChild(cancelEditBtn);
}

function clearEditElements(key){
    clearInput("edit-input-"+key);
    document.getElementById("edit-input-"+key).remove();
    document.getElementById("complete-edit-btn-"+key).remove();
    document.getElementById("cancel-edit-btn-"+key).remove();
}

function sortTodo() {
    valList = [];

    for (const key in localStorage){
        if(localStorage.getItem(key)==null || key === "cnt")
            continue
        valList.push(localStorage.getItem(key))
    }

    try{
        valList.sort();
        
        const todoUl = document.getElementById("todo-ul")
        todoUl.remove();
        addInitialUl();
        let newUl = document.getElementById("todo-ul");

        localStorage.clear();

        for(var i = 0; i<valList.length; i++){
            newUl.appendChild(createLi(i,valList[i]));
            localStorage.setItem(i, valList[i]);
        }
        localStorage.setItem("cnt", i);
    }
    catch(e){
        console.error("Error: Todolist is empty!")
    }

}

function toggleVisibility() {
    display = document.getElementById("add-todo").style.display;

    if (display === "none")
        document.getElementById("add-todo").style.display = "block";
    else
        document.getElementById("add-todo").style.display = "none"
    
}

// a function to remove default text and add ul
function addInitialUl(){
    const listContainer = document.getElementById("list-container");
    const defaultText = document.getElementById("default-text");
    if(defaultText)
        defaultText.remove();
    const initialUl = document.createElement("ul");  //parent
    initialUl.id = "todo-ul";
    initialUl.className = "todo-ul";
    listContainer.appendChild(initialUl);
}

function deleteTodo(index){
    localStorage.removeItem(index);
    localStorage.setItem("cnt",String(parseInt(localStorage.getItem("cnt"))-1))
    
    // when the last todo is removed, remove ul and add default text.
    if(localStorage.length === 1){
        const listContainer = document.getElementById("list-container");
        const ul = document.getElementById("todo-ul");
        ul.remove();

        const defaultText = document.createElement("p");
        defaultText.innerText = "남은 일정이 없어요";
        defaultText.id = "default-text";
        defaultText.className = "default-text";
        listContainer.appendChild(defaultText);
    }
}

function addTodo() {
    // if todo-list is empty
    if(localStorage.length === 1)
        addInitialUl()

    const ul = document.getElementById("todo-ul");  //parent

    // get what users write
    const todoInput = document.getElementById("todo-input");
    const value = todoInput.value;
    const btnIndex = parseInt(localStorage.getItem("cnt"));
    localStorage.setItem(btnIndex,value);

    ul.appendChild(createLi(btnIndex, value));
    localStorage.setItem("cnt",btnIndex+1)
    clearInput("todo-input");
    toggleVisibility();
}

function clearInput(targetId) {
    const input = document.getElementById(targetId);
    input.value = "";
}

function cancel() {
    clearInput("todo-input");
    toggleVisibility();
}


main()