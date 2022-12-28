//calendar
const headerDateDocumentElement = document.querySelector(".header-date");
const calendarDaysDocumentElement = document.querySelector(".days");
const nextMonthDocumentElement = document.querySelector('.next');
const previousMonthDocumentElement = document.querySelector('.prev');
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");
const eventDay = document.querySelector(".event-day");
const eventDate = document.querySelector("event-date");
const eventsContainer = document.querySelector(".events");

let currentDate = new Date();
let activeDay;
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
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

//Default Events Array
const eventsArr = [
    {
        day: 26,
        currentMonth: 12,
        currentYear: 2022,
        events: [
            {
                title: " Today is the first day after xmas",
                time: "10:00 AM",
            },
            {
                title: "Event 2",
                time: "11:00 AM"
            },
        ],
    },
    {
        day: 31,
        currentMonth: 12,
        currentYear: 2022,
        events: [
            {
                title: " Today is the first day after xmas",
                time: "10:00 AM",
            },
        ],
    },
]

// Function to add days
function initCalendar () {
    const firstDayOfMonth = new Date(currentYear, currentMonth,1);
    const lastDayOfMonth = new Date (currentYear, currentMonth + 1, 0);
    const lastDayOfPrevMonth = new Date(currentYear, currentMonth,0);
    const prevDays = lastDayOfPrevMonth.getDate();
    const lastDate = lastDayOfMonth.getDate();
    const day = firstDayOfMonth.getDay();
    const nextDays = 7 - lastDayOfMonth.getDay() - 1 ;

 headerDateDocumentElement.innerHTML = MONTHS[currentMonth] + " " + currentYear;

//adding days on DOM
let days = "";

//Show previous month days

   for ( let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
   }

//Current month days
   for ( let i = 1; i <= lastDate; i++) {

     //check if event present on current day
     let event = false;
     eventsArr.forEach((eventObj) => {
        if (
            eventObj.day === i &&
            eventObj.currentMonth === currentMonth + 1 &&
            eventObj.currentYear === currentYear
        ) {
            //if event found
            event = true;
        }
     });

     //if day is today add class today
    if (
        i === new Date().getDate() &&
        currentYear === new Date().getFullYear() &&
        currentMonth === new Date().getMonth()
    ) {
        //if event found add event class
        if (event) {
        days += `<div class="day today event">${i}</div>`;
    } else {
        days += `<div class="day today">${i}</div>`;
     }
    } 
    //add remaining as it is
    else {
        if (event) {
            days += `<div class="day event">${i}</div>`;
        } else {
            days += `<div class="day">${i}</div>`;
         }
        } 
    }
   //Showing next mont days
   for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date" >${j}</div>`;

   }

   calendarDaysDocumentElement.innerHTML = days;

   //adding listener after calendar initialized
   addListener();
}
initCalendar();

    function nextMonth() {
    currentMonth ++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear ++;
    }
    initCalendar();
}

const prevMonth = () => {
    currentMonth --;
    if(currentMonth < 0){
        currentMonth = 11;
        currentYear --;
    }
    initCalendar();

}

//Add eventListener on Next and Prev button
previousMonthDocumentElement.addEventListener("click", prevMonth);
nextMonthDocumentElement.addEventListener("click", nextMonth);

//Adding Today's button functionality

todayBtn.addEventListener("click", () => {
     currentDate = new Date();
     currentMonth = currentDate.getMonth();
     currentYear = currentDate.getFullYear();
     initCalendar();
});

dateInput.addEventListener("input", (e) => {
    //allow only numbers, remove anything else
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        //add a slash if two numbers enetered
        dateInput.value += "/";
    }
    //No more than 7 characters allowed
    if(dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7)
    }
    //If backspace pressed 
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3 ) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

//Function to go to entered date
gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
    const dateArr = dateInput.value.split("/");
    console.log(dateArr)
    if(dateArr.length === 2) {
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            currentMonth = dateArr[0] - 1;
            currentYear = dateArr[1];
            initCalendar();
            return;
        }
    }
    //if Invalid date entered
    alert('invalid date');
}


const addEventBtn = document.querySelector(".add-event"),
  addEventContainer = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close"),
  addEventTitle = document.querySelector(".event-name"),
  addEventFrom = document.querySelector(".event-time-from"),
  addEventTo = document.querySelector(".event-time-to");

addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
});
document.addEventListener("click", (e) => {
    //if clicked outside 
    if (e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove("active");
    }
});

//Allow only 50 characters in title
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});

//Time format in from and to time
addEventFrom.addEventListener("input", (e) => {
    //Remove anything else but numbers
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if (addEventFrom.value.length === 2){
        addEventFrom.value += ":";
    }
    //No more than 5 characters can be entered
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice (0, 5);
    }
});
 
//Setting up  To time
addEventTo.addEventListener("input", (e) => {
    //Remove anything else but numbers
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if (addEventTo.value.length === 2){
        addEventTo.value += ":";
    }
    //No more than 5 characters can be entered
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice (0, 5);
    }
});
//Creating function to add listener on days after rendered
function addListener() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            //setting current day as active day
            activeDay = Number(e.target.innerHTML);

            //remove active from already active day
            days.forEach((day) => {
                day.classList.remove("active");
            });

            //if prev month day clicked go to prev month and add active
            if (e.target.classList.contains("prev-date")) {
                prevMonth();

                setTimeout(() => {

                    //select all days of that month
                    const days = document.querySelectorAll(".day");

                    //After going to prev month add active to clicked
                    days.forEach((day) => {
                        if ( 
                            !day.classList.contains("prev-date") &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            }
        });
    });
}







function getActiveDay(headerDateDocumentElement) {
    const day = new Date( currentYear, currentMonth, headerDateDocumentElement);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = headerDateDocumentElement + " " + MONTHS[currentMonth] + " " + currentYear

}

//Events
document.addEventListener("click", function(e) {
    if(!e.target.classList.contains("active") && e.target.classList.contains("day")){
        if(document.getElementsByClassName("active")[0] === undefined){
            e.target.classList.add("active");
        }
        document.getElementsByClassName("active")[0].classList.remove("active");
        if(document.getElementsByClassName("active")[0] === undefined){
            e.target.classList.add("active");
        }
        e.target.classList.add("active");
    } else if(e.target.classList.contains("active") === null && e.target.classList.contains("day")){
        e.target.classList.add("active");
    }
});

//if nothing found
if (events === "") {
    events= `<div class = "no-event">
             <h3>No Events</h3>
             </div>`;
}
console.log(eventsContainer);
eventsContainer.innerHTML = events;

























