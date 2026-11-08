import { PREP_TIME } from './js/menu.js';

// Тут пиши JavaScript свого домашнього завдання.
// Додаткові модулі створюй поруч у src/ і імпортуй їх сюди:
//   import { something } from './something.js';
const form = document.querySelector('.form');
const list = document.querySelector('.order-log');

const makeOrder = (delay, shouldResolve = true) => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

const addOrderRow = (drinkName) => {
  const li = document.createElement("li");

  li.classList.add("row-pending");
  li.textContent = `⏳ ${drinkName} · у роботі…`;

  list.appendChild(li);

  return li;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const drink = formData.get("drink");
  const state = formData.get("state");

  const delay = PREP_TIME[drink];
  const shouldResolve = state === "fulfilled";

  const row = addOrderRow(drink);

  makeOrder(delay, shouldResolve)
    .then((delay) => {
      row.classList.remove("row-pending");
      row.classList.add("row-ok");
      row.textContent = `✅ ${drink} · готове · ${delay} ms`;
    })
    .catch((delay) => {
      row.classList.remove("row-pending");
      row.classList.add("row-err");
      row.textContent = `❌ ${drink} · скасовано · ${delay} ms`;
    })
    .finally(() => {
      row.textContent += ` · ${new Date().toLocaleTimeString("uk-UA")}`;
    });
});
