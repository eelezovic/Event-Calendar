//calendar
const headerMonthandYearDocumentElement = document.querySelector(".header-date");
const calendarDaysDocumentElement = document.querySelector(".days");
const goToNextMonthDocumentElement = document.querySelector('.next');
const goToPreviousMonthDocumentElement = document.querySelector('.prev');
const displayTodaysDateButton = document.querySelector(".today-btn");
const goToIputtedDateButton = document.querySelector(".goto-btn");
const dateInputPlaceholder = document.querySelector(".date-input");
const eventIsOn_DayOfTheWeek = document.querySelector(".event-day");
const eventIsOn_ThisDate = document.querySelector(".event-date");
const containerDisplayingEvents = document.querySelector(".events");
const submitButtonForTheNewlyCreatedEvent = document.querySelector(".add-event-btn");

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

/*Default Events Array
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
*/

//set an empty array
let eventsArr = [];

//Calling get events
getEvents();

// Function to add days
function initCalendar () {
    const firstDayOfMonth = new Date(currentYear, currentMonth,1);
    const lastDayOfMonth = new Date (currentYear, currentMonth + 1, 0);
    const lastDayOfPrevMonth = new Date(currentYear, currentMonth,0);
    const prevDays = lastDayOfPrevMonth.getDate();
    const lastDate = lastDayOfMonth.getDate();
    const day = firstDayOfMonth.getDay();
    const nextDays = 7 - lastDayOfMonth.getDay() - 1 ;

    headerMonthandYearDocumentElement.innerHTML = MONTHS[currentMonth] + " , " + currentYear;

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
    
/* 
    dayElements.forEach(function(day) {
       let newDiv = document.createElement("div");
        newDiv.classList.add("dayCalendar");
        newDiv.innerHTML = day.innerHTML;
        day.appendChild(newDiv);
    });
*/

     //if day is today add class today
    if (
        i === new Date().getDate() &&
        currentYear === new Date().getFullYear() &&
        currentMonth === new Date().getMonth()
    ) {
        activeDay = i;
        getActiveDay(activeDay);
        updateEvents(activeDay);


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

   let dayElements = document.querySelectorAll(".day");

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
goToPreviousMonthDocumentElement.addEventListener("click", prevMonth);
goToNextMonthDocumentElement.addEventListener("click", nextMonth);

//Adding Today's button functionality

displayTodaysDateButton.addEventListener("click", () => {
     currentDate = new Date();
     currentMonth = currentDate.getMonth();
     currentYear = currentDate.getFullYear();
     initCalendar();
});


dateInputPlaceholder.addEventListener("input", (e) => {
    //allow only numbers, remove anything else
    dateInputPlaceholder.value = dateInputPlaceholder.value.replace(/[^0-9/]/g, "");
    if (dateInputPlaceholder.value.length === 2) {
        //add a slash if two numbers enetered
        dateInputPlaceholder.value += "/";
    }

    //No more than 7 characters allowed
    if(dateInputPlaceholder.value.length > 7) {
        dateInputPlaceholder.value = dateInputPlaceholder.value.slice(0, 7)
    }
    //If backspace pressed 
    if (e.inputType === "deleteContentBackward") {
        if (dateInputPlaceholder.value.length === 3 ) {
            dateInputPlaceholder.value = dateInputPlaceholder.value.slice(0, 2);
        }
    }

});

//Function to go to entered date
goToIputtedDateButton.addEventListener("click", gotoDate);

function gotoDate() {
    const dateArr = dateInputPlaceholder.value.split("/");
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

            //call active day after click
            getActiveDay(e.target.innerHTML); 
            updateEvents(Number(e.target.innerHTML));


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
                //same with next month days
            } else if (e.target.classList.contains("next-date")) {
                nextMonth();

                setTimeout(() => {

                    //select all days of that month
                    const days = document.querySelectorAll(".day");

                    //After going to prev month add active to clicked
                    days.forEach((day) => {
                        if ( 
                            !day.classList.contains("next-date") &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else {
                //remain current month days
                e.target.classList.add("active");
            }
        });
    });
}

//Display active day events and date at top right corner
function getActiveDay(headerMonthandYearDocumentElement) {
    const day = new Date( currentYear, currentMonth, headerMonthandYearDocumentElement);
    const dayName = day.toString().split(" ")[0];
    eventIsOn_DayOfTheWeek.innerHTML = dayName;
    eventIsOn_ThisDate.innerHTML = headerMonthandYearDocumentElement + " " + MONTHS[currentMonth] + " " + currentYear;
}

//Function to show events od that day
function updateEvents(headerMonthandYearDocumentElement) {
    let events = "";
    eventsArr.forEach((event) => {
        //getting events of active day only
        if (
            headerMonthandYearDocumentElement === event.day &&
            currentMonth + 1 === event.currentMonth &&
            currentYear === event.currentYear
        ) {
            //The show event on document
            event.events.forEach((event) => {
                events += `<div class= "event">
                <div class="title">
                <i class="fa fa-square"></i>
                  <h3 class="event-title">${event.title}</h3>
                </div>
                <div class="event-time">
                  <span class="event-time">${event.time}</span>
                </div>
            </div>`;
                
            });
        }
    });

//if nothing found
    if (events === "") {
    events= `<div class ="no-event">
             <h5>There are no events today</h5>
             </div>`;
    }

    containerDisplayingEvents.innerHTML = events;
    //Save events when update event called
    saveEvents();
}

//Function to add events 
submitButtonForTheNewlyCreatedEvent.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    //some validations
    if( eventTitle === "" || eventTimeFrom === "" || eventTimeTo === ""  ) {
        alert( "Please fill all the fields")
        return;
    }

    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");


    if (
        timeFromArr.length !== 2 ||
        timeToArr.length !== 2 ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59 ||
        timeToArr[0] > 23 ||
        timeToArr[1] > 59 
        )
    {
        alert("Invalid Time Format");
    }

//Remove anything else but numbers
addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, '');
if (
  addEventFrom.value.length === 2 &&
  e.inputType !== 'deleteContentBackward'
) {
  addEventFrom.value += ':';
}




    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        title: eventTitle,
        time: timeFrom + " - " + timeTo,
    };

    let eventAdded = false;

    if (eventsArr.length > 0) {
        //Checking if current day has already any event, then add to that
        eventsArr.forEach((item) => {
            if (
                item.day === activeDay &&
                item.currentMonth === currentMonth + 1 &&
                item.currentYear === currentYear
            ) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        })
    }

    //If event array empty or current day has no event create new
    if (!eventAdded) {
        eventsArr.push( {
            day: activeDay,
            currentMonth: currentMonth +1,
            currentYear: currentYear,
            events: [newEvent],
        });
    }

    //Removing active from add event form
    addEventContainer.classList.remove("active")
    //Clearing the fields
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";

    //Showing current added event

    updateEvents(activeDay);


    const activeDayElement = document.querySelector(".day.active");
    if (!activeDayElement.classList.contains("event")) {
        activeDayElement.classList.add("event");
    }
});
    //checking if event

    //Function to convert time to PM/AM
   function convertTime(time) {
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + "" + timeFormat;
    return time;
   }

   //Creating a function to remove events on click

   containerDisplayingEvents.addEventListener("click", (e) => {
    if (e.target.classList.contains("event")) {
        const eventTitle = e.target.children[0].children[1].innerHTML;
        //Getting the title of event, than search in array by title and delete
        eventsArr.forEach((event) => {
            if (
                event.day === activeDay &&
                event.currentMonth === currentMonth + 1 &&
                event.currentYear === currentYear 
            ) {
                event.events.forEach((item, index) => {
                    if (item.title === eventTitle) {
                        event.events.splice(index, 1);
                    }
                });

                //Id no event remaining on that day, remove complete day
                if (event.events.length === 0) {
                    eventsArr.splice(eventsArr.indexOf(event), 1);
                }
            }
        });
        //After removing from Array, update event
        updateEvents(activeDay);
    }
   });

   // Store events in local storage 
   function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
   }

  function getEvents() {
    if (localStorage.getItem("events" === true)) {
        return;
    }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
  };
