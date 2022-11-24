function elementsrequired() {
  // vvv Start coding here for Retrieval Module vvv

  CalendarHTML_Date = document.getElementById('CalendarDate');
  CalendarHTML_PrevMonthBtn = document.getElementById('LastMonthButton');
  CalendarHTML_PrevWeekBtn = document.getElementById('LastWeekButton');
  CalendarHTML_NextWeekBtn = document.getElementById('NextWeekButton');
  CalendarHTML_NextMonthBtn = document.getElementById('NextMonthButton');
  contactSearch = document.getElementById('contactSearch');
  contactsList = document.getElementById('contactsList');

  // ^^^ End coding here for Retrieval Module ^^^
  DOMElements = 'Loaded';
}
// vvv All retrieved elements should be declared here vvv
let DOMElements,
  CalendarHTML_Date,
  CalendarHTML_PrevBtn,
  CalendarHTML_NextBtn,
  contactSearch,
  contactsList;
// ^^^ All retrieved elements should be declared here ^^^

// vvv This scans for all separate HTML Modules vvv
async function isElementLoaded(selector) {
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
  console.log('retrieved all modules {All DOM elements retrieved}');
  elementsrequired();
});
// import { ContactsURL } from './date.js';
