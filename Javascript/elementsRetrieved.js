function elementsrequired() {
  // vvv Start coding here for Retrieval Module vvv

  CalendarHTML_Date = document.getElementById('CalendarDate');
  CalendarHTML_PrevBtn = document.getElementById('CalendarPrev');
  CalendarHTML_NextBtn = document.getElementById('CalendarNext');
  calendarElements = document.getElementsByTagName('*');

  // ^^^ End coding here for Retrieval Module ^^^
}
// vvv All retrieved elements should be declared here vvv
let CalendarHTML_Date,
  CalendarHTML_PrevBtn,
  CalendarHTML_NextBtn,
  calendarElements;
// ^^^ All retrieved elements should be declared here ^^^

const isElementLoaded = async (selector) => {
  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};
isElementLoaded('#CalendarDate').then(() => {
  console.log('loaded module {All DOM elements retrieved}');
  elementsrequired();
});
// import { ContactsURL } from './date.js';
