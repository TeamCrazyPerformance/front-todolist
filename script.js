const VIEW_MODE = "view_mode";
const EDIT_MODE = "edit_mode";

const plusButton = document.getElementById("plus_button");
const alignButton = document.getElementById("align_button");
const subHeader = document.getElementById("sub-header");
const addInputButton = document.getElementById("add_input_button");
const cancelInputButton = document.getElementById("cancel_input_button");
const newScheduleInput = document.getElementById("sub-header__input");
const noScheduleContainer = document.getElementById("no-schedule-section");
const scheduleListContainer = document.getElementById("schedule-list-section");
const ul = document.querySelector("ul");
const view = document.querySelector('#schedule-list-section__template--view');
const edit = document.querySelector('#schedule-list-section__template--edit')

let scheduleArray;
let isScheduleExist;

window.onload = function() {
    scheduleArray = localStorage.getItem("scheduleArray").length === 0? [] : JSON.parse(localStorage.getItem("scheduleArray"));
    updateLocalStorage();
    removeScheduleDisplay();
    drawScheduleDisplay();
}

function updateLocalStorage() {
    localStorage.removeItem("scheduleArray");
    localStorage.setItem("scheduleArray", JSON.stringify(scheduleArray));
}

function getSubHeader() {
    subHeader.className = "sub-header--show";
    plusButton.classList.toggle("main-header__button--hide");
    alignButton.classList.toggle("main-header__button--hide");
}

function hideSubHeader() {
    subHeader.className = "sub-header--hide";
    plusButton.classList.toggle("main-header__button--hide");
    alignButton.classList.toggle("main-header__button--hide");
}

function getScheduleListContainer() {
    scheduleListContainer.className = "schedule-list-section--show";
    noScheduleContainer.className = "no-schedule-section--hide";
}

function getNoScheduleListContainer() {
    scheduleListContainer.className = "schedule-list-section--hide";
    noScheduleContainer.className = "no-schedule-section--show";
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

function getScheduleEditMode(addedScheduleName) {
    const viewUI = document.getElementById(addedScheduleName);
    viewUI.replaceWith(createEditScheduleUI(addedScheduleName));
}

function getScheduleViewMode(addedScheduleName, editedScheduleName) {
    const editUI = document.getElementById(addedScheduleName);
    editUI.replaceWith(createScheduleLiUI(editedScheduleName));
}

function createScheduleLiUI(addedScheduleName) {
    const viewUI = document.importNode(view.content, true);
    viewUI.querySelector('.schedule-list-section__li').id = addedScheduleName;
    viewUI.querySelector('.schedule-list__schedule-name').innerText = addedScheduleName;

    viewUI.querySelector('.schedule-list__delete-button').addEventListener("click", function() {
        scheduleArray = scheduleArray.filter(schedule => !checkScheduleExist(schedule, addedScheduleName));
        updateLocalStorage();
        removeScheduleDisplay();
        drawScheduleDisplay();
    });

    viewUI.querySelector('.schedule-list__edit-button').addEventListener("click", function() {
        getScheduleEditMode(addedScheduleName);
    });

    return viewUI;
}

function createEditScheduleUI(addedScheduleName) {
    const editUI = document.importNode(edit.content, true);
    const editUIInput = editUI.querySelector('input');
    editUIInput.value = addedScheduleName;
    const editUILi = editUI.querySelector('.schedule-list-section__li');
    editUILi.id = addedScheduleName;

    editUI.querySelector('.schedule-list__cancel-button--edit').addEventListener("click", function() {
        getScheduleViewMode(addedScheduleName, addedScheduleName);
    });

    editUI.querySelector('.schedule-list__edit-button--edit').addEventListener("click", function() {
        const editedScheduleName = editUIInput.value;

        if (editedScheduleName.length === 0) {
            window.alert("스케줄 이름을 입력해주세요");
        } else if (addedScheduleName === editedScheduleName) {
            window.alert("스케줄 변경이 없습니다. 스케줄 변경을 취소하시려면 취소 버튼을 눌러주세요.");
         }else if (scheduleArray.some(schedule => checkScheduleExist(schedule, editedScheduleName))) {
            window.alert("이미 존재하는 스케줄입니다");
        } else {
            scheduleArray = scheduleArray.map(schedule => schedule === addedScheduleName? editedScheduleName : schedule);
            updateLocalStorage();
            getScheduleViewMode(addedScheduleName, editedScheduleName);
        }
    });

    return editUI;
}

function addScheduleUI(addedScheduleName) {
    const viewUI = createScheduleLiUI(addedScheduleName);
    ul.appendChild(viewUI);
    createEditScheduleUI(addedScheduleName);
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
    getSubHeader();
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
        hideSubHeader();
    }
});

cancelInputButton.addEventListener("click", function () {
    clearNewScheduleInput();
    hideSubHeader();
});