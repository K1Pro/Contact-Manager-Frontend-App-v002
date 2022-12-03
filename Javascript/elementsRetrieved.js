function elementsrequired() {
  // vvv Start coding here for Retrieval Module vvv

  CalendarHTML_Date = document.getElementById('CalendarDate');
  CalendarHTML_PrevMonthBtn = document.getElementById('LastMonthButton');
  CalendarHTML_PrevWeekBtn = document.getElementById('LastWeekButton');
  CalendarHTML_NextWeekBtn = document.getElementById('NextWeekButton');
  CalendarHTML_NextMonthBtn = document.getElementById('NextMonthButton');
  contactSearch = document.getElementById('contactSearch');
  contactsList = document.getElementById('contactsList');
  // Retrieves contact inputs from side panel
  ContactFields = document
    .getElementById('ContactFields')
    .querySelectorAll('*');
  for (let rep = 0; rep < ContactFields.length; rep++) {
    let ContactFieldsIDs = ContactFields[rep].id;
    if (ContactFieldsIDs) {
      // console.log(ContactFieldsIDs);
      document
        .getElementById(`${ContactFieldsIDs}`)
        .addEventListener('change', function (e) {
          let ContactFieldID = this.id;
          let ContactFieldValue = this.value;
          console.log(this.id);
        });
    }
  }
  // ^^^ End coding here for Retrieval Module ^^^
  DOMElements = 'Loaded';
}
// vvv All retrieved elements should be declared here vvv
let DOMElements,
  CalendarHTML_Date,
  CalendarHTML_PrevMonthBtn,
  CalendarHTML_PrevWeekBtn,
  CalendarHTML_NextWeekBtn,
  CalendarHTML_NextMonthBtn,
  contactSearch,
  contactsList,
  ContactFields;
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
