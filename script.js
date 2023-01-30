const PLUS_BUTTON = 0;
const ADD_SCHEDULE_CONTAINER = 1;
const NO_SCHEDULE_MESSAGE = 2;

const plusButtonWrapper = document.getElementById("plus_button_wrapper");
const addScheduleContainer = document.getElementById("addScheduleContainer");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");
const scheduleInput = document.getElementById("scheduleInput");
const container = document.getElementById("container");
const noScheduleMessage = document.getElementById("noScheduleMessage");
const schedulesContainer = document.getElementById("schedulesContainer");

let scheduleArray = [];

function showContents(content) {
    switch (content) {
        case PLUS_BUTTON:
            plusButtonWrapper.style.display = 'inline';
            break;

        case ADD_SCHEDULE_CONTAINER:
            addScheduleContainer.style.display = 'block';
            break;

        case NO_SCHEDULE_MESSAGE:
            noScheduleMessage.style.display = 'block';
            break;

        // no default
    }
}

function hideContents(content) {
    let target;

    switch (content) {
        case PLUS_BUTTON:
            target = plusButtonWrapper;
            break;

        case ADD_SCHEDULE_CONTAINER:
            target = addScheduleContainer;
            break;

        case NO_SCHEDULE_MESSAGE:
            target = noScheduleMessage;
            break;

        // no default
    }

    target.style.display = "none";
}

function changeContainerStyle() {
    if (scheduleArray.length > 0) {
        container.style.flexDirection = "column"
        container.style.alignItems = "flex-start";
        container.style.justifyContent = "flex-start";
        hideContents(NO_SCHEDULE_MESSAGE);
    } else {
        container.style.flexDirection = "row"
        container.style.alignItems = "center";
        container.style.justifyContent = "center";
        showContents(NO_SCHEDULE_MESSAGE);
    }
}

function addSchedule(addedScheduleName) {
    scheduleArray.push(addedScheduleName);
    addScheduleUI(addedScheduleName);
}

function addScheduleUI(addedScheduleName) {
    const scheduleContainer = document.createElement('div');
    const scheduleName = document.createElement('span');
    const scheduleDeleteButton = document.createElement('span');

    scheduleName.innerText = addedScheduleName;
    scheduleDeleteButton.innerText = "x";
    scheduleContainer.id = addedScheduleName;

    scheduleContainer.style.width = "100vw";
    scheduleContainer.style.padding = "24px 17px 24px 11px";
    scheduleContainer.style.borderBottom = "1px solid #DEDEDE";
    scheduleContainer.style.boxSizing = "border-box";
    scheduleDeleteButton.style.float = "right";

    scheduleContainer.appendChild(scheduleName);
    scheduleContainer.appendChild(scheduleDeleteButton);
    container.appendChild(scheduleContainer);

    scheduleDeleteButton.addEventListener("click", function () {
        for (var i = 0; i < scheduleArray.length; i++) {
            if (scheduleArray[i] === addedScheduleName) {
                scheduleArray.splice(i, 1);
                return;
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

plusButtonWrapper.addEventListener("click", function () {
    showContents(ADD_SCHEDULE_CONTAINER);
    hideContents(PLUS_BUTTON);
});

addBtn.addEventListener("click", function () {
    let addedScheduleName = scheduleInput.value;

    scheduleInput.value = null;

    if (addedScheduleName.length === 0) {
        window.alert("스케줄 이름을 입력해주세요");
        return;
    } else if (searchSchedule(addedScheduleName)) {
        window.alert("이미 존재하는 스케줄입니다");
    } else {
        addSchedule(addedScheduleName);
        changeContainerStyle();
    }

    showContents(PLUS_BUTTON);
    hideContents(ADD_SCHEDULE_CONTAINER);
});

cancelBtn.addEventListener("click", function () {
    scheduleInput.value = null;

    showContents(PLUS_BUTTON);
    hideContents(ADD_SCHEDULE_CONTAINER);
});