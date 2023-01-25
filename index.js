let cnt=0;

function toggleVisibility() {
    let element = document.getElementById("add-todo");
    let hidden = element.getAttribute("hidden");

    if (hidden)
        element.removeAttribute("hidden"); 
    else
        element.setAttribute("hidden", "hidden");
    
}

function addTodo() {
    let list_container = document.getElementById("list-container");

    // if todo-list is empty, remove default text and add ul
    if(cnt === 0){
        let e = document.getElementById("default-text");
        e.remove();
        let initial_ul = document.createElement("ul");  //parent
        list_container.appendChild(initial_ul)
    }

    let ul = document.getElementsByTagName("ul")[0];  //parent

    // get what users write
    let element = document.getElementById("input");
    let value = element.value;

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
        console.log(cnt)
        if(cnt === 0){
            let e = document.getElementsByTagName("ul")[0];
            e.remove();
            let default_text = document.createElement("p");
            default_text.innerText = "남은 일정이 없어요";
            default_text.id = "default-text";
            default_text.className = "default-text";
            list_container.appendChild(default_text);
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
    let element = document.getElementById("input");
    element.value = "";
}
function cancel() {
    clearInput();
    toggleVisibility();
}