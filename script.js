'use strict'

const refs = {
hoursBlock: document.querySelector('[data-value="hours"]'),
minsBlock: document.querySelector('[data-value="mins"]'),
secsBlock: document.querySelector('[data-value="secs"]'),
startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]'),
  resetBtn: document.querySelector('button[data-action-reset]'),
  waitBtn: document.querySelector('button[data-action-wait]'),
  clockface: document.querySelector('.js-clockface')
}

let currentTime;
  let savedTime;
  let time;
  
  

  
const timer = {
  intervalId: null,
  isActive: false,
start() {
if(this.isActive){
  return;
}

this.isActive = true;

const targetDate = Date.now();

function ShowTime (){
  currentTime = Date.now();
time = currentTime - targetDate; 

updateClockface(time);
}


//updateClockface(0);
ShowTime();
this.intervalId = setInterval(() => {
    ShowTime();
}, 1000);

},

stop(){
  clearInterval(this.intervalId);
  this.intervalId = null;
  this.isActive = false;
  savedTime = Date.now();
  console.log(savedTime);
  //updateClockface(0);
  
},
reset(){
  this.stop();
  updateClockface(0);
  this.start();
},
wait(){
  
  
  if(this.isActive === true){
  this.stop();
  
  console.log(this.isActive);
  }  else{
   function NewStart(){
     const clockTime = Date.now();
      console.log(currentTime);
      console.log(clockTime);
      console.log(savedTime);
      time = currentTime - (clockTime - savedTime);
      console.log(time);
      updateClockface(time);
    }
NewStart();
this.intervalId = setInterval(() => {
  NewStart();
}, 1000);
this.isActive = true;
console.log(this.isActive);
    
  }

}
}





function updateClockface(time) {    
const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

//refs.hoursBlock.textContent = `${hours}`;
//refs.minsBlock.textContent = `${mins}`;
//refs.secsBlock.textContent = `${secs}`;
refs.clockface.textContent = `${hours}:${mins}:${secs}`;
//подставить правильно
}


function pad(value){
    return String(value).padStart(2, '0');
}


  refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.stopBtn.addEventListener('click', timer.stop.bind(timer));
refs.resetBtn.addEventListener('click', timer.reset.bind(timer));
refs.waitBtn.addEventListener('click', timer.wait.bind(timer));