//calendar
const headerMonthDocumentElement = document.getElementById("header-month");
const headerYearDocumentElement = document.getElementById("header-year");
const calendarDaysDocumentElement = document.getElementById("calendar-days");
const nextMonthDocumentElement = document.getElementById('next-month');
const previousMonthDocumentElement = document.getElementById('prev-month');
const selectYearDocumentElement = document.getElementById('year');
const selectMonthDocumentElement = document.getElementById('month');
const todayBtn = document.querySelector(".today-btn");

let currentDate = new Date();
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

   //JSON event data
   let eventData = {
    "events": [
        {
            "descritpion": "es",
            "year": "2022",
            "month": "December",
            "day": "11"
        
        }
    ]
   };

// Select any month and year on the calendar
   selectYearDocumentElement.value = currentYear;
   selectMonthDocumentElement.value = currentMonth;

   selectYearDocumentElement.addEventListener("input", (event) => {
    if(event.keyCode == 13) {
        event.preventDefault();
        return false;
    } else {
        skipToSelectedMonthAndYear();
    }
   })
   selectMonthDocumentElement.addEventListener("change", skipToSelectedMonthAndYear);

// Function to add days
const createCalendar = () => {
    headerMonthDocumentElement.innerHTML = `${MONTHS[currentMonth]}, ${currentYear}`
    const firstDayOfMonth = new Date(currentYear, currentMonth,1).getDay();
    const lastDayOfMonth = new Date (currentYear, currentMonth +1, 0);
    const numberOfDaysinMonth =  32 - new Date(currentYear, currentMonth, 32).getDate();
    const lastDayOfPrevMonth = new Date(currentYear, currentMonth,0).getDate();
    console.log(lastDayOfPrevMonth)


    //Cleaning all previous cells
    calendarDaysDocumentElement.innerHTML = "";

//Getting Last Month Info and Next Month Info

/*const daysinLastMonth = () => {
    const lastMonth = currentMonth - 1;
    let yearOfLastMonth = currentYear;
    if (lastMonth === 0) {
        lastMonth = 12;
        yearOfLastMonth -= 1; 
    }
    const dayCountOfLastMonth = monthDays;
    console.log(dayCountOfLastMonth)
    (yearOfLastMonth, lastMonth);
    console.log(dayCountOfLastMonth);
    return { 
        lastMonth,
        yearOfLastMonth,
        dayCountOfLastMonth
    }
} 
\
const daysInNextMonth = () => {
    let nextMonth = currentMonth +1;
    let yearOfNextMonth = currentYear;
    if (nextMonth ===13) { 
        nextMonth  = 1;
        yearOfNextMonth += 1;
    }
    let dayCountInNextMonth = monthDays;
    (yearOfNextMonth,nextMonth);
    return {
        nextMonth,
        yearOfNextMonth,
        dayCountInNextMonth

    }
}
*/
//creating all cells
let date = 1;


    for (let i = 0; i < 6;  i++) {
        //creates a table row
        let row = document.createElement("tr");

        //creating individual collumns, filling them up with data.
        for (let j = 0; j < 7; j++ ){
            let column = document.createElement("td"); 
            if(date > numberOfDaysinMonth) break;
            else if (i === 0 && j < firstDayOfMonth) {
                let columnText = document.createTextNode("");
                column.appendChild(columnText)
                row.appendChild(column)
            }
            else {
                let columnText = document.createTextNode(date);
                column.appendChild(columnText);
                if( date ===currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()){
                    column.classList.add("active"); // colour today's date
                }
            else { lastDayOfPrevMonth }
            column.classList.add('day');
            column.appendChild(columnText);
            row.appendChild(column);
            date++;
            }
        }
        calendarDaysDocumentElement.appendChild(row); //appending each row into calendar body.
}
};

createCalendar();


    const nextMonth = () => {
        currentMonth = currentMonth + 1;
        calendarDaysDocumentElement.innerHTML = ""; 
        if(currentMonth > 11){
            currentYear = currentYear + 1;
            currentMonth = 0;
    };

createCalendar();
return currentMonth;
};

const prevMonth = () => {
    currentMonth = currentMonth - 1;
    calendarDaysDocumentElement.innerHTML = "";
    if(currentMonth < 0){
        currentYear = currentYear - 1;
        currentMonth = 11;
    };
createCalendar();
return currentMonth;
};

function skipToSelectedMonthAndYear() {
    currentYear = parseInt(selectYearDocumentElement.value);
    currentMonth = parseInt(selectMonthDocumentElement.value);
    createCalendar(currentMonth, currentYear);

};

//Adding Today's button functionality

todayBtn.addEventListener("click", () => {
     currentDate = new Date();
     currentMonth = currentDate.getMonth();
     currentYear = currentDate.getFullYear();
     selectYearDocumentElement.value = currentYear;
     selectMonthDocumentElement.value = currentMonth;
     createCalendar();
});


























/*
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




// Handles New Event Form //
let newEvent = {
     // day: parseInt(event.innerHTML),
     desc: document. querySelector( "#new-event-desc"),
     month: headerMonthDocumentElement,
     year: headerYearDocumentElement ,
     active: document.getElementsByClassName("active"),
     sumbit: () => {
        if( newEvent.desc.value.length ===0){
            newEvent.desc.classList.add("error");
            newEvent.desc.getElementsByClassName.border="4px solid red";
        } else {
            newEventJson(newEvent.desc.value, newEvent.month.innerHTML, newEvent.year.innerHTML, newEvent.active[0].innerHTML);
            hideShowEventsDiv();
            showEventText(newEvent.desc.value);
            newEvent.desc.classList.remove("error");
            newEvent.desc.style.border="none";
            newEvent.clear();
        }
     },
     clear: () => {
        newEvent.desc.value="";
     }
};

const hideShowEventsDiv = () => {
    let eventsDiv = document.querySelector(".events");
    let newEventForm = document.querySelector(".new-event-form");
    let saveEventButton = document.querySelector(".sumbit-event");
    let showEventForm = document.querySelector(".show-event-form");

    if(eventsDiv.classList.contains('hidden')){
        //Show Events
        newEventForm.classList.add("hidden");
        newEventForm.classList.remove("visible");
        eventsDiv.classList.remove("hidden");
        eventsDiv.classList.add("visible");
        showEvents();
        // Change rotate class for Event listener
        
        showEventForm.classList.add("rotate");
    } else {
        //Show new Event form
        eventsDiv.classList.remove("visible");
        eventsDiv.classList.add("hidden");
        newEventForm.classList.remove("hidden");
        newEventForm.classList.add("visible");
        showEventForm.classList.remove("rotate");
        
    }
}

//Submit form and show event or new event form
document.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("rotate") && e.target.classList.contains("submit-event")){
        newEvent.sumbit()
    } else if (e.target.classList.contains("rotate")) {
        hideShowEventsDiv();
    }
});

//Colour the events on the calendar
function showEvents () {
    let days = document.getElementsByClassName("day");
    let events = [];
    [...eventData ["events"]].forEach ((event) => {
        [...days].forEach((day) => {
            if (event["day"] === day.innerHTML && event ["month"] ==headerMonthDocumentElement.innerHTML && event ["year"] === headerYearDocumentElement.innerHTML) {
                day.classList.add("active-event");
                events.push(event)
            }
        });
    });
    return events;
}

//Clear previous event text
function cleareventText () {
    if (document.getElementsByClassName("event-desc")) {
        [...document.getElementsByClassName("event-desc")].forEach((event) => {
            event.outerHTML = "";
        });
    }
}

//show eventText
function showEventText(desc) {
    let noEvents = document.getElementsByClassName("no-Events")[0];
    let eventsDescContainer = document.querySelector(".events");
    
        //Span elent to put Event text into
        const span = document.createElement("span");
        let eventText = document.createTextNode(desc); //Should it be Camel cased?

        //delete button for span
        const remove = document.createElement("div");
        let x = document.createTextNode("x");
        remove.appendChild(x);
        remove.classList.add("remove");

        //Clear previous events message
        noEvents.classList.remove("show");
        noEvents.style.display = "none";

        //Append to container
        span.appendChild(eventText)
        span.appendChild(remove);
        span.classList.add("event-desc", "event-message");
        eventsDescContainer.appendChild(span);
}

//Compares eventData array values to data of day clicked on
const checkEvents = (obj, date) => {
    let isInArray = eventData["events"].find(event => event[obj] === date)
    return isInArray;
}

// Handler to show text from eventData array
document.addEventListener('click', (e)=> {
    let noEvents = document.getElementsByClassName('no-Events')[0];

    if(e.target.classList.contains('day')){
        //Clear previous event Text
        cleareventText();

        if(eventData.events.length===0){
            noEvents.style.display='initial';
            noEvents.innerHTML = `There are no events on ${headerMonthDocumentElement.innerHTML} ${e.target.innerHTML} ${headerYearDocumentElement.innerHTML}`;
        } else {
            [...eventData['events']].forEach((event)=>{
                if(event['day']===e.target.innerHTML && event['month']===headerMonthDocumentElement.innerHTML && event['year']===headerYearDocumentElement.innerHTML){
    
                    //show event Text
                    showEventText(event['description']);
    
                }  else if(!checkEvents('year',headerYearDocumentElement.innerHTML) || !checkEvents('month', headerMonthDocumentElement.innerHTML) || !checkEvents('day', e.target.innerHTML))  {
                    cleareventText();
                    noEvents.style.display='initial';
                    noEvents.innerHTML = `There are no events on ${headerMonthDocumentElement.innerHTML}, ${e.target.innerHTML}  ${headerYearDocumentElement.innerHTML}`;
                }
            });
        }
    }
});

//Click on X to remove event
document.addEventListener('click', (x)=>{
    //day clicked on
    let day = document.getElementsByClassName('active')[0];
    let noEvents = document.getElementsByClassName('no-Events')[0];

    if(x.target.classList.contains('remove')){
        let eventText = x.target.parentNode.textContent.slice(0,-1);

for(const i = eventData.events.length-1; i >= 0; --i) {
            if(eventData.events[i]['day']===day.innerHTML && eventData.events[i]['month']===headerMonthDocumentElement.innerHTML && eventData.events[i]['year']===headerYearDocumentElement.innerHTML && eventData.events[i]['description']===eventText){
                eventData.events.splice(i,1);
                //remove event clicked on from view
                x.target.parentNode.classList.add('swingHide');
                setInterval(()=>{
                    x.target.parentNode.outerHTML='';
                },500);
                //if no events on day selected show message
                if(!checkEvents('year',headerYearDocumentElement.innerHTML) || !checkEvents('month',headerMonthDocumentElement.innerHTML) || !checkEvents('day', day.innerHTML)){
                    setTimeout(()=>{
                        noEvents.style.display='initial';
                    },600)
                    noEvents.innerHTML = `There are no events on ${headerMonthDocumentElement.innerHTML} ${day.innerHTML} ${headerYearDocumentElement.innerHTML}`;
                    day.classList.remove('active-event');
                }
                //if events on day selected show them
                if(checkEvents('year',headerYearDocumentElement.innerHTML) && checkEvents('month', headerMonthDocumentElement.innerHTML) & checkEvents('day', day.innerHTML)){
                    showEventText(eventData.events[i].description);
                }
            }
        }
    }
});

//Adds Json to eventData
function newEventJson(description, month, year,day) {
    let event = {
        "description": description,
        "year": year,
        "month": month,
        "day": day
    };
    eventData.events.push(event);
};
*/