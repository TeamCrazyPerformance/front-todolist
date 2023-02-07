const PADDING_WITH_SCROLL = "34px";
const PADDING_WITH_NO_SCROLL = "17px";

const plusButton = document.getElementById("plus_button");
const newScheduleInputContainer = document.getElementById("new_schedule_input_container");
const addInputButton = document.getElementById("add_input_button");
const cancelInputButton = document.getElementById("cancel_input_button");
const newScheduleInput = document.getElementById("new_schedule_input");
const noScheduleContainer = document.getElementById("no_schedule_container");
const scheduleListContainer = document.getElementById("schedule_list_container");
const ul = document.querySelector("ul");

let scheduleArray = [];
let isScheduleExist;

function demandNewScheduleInputContainer() {
    newScheduleInputContainer.style.display = 'block';
    plusButton.style.display = "none";
}

function revertNewScheduleInputContainer() {
    newScheduleInputContainer.style.display = "none";
    plusButton.style.display = 'inline';
}

function demandScheduleListContainer() {
    scheduleListContainer.style.display = 'flex';
    scheduleListContainer.style.flex = 1;
    noScheduleContainer.style.display = 'none';
}

function demandNoScheduleListContainer() {
    noScheduleContainer.style.display = 'flex';
    noScheduleContainer.style.flex = 1;
    scheduleListContainer.style.display = 'none';
}

function changeContainerStyle() {
    isScheduleExist = (scheduleArray.length > 0);

    if (isScheduleExist) {
        demandScheduleListContainer();
    } else {
        demandNoScheduleListContainer();
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

    scheduleName.innerText = addedScheduleName;
    scheduleContainer.id = addedScheduleName;
    scheduleDeleteButton.innerText = "x";

    scheduleContainer.appendChild(scheduleName);
    scheduleContainer.appendChild(scheduleDeleteButton);
    ul.appendChild(scheduleContainer);

    scheduleDeleteButton.addEventListener("click", function () {
        scheduleArray = scheduleArray.filter((schedule) => schedule !== addedScheduleName);
        scheduleContainer.remove();
        changeContainerStyle();
    });
}

function clearNewScheduleInput() {
    newScheduleInput.value = null;
}

plusButton.addEventListener("click", function () {
    demandNewScheduleInputContainer();
});

addInputButton.addEventListener("click", function () {
    let addedScheduleName = newScheduleInput.value;
    clearNewScheduleInput();

    if (addedScheduleName.length === 0) {
        window.alert("스케줄 이름을 입력해주세요");
        return;
    } else if (scheduleArray.some((schedule) => schedule === addedScheduleName)) {
        window.alert("이미 존재하는 스케줄입니다");
    } else {
        addSchedule(addedScheduleName);
        changeContainerStyle();
    }

    revertNewScheduleInputContainer();
});

cancelInputButton.addEventListener("click", function () {
    clearNewScheduleInput();
    revertNewScheduleInputContainer();
});