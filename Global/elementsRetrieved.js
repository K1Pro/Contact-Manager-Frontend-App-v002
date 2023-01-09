function elementsRequired() {
  // vvv Start coding here for Retrieval Module vvv

  // Contact Task Module Elements
  ContactTaskList = document.getElementById('ContactTaskList');
  contactTasksTextArea = document.getElementById('contactTasksTextArea');
  createEventTime = document.getElementById('createEventTime');
  createEvent = document.getElementById('createEvent');
  EventAuthor = document.getElementById('EventAuthor');
  // Side Panel Module Elements
  contactSearch = document.getElementById('contactSearch');
  contactsList = document.getElementById('contactsList');
  // IDinput = document.getElementById('_id'); Delete this sooner or later if it is not needed
  ContactFields = document
    .getElementById('ContactFields')
    .querySelectorAll('*');
  reviewContact = document.getElementById('reviewContact');
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
              console.log('string only contains spaces, tabs or line breaks');
              let updateThis = {
                updateURL: `${serverURL}${deleteEmptyFieldPath}${_id.value}`,
                fetchMethod: 'DELETE',
                value: '',
              };
              if (renewDateKeys.includes(this.id)) {
                let changedInputMMDD = this.id.replace('Date', 'MMDD');
                updateThis.key = changedInputMMDD;
                updateDB(updateThis);
                contactEditDate();
              } else {
                updateThis.key = this.id;
                updateDB(updateThis);
                contactEditDate();
              }
            } else {
              let updateThis = {
                updateURL: `${serverURL}/${_id.value}`,
                fetchMethod: 'PATCH',
              };
              if (renewDateKeys.includes(this.id)) {
                let changedInputMMDD = this.id.replace('Date', 'MMDD');
                let MMDD = this.value.slice(5, 10);
                updateThis.key = changedInputMMDD;
                updateThis.value = MMDD;
                updateDB(updateThis);
                contactEditDate();
              } else {
                updateThis.key = this.id;
                updateThis.value = this.value;
                updateDB(updateThis);
                contactEditDate();
              }
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
isElementLoaded('#CalendarHTMLModule').then(() => {
  isElementLoaded('#ContactTasksHTMLModule').then(() => {
    isElementLoaded('#EmailHTMLModule').then(() => {
      isElementLoaded('#SidePanelHTMLModule').then(() => {
        console.log(
          'retrieved all DOM elements {for elements retrieved module}'
        );
        elementsRequired();
      });
    });
  });
});

// import { ContactsURL } from './date.js';
