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

