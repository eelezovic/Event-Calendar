// Drag and Drop
// Creating drag and drop options for the icons (fill= calendar icons, empties= days)
const fill = document.querySelectorAll(".icons");
const empties = document.querySelectorAll(".days");

// Callendar Icons "Fill"
fill.addEventListener("dragstart", dragStart);
fill.addEventListener("dragend", dragEnd);

//Loop throught "emoty" days and call drag events
for(const days of empties) {
    days.addEventListener("dragenter", dragEnter);
    days.addEventListener("dragenter", dragEnter);
    days.addEventListener("dragleave", dragLeave);
    days.addEventListener("drop", dragDrop);
}
// Drag Functions
function dragStart(events) {
    this.className += "hold";
    setTimeout(() => (this.className = "hide"), 0);
}
function dragEnd(events) {
    this.className = "fill";

}
function dragEnter(events) {
    events.preventDefault();
}
function dragOver(events) {
    events.preventDefault();
    this.className += "hovered"
}
function dragLeave(events) {
    this.className = "days";
}
function dragDrop(events) {
    this.className = "days";
    this.append(fill);
}



// Setting current date 
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

