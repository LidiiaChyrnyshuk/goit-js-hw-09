import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const formData = {};

formEl.addEventListener('input', handleFormInputs);
formEl.addEventListener('submit', handleFormSubmit);

function handleFormInputs(evt) {
  formData[evt.target.name] = Number(evt.target.value);
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  let {
    elements: { delay, step, amount },
  } = evt.currentTarget;
  if (delay.value < 0 || step.value < 0 || amount.value <=0) {
    Notiflix.Notify.info('Please fill with positive numbers!');
    return
  }

   delay = formData.delay;

  for (let position = 1; position <= formData.amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += formData.step;
  }
  
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
