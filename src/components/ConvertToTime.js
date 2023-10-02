import React from "react";


let changeformat = (str) => {
  str = str.replaceAll(/\s/g, '').replace(/(hours|hour)/g, ':').replace(/(minutes|minute)/g, ':').replace(/(seconds|second)/g, ':')
}

let convertToTime = (number) => {
  let hours = "";
  let mins = "";
  let sec = "";

  let interHours = Math.floor(number / 3600);

  if (interHours > 1) {
    hours += interHours + " hours ";
  }

  if (interHours == 1) {
    hours += interHours + " hour ";
  }

  let interMin = Math.floor((number % 3600) / 60);

  if (interMin > 1) {
    mins += interMin + " minutes ";
  }

  if (interMin == 1) {
    mins += interMin + " minute ";
  }

  let interSec = Math.floor((number % 3600) % 60);

  if (interSec > 1) {
    sec += interSec + " seconds";
  }

  if (interSec == 1) {
    sec += interSec + " second";
  }

  return hours + mins + sec;
};


function anotherFormat(number) {
  let arr;
let hours;
let mins;
let sec;
  let interHours = Math.floor(number / 3600);

if (interHours >= 1) {
  hours = interHours + 'h';
}

  let interMin = Math.floor((number % 3600) / 60);

  if (interMin >= 1) {
  mins = interMin + 'm';
}

  let interSec = Math.floor((number % 3600) % 60);

  if (interSec >= 1) {
  sec = interSec + 's';
}

arr = createArr(hours,mins,sec)
return arr;

}


function createArr(...arg) {

 let arr = [];
  
 for (let el of arg) {
      if (el) arr.push(el)
  }
  return arr.join(':');
}

export {anotherFormat};

export default convertToTime;