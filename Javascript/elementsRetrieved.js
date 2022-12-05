function elementsrequired() {
  // vvv Start coding here for Retrieval Module vvv

  CalendarHTML_Date = document.getElementById('CalendarDate');
  CalendarHTML_PrevMonthBtn = document.getElementById('LastMonthButton');
  CalendarHTML_PrevWeekBtn = document.getElementById('LastWeekButton');
  CalendarHTML_NextWeekBtn = document.getElementById('NextWeekButton');
  CalendarHTML_NextMonthBtn = document.getElementById('NextMonthButton');
  createEvent = document.getElementById('createEvent');
  createEventTime = document.getElementById('createEventTime');
  contactTasksTextArea = document.getElementById('contactTasksTextArea');
  contactSearch = document.getElementById('contactSearch');
  contactsList = document.getElementById('contactsList');
  // Retrieves contact inputs from side panel
  ContactFields = document
    .getElementById('ContactFields')
    .querySelectorAll('*');
  CalendarDates = document
    .getElementById('calendarDates')
    .querySelectorAll('*');

  for (let rep = 0; rep < ContactFields.length; rep++) {
    // Side Panel inputs if changed will update database to these values
    let ContactFieldsIDs = ContactFields[rep].id;
    if (ContactFieldsIDs) {
      document
        .getElementById(`${ContactFieldsIDs}`)
        .addEventListener('change', function (e) {
          if (_id.value) {
            fetch(`${ContactsPatchURL}/${_id.value}`, {
              method: 'PATCH',
              body: JSON.stringify({
                // This creates a key-value pair to be patached, ex: "FirstName": Bart
                [this.id]: this.value,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            // .then((response) => response.text())
            // .then(() => {
            //   getJSON(ContactsURL).then((data) => {
            //     console.log(data);
            //   });
            // });
          } else {
            alert('Please search for and choose a customer.');
          }
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
  createEvent,
  createEventTime,
  contactTasksTextArea,
  contactSearch,
  contactsList,
  ContactFields,
  CalendarDates;
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
