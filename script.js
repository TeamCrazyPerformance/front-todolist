const PADDING_WITH_SCROLL = "34px";
const PADDING_WITH_NO_SCROLL = "17px";

const plusButton = document.getElementById("plus_button");
const alignButton = document.getElementById("align_button");
const newScheduleInputContainer = document.getElementById("new_schedule_input_container");
const addInputButton = document.getElementById("add_input_button");
const cancelInputButton = document.getElementById("cancel_input_button");
const newScheduleInput = document.getElementById("new_schedule_input");
const noScheduleContainer = document.getElementById("no_schedule_container");
const scheduleListContainer = document.getElementById("schedule_list_container");
const ul = document.querySelector("ul");

let scheduleArray = [];
let isScheduleExist;

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
    addScheduleUI(addedScheduleName);
}

function addScheduleUI(addedScheduleName) {
    const scheduleContainer = document.createElement('li');
    const scheduleName = document.createElement('span');
    const scheduleDeleteButton = document.createElement('button');
    const scheduleEditButton = document.createElement('button');
    const scheduleButtonContainer = document.createElement('div');

    scheduleName.innerText = addedScheduleName;
    scheduleContainer.id = addedScheduleName;
    scheduleDeleteButton.className = "list_delete_button";
    scheduleEditButton.className = "list_edit_button";
    scheduleButtonContainer.className = "list_button_container";

    scheduleContainer.appendChild(scheduleName);
    scheduleButtonContainer.appendChild(scheduleEditButton);
    scheduleButtonContainer.appendChild(scheduleDeleteButton);
    scheduleContainer.appendChild(scheduleButtonContainer);
    ul.appendChild(scheduleContainer);

    scheduleDeleteButton.addEventListener("click", function () {
        scheduleArray = scheduleArray.filter(schedule => !checkScheduleExist(schedule, addedScheduleName));
        scheduleContainer.remove();
        changeContainerStyle();
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
    scheduleArray.forEach(schedule => {
        addScheduleUI(schedule);
    });
}

plusButton.addEventListener("click", function () {
    getNewScheduleInputContainer();
});

alignButton.addEventListener("click", function() {
    scheduleArray.reverse();
    
    removeScheduleDisplay();
    drawScheduleDisplay();
});

addInputButton.addEventListener("click", function () {
    let addedScheduleName = newScheduleInput.value;
    clearNewScheduleInput();

    if (addedScheduleName.length === 0) {
        window.alert("스케줄 이름을 입력해주세요");
        return;
    } else if (scheduleArray.some(schedule => checkScheduleExist(schedule, addedScheduleName))) {
        window.alert("이미 존재하는 스케줄입니다");
    } else {
        addSchedule(addedScheduleName);
        changeContainerStyle();
    }

    hideNewScheduleInputContainer();
});

cancelInputButton.addEventListener("click", function () {
    clearNewScheduleInput();
    hideNewScheduleInputContainer();
});