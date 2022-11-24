//calendar
const currentDate = new Date();
let thisMonth = currentDate.getMonth();
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
            "month": "November",
            "day": "11"
        
        }
    ]
   };

   const currentMonth = document.getElementById("current-month");
   const thisYear = document.getElementById("current-year");
   const calendarDays = document.getElementById("calendar-days");
   let next = document.getElementById('next');
   let prev = document.getElementById('prev');
   let selectYear = document.getElementById('year');
   let selectMonth = document.getElementById('month');

   selectYear.value = currentYear;
   selectMonth.value = thisMonth;

   selectYear.addEventListener("input", (event) => {
    if(event.keyCode == 13) {
        event.preventDefault();
        return false;
    } else {
        jump();
    }
   })
   selectMonth.addEventListener("change", jump);




const createCalendar = () => {
    currentMonth.innerHTML = `${MONTHS[thisMonth]}, ${currentYear}`
    const firstDayOfMonth = new Date(currentYear, thisMonth,1).getDay();
    const monthDays =  32 - new Date(currentYear, thisMonth, 32).getDate();
    console.log(monthDays)
    const lastDayOfPrevMonth = new Date(currentYear, thisMonth,0).getDate();

    //Cleaning all previous cells
    calendarDays.innerHTML = "";

//Getting Last Month Info and Next Month Info

/*const daysinLastMonth = () => {
    const lastMonth = thisMonth - 1;
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

const daysInNextMonth = () => {
    let nextMonth = thisMonth +1;
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
            if(date > monthDays) break;
            else if (i === 0 && j < firstDayOfMonth) {
                let columnText = document.createTextNode("");
                column.appendChild(columnText)
                row.appendChild(column)
            }
            else {
                let columnText = document.createTextNode(date);
                column.appendChild(columnText);
                if( date ===currentDate.getDate() && thisMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()){
                    column.classList.add("active"); // colour today's date
                }
            column.classList.add('day');
            column.appendChild(columnText);
            row.appendChild(column);
            date++;
            }
        }
        calendarDays.appendChild(row); //appending each row into calendar body.
    }
};
createCalendar();


    const nextMonth = () => {
        thisMonth = thisMonth + 1;
        calendarDays.innerHTML = ""; 
        if(thisMonth > 11){
            currentYear = currentYear + 1;
            thisMonth = 0;
    };

createCalendar();
return thisMonth;
};

const prevMonth = () => {
    thisMonth = thisMonth - 1;
    calendarDays.innerHTML = ""; 
    if(thisMonth < 0){
        currentYear = currentYear - 1;
        thisMonth = 11;
    };
createCalendar();
return thisMonth;
};

function jump() {
    currentYear = parseInt(selectYear.value);
    thisMonth = parseInt(selectMonth.value);
    createCalendar(thisMonth, currentYear);
    showEvents();
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

// Handles New Event Form //
let newEvent = {
     // day: parseInt(event.innerHTML),
     desc: document. querySelector( "#new-event-desc"),
     month: currentMonth,
     year: thisYear,
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
    let eventsDiv = document.querySelector (".events");
    let newEventForm = document.querySelector(".new-event-form");
    let saveEventButton = document.querySelector(".sumbit-event");
    let showEventForm = document.querySelector(".show-event-form");

    if(eventsDiv.classList.contains('hidden')){
        //Show Events
        newEventForm.classList.add("hidden");
        newEventForm.classList.remove("visible");
        eventsDiv.classList.remove("hidden");
        eventsDiv.classList.add("visible");
        createCalendar();
        // Change rotate class for Event listener
        saveEventButton.classList.remove("rotate");
        showEventForm.classList.add("rotate");
    } else {
        //Show new Event form
        eventsDiv.classList.remove("visible");
        eventsDiv.classList.add("hidden");
        newEventForm.classList.remove("hidden");
        newEventForm.classList.add("visible");
        showEventForm.classList.remove("rotate");
        saveEventButton.classList.add("rotate");
    }
}

//Submit form and show event or new event form
document.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("rotate") && e.target.classList.contains("submit-event")){
        newEvent.sumbit();
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
            if (event["day"] === day.innerHTML && event ["month"] === currentMonth.innerHTML && event ["year"] === thisYear.innerHTML) {
                day.classList.add("active-event");
                events.push(event)
            }
        });
    });
    return events;
}

//Clear previous event text
function clearEventText () {
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
        let EventText = document.createTextNode(desc); //Should it be Camel cased?

        //delete button for span
        const remove = document.createElement("div");
        let x = document.createTextNode("x");
        remove.appendChild(x);
        remove.classList.add("remove");

        //Clear previous events message
        noEvents.classList.remove("show");
        noEvents.style.display = "none";

        //Append to container
        span.appendChild(EventText)
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
        clearEventText();

        if(eventData.events.length===0){
            noEvents.style.display='initial';
            noEvents.innerHTML = `There are no events on ${currentMonth.innerHTML} ${e.target.innerHTML} ${thisYear.innerHTML}`;
        } else {
            [...eventData['events']].forEach((event)=>{
                if(event['day']===e.target.innerHTML && event['month']===currentMonth.innerHTML && event['year']===thisYear.innerHTML){
    
                    //show event Text
                    showEventText(event['description']);
    
                }  else if(!checkEvents('year',thisYear.innerHTML) || !checkEvents('month', currentMonth.innerHTML) || !checkEvents('day', e.target.innerHTML))  {
                    clearEventText();
                    noEvents.style.display='initial';
                    noEvents.innerHTML = `There are no events on ${currentMonth.innerHTML} ${e.target.innerHTML} ${thisYear.innerHTML}`;
                }
            });
        }
    }
});

//Click on X to remove event
document.addEventListener("click",(x) =>{
    //Day clicked on
    let day = document.getElementsByClassName("active")[0];
    let noEvents = document.getElementsByClassName("no-Events")[0];

    if(x.target.classList.contains("remove")){
        let eventText = x.target.parentNode.textContent.slice(0,-1);

        for(var i = eventData.events.length-1; i >=0; --i) {
            if(eventData.events[i] ["day"] === day.innerHTML && eventData.events[i]["month"] === currentMonth.innerHTML && eventData.events[i] ["year"] ===thisYear.innerHTML && eventData.events[i]["descritpion"] === eventText) {
                eventData.events.splice(i,1);
                //Remove event clicked on from view
                x.target.parentNode.classList.add("swingHide");
                setInterval(() => {
                    x.target.parentNode.outerHTML = '';
                }, 500);
                //If no events on day selected show message
                if(!checkEvents( "year", thisYear.innerHTML) || !checkEvents("month", currentMonth.innerHTML) || !checkEvents ("day", day.innerHTML)) {
                    setTimeout(() => {
                        noEvents.style.display = "initial";
                    }, 600)
                    noEvents.innerHTML = `There are no events on ${currentMonth.innerHTML} ${day.innerHTML} ${thisYear.innerHTML}`;
                    day.classList.remove("active-event");
                }
                //If events on day selected show them
                if( checkEvents("year", thisYear.innerHTML) && checkEvents ("month", currentMonth.innerHTML) & checkEvents ("day", day.innerHTML)) {
                    showEventText( eventData.events[i].descritpion);
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

console.log(currentDate);