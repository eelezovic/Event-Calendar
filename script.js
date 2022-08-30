// Creating drag and drop options for the icons
const draggableElements = document.querySelectorAll(".icons");
const droppableElements = document.querySelector(".days")

draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart)
});

droppableElements.forEach(elem => {
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("drop", drop);
});


function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
}



// Current date 
const date = new Date();
//current day and month
const month = date.getMonth();
const months  = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
   ];

document.querySelector(".date h1").innerHTML
= months [date.getMonth()];

document.querySelector(".date p").innerHTML
= date.toDateString();

