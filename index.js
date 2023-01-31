let cnt=0;

function toggleVisibility() {
    display = document.getElementById("add-todo").style.display;

    if (display === "none")
        document.getElementById("add-todo").style.display = "block";
    else
        document.getElementById("add-todo").style.display = "none"
    
}

function addTodo() {
    let listContainer = document.getElementById("list-container");

    // if todo-list is empty, remove default text and add ul
    if(cnt === 0){
        let defaultText = document.getElementById("default-text");
        defaultText.remove();
        let initialUl = document.createElement("ul");  //parent
        initialUl.id = "todo-ul";
        initialUl.className = "todo-ul";
        listContainer.appendChild(initialUl);
    }

    let ul = document.getElementById("todo-ul");  //parent

    // get what users write
    let todoInput = document.getElementById("todo-input");
    let value = todoInput.value;

    // make div which will have p and btn and li which will have div.
    let li = document.createElement("li");
    li.className = "todo-list";

    // make p
    let p = document.createElement("p");
    p.innerText = value;
    p.className = "todo-text";

    // make button
    let btn = document.createElement("button");
    btn.className = "delete-btn";
    btn.innerText = "X";
    btn.addEventListener("click",function(){
        this.parentNode.remove();
        cnt = cnt - 1;
        // when the last todo is removed, remove ul and add default text.
        if(cnt === 0){
            let ul = document.getElementById("todo-ul");
            ul.remove();
            let defaultText = document.createElement("p");
            defaultText.innerText = "남은 일정이 없어요";
            defaultText.id = "default-text";
            defaultText.className = "default-text";
            listContainer.appendChild(defaultText);
        }
    });

    li.appendChild(p);
    li.appendChild(btn)
    ul.appendChild(li);
    cnt = cnt + 1;
    clearInput();
    toggleVisibility();
}

function clearInput() {
    let input = document.getElementById("todo-input");
    input.value = "";
}

function cancel() {
    clearInput();
    toggleVisibility();
}