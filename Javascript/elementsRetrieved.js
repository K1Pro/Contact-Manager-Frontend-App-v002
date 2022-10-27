function elementsrequired() {
  // vvv Start coding here for Retrieval Module vvv

  CalendarHTML_Date = document.getElementById('CalendarDate');
  CalendarHTML_PrevBtn = document.getElementById('CalendarPrev');
  CalendarHTML_NextBtn = document.getElementById('CalendarNext');

  // ^^^ End coding here for Retrieval Module ^^^
}
// vvv All retrieved elements should be declared here vvv
let CalendarHTML_Date, CalendarHTML_PrevBtn, CalendarHTML_NextBtn;
// ^^^ All retrieved elements should be declared here ^^^

async function isElementLoaded(selector) {
  console.log(selector);
  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
}
isElementLoaded(
  '#CalendarHTMLModule' &&
    '#DailyTasksHTMLModule' &&
    '#SidePanelHTMLModule' &&
    '#ContactTasksHTMLModule' &&
    '#EmailHTMLModule'
).then(() => {
  console.log('loaded all modules {All DOM elements retrieved}');
  elementsrequired();
});
// import { ContactsURL } from './date.js';
