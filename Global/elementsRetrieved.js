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
  phoneInput = document.getElementById('Phone');
  // IDinput = document.getElementById('_id'); Delete this sooner or later if it is not needed
  ContactFields = document
    .getElementById('ContactFields')
    .querySelectorAll('*');
  reviewContact = document.getElementById('reviewContact');
  callContact = document.getElementById('callContact');
  sendEmail = document.getElementById('sendEmail');
  emailSubject = document.getElementById('emailSubject');
  emailBody = document.getElementById('emailBody');
  // Calendar Module Elements
  CalendarHTML_Date = document.getElementById('CalendarDate');
  CalendarHTML_PrevMonthBtn = document.getElementById('LastMonthButton');
  CalendarHTML_PrevWeekBtn = document.getElementById('LastWeekButton');
  CalendarHTML_NextWeekBtn = document.getElementById('NextWeekButton');
  CalendarHTML_NextMonthBtn = document.getElementById('NextMonthButton');
  UniqueDays = document.getElementsByClassName('uniqueday');
  StatusSelect = document.getElementById('StatusSelect');
  SourceSelect = document.getElementById('SourceSelect');
  LastEditedBySelect = document.getElementById('LastEditedBySelect');
  TasksDropDown = document.getElementById('TasksDropDown');
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
          let checkValid = document
            .getElementById(`${ContactFieldsIDs}`)
            .checkValidity();
          if (checkValid) {
            if (_id.value) {
              let checkEmptyFields = this.value;
              if (!checkEmptyFields.replace(/\s/g, '').length) {
                console.log('string only contains spaces, tabs or line breaks');
                let updateThis = {
                  updateURL: `${srvrURL}${deleteEmptyFieldPath}${_id.value}`,
                  fetchMethod: 'DELETE',
                  value: '',
                };
                if (renewDateKeys.includes(this.id)) {
                  let changedInputMMDD = this.id.replace('Date', 'MMDD');
                  updateThis.key = changedInputMMDD;
                  updateDB(updateThis);
                  snackbar(`Deleted ${this.id} for ${FirstName.value}`);
                  contactEditDate();
                } else {
                  updateThis.key = this.id;
                  updateDB(updateThis);
                  snackbar(`Deleted ${this.id} for ${FirstName.value}`);
                  contactEditDate();
                }
              } else {
                let updateThis = {
                  updateURL: `${srvrURL}/${_id.value}`,
                  fetchMethod: 'PATCH',
                };
                if (renewDateKeys.includes(this.id)) {
                  let changedInputMMDD = this.id.replace('Date', 'MMDD');
                  let MMDD = this.value.slice(5, 10);
                  updateThis.key = changedInputMMDD;
                  updateThis.value = MMDD;
                  updateDB(updateThis);
                  snackbar(`Updated ${this.id} for ${FirstName.value}`);
                  contactEditDate();
                } else {
                  updateThis.key = this.id;
                  updateThis.value = this.value;
                  updateDB(updateThis);
                  snackbar(`Updated ${this.id} for ${FirstName.value}`);
                  contactEditDate();
                }
              }
            } else {
              alert('Please search for and choose a customer.');
            }
          } else {
            let invalidInput = document.getElementById(`${ContactFieldsIDs}`);
            console.log(invalidInput.pattern);
            snackbar(
              `Please correct the ${ContactFieldsIDs.toLowerCase()} format: ${
                invalidInput.pattern
              }`
            );
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
  newCntctTaskList,
  IDinput,
  phoneInput,
  CalendarHTML_Date,
  rtrvdCalDateSlctr,
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
  notCompletedCheckBox,
  emailSubject,
  emailBody,
  StatusSelect,
  SourceSelect,
  LastEditedBySelect;
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
