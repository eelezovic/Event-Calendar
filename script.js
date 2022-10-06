" use strict"

const item = document.querySelector('.item');

item.addEventListener('dragstart', dragStart);

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}
//drop targets 
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    // adding it to the drop target
    e.target.appendChild(draggable);

    // displays the draggable element
    draggable.classList.remove('hide');
} 


// Setting current date 
const month = document.getElementById("month");
const calendar = document.getElementById("calendar");

const DATE = new Date();

let thisMonth = DATE.getMonth();
let year = DATE.getFullYear();
const MONTHS  = [
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

   const createCalendar = () => {
    month.innerHTML = `${MONTHS[thisMonth]}, ${year}`
    const dayOne = new Date(year, thisMonth).getDay();
    console.log(dayOne)
    const monthDays = 32 - new Date(year, thisMonth,32).getDate()
date = 1;
    for (let i = 0; i < 6;  i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++ ){
            let column = document.createElement("td"); 
            if(date > monthDays) break;
            else if (i = 0 && j < dayOne) {
                let columnText = document.createTextNode("");
                column.appendChild(columnText)
                row.appendChild(column)
            }
            else {
                let columnText = document.createTextNode(date);
                column.appendChild(columnText)
                row.appendChild(column)

                date++
            }
        }
        calendar.appendChild(row)
    }
};
createCalendar();

    const nextMonth = () => {
        thisMonth = thisMonth + 1;
        calendar.innerHTML = ""; 
        if(thisMonth > 11){
            year = year + 1;
            thisMonth = 0;
    };

createCalendar();
return thisMonth;
};

const prevMonth = () => {
    thisMonth = thisMonth - 1;
    calendar.innerHTML = ""; 
    if(thisMonth < 0){
        year = year - 1;
        thisMonth = 11;
    };
createCalendar();
return thisMonth;
};


