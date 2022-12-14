function elementsrequired() {
  // vvv Start coding here for Retrieval Module vvv

  // Contact Task Module Elements
  ContactTaskList = document.getElementById('ContactTaskList');
  contactTasksTextArea = document.getElementById('contactTasksTextArea');
  createEventTime = document.getElementById('createEventTime');
  createEvent = document.getElementById('createEvent');
  // Side Panel Module Elements
  contactSearch = document.getElementById('contactSearch');
  contactsList = document.getElementById('contactsList');
  IDinput = document.getElementById('_id');
  ContactFields = document
    .getElementById('ContactFields')
    .querySelectorAll('*');
  // Calendar Module Elements
  CalendarHTML_Date = document.getElementById('CalendarDate');
  CalendarHTML_PrevMonthBtn = document.getElementById('LastMonthButton');
  CalendarHTML_PrevWeekBtn = document.getElementById('LastWeekButton');
  CalendarHTML_NextWeekBtn = document.getElementById('NextWeekButton');
  CalendarHTML_NextMonthBtn = document.getElementById('NextMonthButton');
  UniqueDays = document.getElementsByClassName('uniqueday');
  renewalsCheckBox = document.getElementById('renewsCheckBox');
  completedCheckBox = document.getElementById('completedCheckBox');
  notCompletedCheckBox = document.getElementById('notCompletedCheckBox');
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
            let checkEmptyFields = this.value;
            if (!checkEmptyFields.replace(/\s/g, '').length) {
              console.log(
                'string only contains whitespace (ie. spaces, tabs or line breaks)'
              );
              if (
                this.id == 'Policy1RenewDate' ||
                this.id == 'Policy2RenewDate' ||
                this.id == 'Policy3RenewDate' ||
                this.id == 'Policy4RenewDate'
              ) {
                let changedInputMMDD = this.id.replace('Date', 'MMDD');
                fetch(`${deleteEmptyField}${_id.value}`, {
                  method: 'DELETE',
                  body: JSON.stringify({
                    [changedInputMMDD]: '',
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
              } else {
                fetch(`${deleteEmptyField}${_id.value}`, {
                  method: 'DELETE',
                  body: JSON.stringify({
                    [this.id]: '',
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
              }
            } else {
              if (
                this.id == 'Policy1RenewDate' ||
                this.id == 'Policy2RenewDate' ||
                this.id == 'Policy3RenewDate' ||
                this.id == 'Policy4RenewDate'
              ) {
                let changedInfo = this.value.slice(5, 10);
                let changedInputMMDD = this.id.replace('Date', 'MMDD');
                fetch(`${ContactsPatchURL}/${_id.value}`, {
                  method: 'PATCH',
                  body: JSON.stringify({
                    [changedInputMMDD]: changedInfo,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
              } else {
                fetch(`${ContactsPatchURL}/${_id.value}`, {
                  method: 'PATCH',
                  body: JSON.stringify({
                    [this.id]: this.value,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
              }
              // this might be useful in the future dont enable for now until needed
              // .then((response) => response.text())
              // .then(() => {
              //   getJSON(ContactsURL).then((data) => {
              //     console.log(data);
              //   });
              // });
            }
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
  ContactTaskList,
  IDinput,
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
  CalendarDates,
  UniqueDays,
  renewalsCheckBox,
  completedCheckBox,
  notCompletedCheckBox;
// TaskList;
// ^^^ All retrieved elements should be declared here ^^^

// vvv This scans for all separate HTML Modules vvv

async function isElementLoaded(selector) {
  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
}
isElementLoaded('#CalendarHTMLModule').then(() => {
  isElementLoaded('#ContactTasksHTMLModule').then(() => {
    isElementLoaded('#EmailHTMLModule').then(() => {
      isElementLoaded('#SidePanelHTMLModule').then(() => {
        console.log('retrieved all modules {All DOM elements retrieved}');
        elementsrequired();
      });
    });
  });
});

// import { ContactsURL } from './date.js';
