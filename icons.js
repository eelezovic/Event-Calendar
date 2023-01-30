//Adding Tasks 
const dayIconTaskDocumentElement = document.getElementById("day-icon");
const eveningIconTaskDocumentElement = document.getElementById("evening-icon");
const payDayIconTaskDocumentElement = document.getElementById("dollar-icon");
const onCallIconTaskDocumentElement = document.getElementById("oncall-icon");
const sickIconTaskDocumentElement = document.getElementById("sick-icon");
const vacationIconTaskDocumentElement = document.getElementById("vacation-icon");
const toDeselecAllTasksButton = document.getElementById("deselect");
const containerWithTasksAndIcons = document.querySelector(".task_container");
const tableDisplayingAllDaysOfTheMonth = document.querySelector(".table");
const resetAllTasksButton = document.querySelector('.resetTasksButton');
const popUpContainerToResetTasks = document.querySelector('.pop-up_container');
const noButtonToResetAllTasks = document.getElementById("button_no");
const yesButtonToResetAllTasks = document.getElementById("button_yes");
const addTaskBtn = document.querySelector(".add-task");
const leftContainer = document.querySelector('.container-left')


//Select Task
let selectedColor, active;

containerWithTasksAndIcons.addEventListener("click", selectTask);
tableDisplayingAllDaysOfTheMonth.addEventListener("click", setColors);
toDeselecAllTasksButton.addEventListener("click", resetTasks);
resetAllTasksButton.addEventListener("click", openPopup);
noButtonToResetAllTasks.addEventListener("click", ClosePopup);
yesButtonToResetAllTasks.addEventListener("click", deleteTasks);

//Click to Show Task Icons 
document.querySelector('.add-task').addEventListener("click", function() {
    document.querySelector('.container-left').style.display = "block";
});


//Task on Click
function selectTask(e){
    taskColor = e.target.style.backgroundColor;

    switch(e.target.id) {
        case "day-icon":
            activeTask(dayIconTaskDocumentElement, taskColor);
            icon = '<i class="fa-regular fa-sun"></i>'
            break
        case "evening-icon":
            activeTask(eveningIconTaskDocumentElement, taskColor);
            icon = '<i class="fa-solid fa-cloud-moon"></i>'
            break
        case "dollar-icon":
            activeTask(payDayIconTaskDocumentElement , taskColor);
            icon = '<i class="fa-light fa-dollar-sign"></i>'
            break
        case "oncall-icon":
            activeTask(onCallIconTaskDocumentElement, taskColor);
            icon = '<i class="fa-solid fa-phone"></i>'
            break
        case "sick-icon":
            activeTask(sickIconTaskDocumentElement, taskColor);
            icon = '<i class="fa-solid fa-head-side-cough"></i>'
            break
        case "vacation-icon":
            activeTask(vacationIconTaskDocumentElement, taskColor);
            icon = '<i class="fa-solid fa-martini-glass-citrus"></i>'
            break

    }
}

//Set Colours for schedule
function setColors(e) {
    if(e.target.classList.contains("day") && active === true) {
        e.target.style.backgroundColor = selectedColor;
        e.target.innerHTML = icon; 
    }
}

//Select Task
function activeTask(daysOnCalendar,color) {
    daysOnCalendar.classList.toggle("selected");

    if(daysOnCalendar.classList.contains("selected")) {
        active = true;
        selectedColor = color;
        return selectedColor;
    } else {
        active = false;
    }
}

//Function to reset Task
function resetTasks(){
    const allTasksWithIcons = document.querySelectorAll(".task_name");
    allTasksWithIcons.forEach((item) => {
        item.className = "task_name";
    })
}

//Function to delete Tasks
function deleteTasks(){
    const daysOnCalendar = document.querySelectorAll(".day");
    
    daysOnCalendar.forEach((item) => {
        item.innerHTML = "";
        item.style.backgroundColor = "";
    }) 

    ClosePopup();
}

// Open pop-up
function openPopup(){
    popUpContainerToResetTasks.style.display = "flex";
}

// Close pop-up
function ClosePopup(){
    popUpContainerToResetTasks.style.display = "none";
}
resetTasks(); //Maybe?
