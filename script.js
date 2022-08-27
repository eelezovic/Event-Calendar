 const date = new Date();

 const calander = document.querySelector(".days");

 const month = date.getMonth();
 console.log(month);
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
=date.toDateString();






// document.querySelector("").innerHTML
// =month.toDateString();
const nextButton =document.querySelector(".next");

//nextButton.addEventListener('click', () => {
 //   alert(".nextBotton")});