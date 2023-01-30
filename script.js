const PLUS_BUTTON = 0;
const ADD_SCHEDULE_CONTAINER = 1;
const NO_SCHEDULE_MESSAGE = 2;

const plusButton = document.getElementById("plus_button");
const newScheduleInputContainer = document.getElementById("new_schedule_input_container");
const addInputButton = document.getElementById("add_input_button");
const cancelInputButton = document.getElementById("cancel_input_button");
const newScheduleInput = document.getElementById("new_schedule_input");
const noScheduleContainer = document.getElementById("no_schedule_container");
const scheduleListContainer = document.getElementById("schedule_list_container");

const scheduleArray = [];

function requireNewScheduleInputContainer() {
    newScheduleInputContainer.style.display = 'block';
    plusButton.style.display = "none";
}

function revertNewScheduleInputContainer() {
    newScheduleInputContainer.style.display = "none";
    plusButton.style.display = 'inline';
}

function changeContainerStyle() {
    if (scheduleArray.length > 0) {
        scheduleListContainer.style.display = 'flex';
        scheduleListContainer.style.flex = 1;
        noScheduleContainer.style.display = 'none';
    } else {
        scheduleListContainer.style.display = 'none';
        noScheduleContainer.style.display = 'flex';
        noScheduleContainer.style.flex = 1;
    }
}

function addSchedule(addedScheduleName) {
    scheduleArray.push(addedScheduleName);
    addScheduleUI(addedScheduleName);
}

function addScheduleUI(addedScheduleName) {
    const scheduleContainer = document.createElement('div');
    const scheduleName = document.createElement('span');
    const scheduleDeleteButton = document.createElement('button');

    scheduleName.innerText = addedScheduleName;
    scheduleDeleteButton.innerText = "x";
    scheduleDeleteButton.style.border = "none";
    scheduleDeleteButton.style.backgroundColor = "transparent";
    scheduleContainer.id = addedScheduleName;
    scheduleName.style.color = "#000000";
    scheduleDeleteButton.style.color = "#000000";

    scheduleContainer.style.width = "100vw";
    scheduleContainer.style.padding = "24px 17px 24px 11px";
    scheduleContainer.style.borderBottom = "1px solid #DEDEDE";
    scheduleContainer.style.boxSizing = "border-box";
    scheduleDeleteButton.style.float = "right";

    scheduleContainer.appendChild(scheduleName);
    scheduleContainer.appendChild(scheduleDeleteButton);
    scheduleListContainer.appendChild(scheduleContainer);

    scheduleDeleteButton.addEventListener("click", function () {
        for (var i = 0; i < scheduleArray.length; i++) {
            if (scheduleArray[i] === addedScheduleName) {
                scheduleArray.splice(i, 1);
            }
        }

        scheduleContainer.style.display = "none";
        changeContainerStyle();
    });
}

function searchSchedule(addedScheduleName) {
    for (const schedule of scheduleArray) {
        if (addedScheduleName === schedule) {
            return true;
        }
    }

    return false;
}

plusButton.addEventListener("click", function () {
    requireNewScheduleInputContainer();
});

addInputButton.addEventListener("click", function () {
    let addedScheduleName = newScheduleInput.value;

    newScheduleInput.value = null;

    if (addedScheduleName.length === 0) {
        window.alert("스케줄 이름을 입력해주세요");
        return;
    } else if (searchSchedule(addedScheduleName)) {
        window.alert("이미 존재하는 스케줄입니다");
    } else {
        addSchedule(addedScheduleName);
        changeContainerStyle();
    }

    revertNewScheduleInputContainer();
});

cancelInputButton.addEventListener("click", function () {
    newScheduleInput.value = null;
    revertNewScheduleInputContainer();
});