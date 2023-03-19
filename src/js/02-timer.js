import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtnEl = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
startBtnEl.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const startTime = Date.now();
    const calendarTime = new Date(selectedDates[0]);
    if (calendarTime < startTime) {
      Notiflix.Notify.warning('Please choose a date in the future');
    }
    startBtnEl.removeAttribute('disabled');
    
    console.log(selectedDates[0]);
  },
};

flatpickr(inputEl, options);


class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }
  start() {
    if (this.isActive) {
      return;
    }
    const selectedTime = new Date(inputEl.value).getTime();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      // console.log(deltaTime);

      if (deltaTime < 0) {
        // console.log(deltaTime);
        clearInterval(this.intervalId);
        // return;
      } else {
        const time = this.convertMs(deltaTime);

        this.onTick(time);
      }

      // console.log(time);
    }, 1000);
  };

  
 convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = this.addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

addLeadingZero(value) {
  return String(value).padStart(2, '0');
};
  
};

const timer = new Timer({
  onTick: updateClockface,
});

startBtnEl.addEventListener('click', timer.start.bind(timer));

function updateClockface({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
};