const VIEW_MODE = "view_mode";
const EDIT_MODE = "edit_mode";

const plusButton = document.getElementById("plus_button");
const alignButton = document.getElementById("align_button");
const newScheduleInputContainer = document.getElementById("new_schedule_input_container");
const addInputButton = document.getElementById("add_input_button");
const cancelInputButton = document.getElementById("cancel_input_button");
const newScheduleInput = document.getElementById("new_schedule_input");
const noScheduleContainer = document.getElementById("no_schedule_container");
const scheduleListContainer = document.getElementById("schedule_list_container");
const ul = document.querySelector("ul");

let scheduleArray;
let isScheduleExist;

window.onload = function() {
    scheduleArray = localStorage.length === 0? [] : localStorage.getItem("scheduleArray").split(",");
    scheduleArray = scheduleArray.filter(schedule => schedule !== "");
    updateLocalStorage();
    removeScheduleDisplay();
    drawScheduleDisplay();
}

function updateLocalStorage() {
    localStorage.removeItem("scheduleArray");
    localStorage.setItem("scheduleArray", scheduleArray);
}

function getNewScheduleInputContainer() {
    newScheduleInputContainer.style.display = 'block';
    plusButton.style.display = "none";
    alignButton.style.display = "none";
}

function hideNewScheduleInputContainer() {
    newScheduleInputContainer.style.display = "none";
    plusButton.style.display = 'inline';
    alignButton.style.display = 'inline';
}

function getScheduleListContainer() {
    scheduleListContainer.style.display = 'flex';
    scheduleListContainer.style.flex = 1;
    noScheduleContainer.style.display = 'none';
}

function getNoScheduleListContainer() {
    noScheduleContainer.style.display = 'flex';
    noScheduleContainer.style.flex = 1;
    scheduleListContainer.style.display = 'none';
}

function checkScheduleExist(schedule, addedScheduleName) {
    return schedule === addedScheduleName;
}

function changeContainerStyle() {
    isScheduleExist = (scheduleArray.length > 0);

    if (isScheduleExist) {
        getScheduleListContainer();
    } else {
        getNoScheduleListContainer();
    }
}

function addSchedule(addedScheduleName) {
    scheduleArray.push(addedScheduleName);
    updateLocalStorage();
    addScheduleUI(addedScheduleName);
}

function changeViewEditMode(viewModeElement, editModeElement, mode) {
    if (mode === VIEW_MODE) {
        for (let i = 0; i < viewModeElement.length; i++) {
            editModeElement[i].replaceWith(viewModeElement[i]);
        }
    } else if (mode === EDIT_MODE) {
        for (let i = 0; i < viewModeElement.length; i++) {
            viewModeElement[i].replaceWith(editModeElement[i]);
        }
    }
}

function addScheduleUI(addedScheduleName) {
    const scheduleContainer = document.createElement('li');
    const scheduleName = document.createElement('span');
    const scheduleDeleteButton = document.createElement('button');
    const scheduleEditButton = document.createElement('button');
    const scheduleButtonContainer = document.createElement('div');
    const editInput = document.createElement('input');
    const editCancelButton = document.createElement('button');
    const editCompleteButton = document.createElement('button');

    scheduleName.innerText = addedScheduleName;
    scheduleContainer.id = addedScheduleName;
    scheduleDeleteButton.className = "list_delete_button";
    scheduleEditButton.className = "list_edit_button";
    scheduleButtonContainer.className = "list_button_container";
    editInput.value = addedScheduleName;
    editCancelButton.innerHTML = "<span>취소</span>";
    editCompleteButton.innerHTML = "<span>수정</span>";
    editInput.className = "edit_input";
    editCancelButton.className = "black_text_button";
    editCompleteButton.className = "black_text_button";

    scheduleContainer.appendChild(scheduleName);
    scheduleButtonContainer.appendChild(scheduleEditButton);
    scheduleButtonContainer.appendChild(scheduleDeleteButton);
    scheduleContainer.appendChild(scheduleButtonContainer);
    ul.appendChild(scheduleContainer);

    const viewModeElement = [scheduleName, scheduleEditButton, scheduleDeleteButton];
    const editModeElement = [editInput, editCompleteButton, editCancelButton];

    scheduleDeleteButton.addEventListener("click", function() {
        scheduleArray = scheduleArray.filter(schedule => !checkScheduleExist(schedule, addedScheduleName));
        updateLocalStorage();
        scheduleContainer.remove();
        changeContainerStyle();
    });

    scheduleEditButton.addEventListener("click", function() {
        changeViewEditMode(viewModeElement, editModeElement, EDIT_MODE);
    });

    editCancelButton.addEventListener("click", function() {
        changeViewEditMode(viewModeElement, editModeElement, VIEW_MODE);
    });

    editCompleteButton.addEventListener("click", function() {
        let editedScheduleName = editInput.value;

        if (editedScheduleName.length === 0) {
            window.alert("스케줄 이름을 입력해주세요");
        } else if (scheduleArray.some(schedule => checkScheduleExist(schedule, editedScheduleName))) {
            window.alert("이미 존재하는 스케줄입니다");
        } else {
            scheduleArray = scheduleArray.map(schedule => schedule === addedScheduleName? editedScheduleName : schedule);
            updateLocalStorage();
            changeViewEditMode(viewModeElement, editModeElement, VIEW_MODE);
            removeScheduleDisplay();
            drawScheduleDisplay();
        }
    });
}

function clearNewScheduleInput() {
    newScheduleInput.value = null;
}

function removeScheduleDisplay() {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

function drawScheduleDisplay() {
    changeContainerStyle();
    scheduleArray.forEach(schedule => {
        addScheduleUI(schedule);
    });   
}

plusButton.addEventListener("click", function () {
    getNewScheduleInputContainer();
});

alignButton.addEventListener("click", function() {
    scheduleArray.reverse();
    updateLocalStorage();
    removeScheduleDisplay();
    drawScheduleDisplay();
});

addInputButton.addEventListener("click", function () {
    let addedScheduleName = newScheduleInput.value;
    clearNewScheduleInput();

    if (addedScheduleName.length === 0) {
        window.alert("스케줄 이름을 입력해주세요");
    } else if (scheduleArray.some(schedule => checkScheduleExist(schedule, addedScheduleName))) {
        window.alert("이미 존재하는 스케줄입니다");
    } else {
        addSchedule(addedScheduleName);
        changeContainerStyle();
        hideNewScheduleInputContainer();
    }
});

cancelInputButton.addEventListener("click", function () {
    clearNewScheduleInput();
    hideNewScheduleInputContainer();
});