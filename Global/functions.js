console.log('retrieved all global functions');
///////////////////////////////////////////////
// vvv This scans for all separate HTML Modules vvv
async function isElementLoaded(selector) {
  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
}

function loadSidePanel(URL) {
  // This populates the Side Panel Input Fields following certain actions
  getJSON(URL).then((data) => {
    for (let rep = 0; rep < ContactFields.length; rep++) {
      let ContactFieldsIDs = ContactFields[rep].id;
      if (ContactFieldsIDs) {
        document.getElementById(`${ContactFieldsIDs}`).value = data.data
          .contacts[0][ContactFieldsIDs]
          ? `${data.data.contacts[0][ContactFieldsIDs]}`
          : '';
      }
      if (ContactFieldsIDs == '_id') {
        let contactID = document.getElementById(`${ContactFieldsIDs}`);
        loadContactTasks(contactID.value);
        // Highlights each renewal and event active in the calendar
        calID = data.data.contacts[0]._id;
        for (let rep = 0; rep < 31; rep++) {
          let cntctCalRnwl = document.getElementById(`renewal${calID}${rep}`);
          if (cntctCalRnwl) {
            cntctCalRnwl.classList.add('active');
          }
        }
        calEvnts = data.data.contacts[0].CalendarEvents;
        calEvnts.forEach((calEvent) => {
          let cntctCalEvnt = document.getElementById(`Event${calEvent._id}`);
          if (cntctCalEvnt) {
            cntctCalEvnt.classList.add('active');
          }
        });
      }
    }
  });
}

function compare(a, b) {
  if (a.DateYYYYMMDD < b.DateYYYYMMDD) {
    return 1;
  }
  if (a.DateYYYYMMDD > b.DateYYYYMMDD) {
    return -1;
  }
  return 0;
}

function changeCalendarHTML_Date(chosenDate) {
  CalendarHTML_Date.value = `${chosenDate.toJSON().slice(0, 10)}`;
}

function calendarDatesFillIn(chosenDate) {
  let prevMondayLastWeek = 0 - chosenDate.getDay() - daysInWeek;
  for (let rep = 1; rep < 29; rep++) {
    document.getElementById(`day${rep}`).classList.remove('calendarCurrentDay');
    let calDates = new Date(
      chosenDate.getTime() +
        1000 /*sec*/ *
          60 /*min*/ *
          60 /*hour*/ *
          24 /*day*/ *
          (prevMondayLastWeek + rep) /*# of days*/
    );
    let rnwlDates = new Date(
      chosenDate.getTime() +
        1000 /*sec*/ *
          60 /*min*/ *
          60 /*hour*/ *
          24 /*day*/ *
          (prevMondayLastWeek + rep + 28) /*# of days*/
    );
    // Highlights the selected date, defaults to today's date
    // prettier-ignore
    if (calDates.toJSON().slice(0, 10) == chosenDate.toJSON().slice(0, 10)) document.getElementById(`day${rep}`).classList.add('calendarCurrentDay');
    // prettier-ignore
    document.getElementById(`day${rep}`).innerHTML = `${calDates.toJSON().slice(5, 10)}`;
    // document.getElementById(`day${rep}`).removeEventListener('click', () => {
    //   changeCalendarHTML_Date(calDates);
    // });
    document.getElementById(`day${rep}`).addEventListener('click', () => {
      changeCalendarHTML_Date(calDates);
      createEventTime.value = `${calDates.toJSON().slice(0, 16)}`;
    });
    getJSON(`${srvrURL}${rnwlPath}${rnwlDates.toJSON().slice(5, 10)}`).then(
      (data) => {
        // Populates renewals
        let rnwlCntcts;
        if (data.data.contacts.length) {
          rnwlCntcts = data.data.contacts;
          rnwlCntcts.map((rnwlCntct) => {
            let calCntct = document.createElement('div');
            // prettier-ignore
            let calDateNoDash = `${calDates.toJSON().slice(0, 10).replaceAll('-', '')}`;
            // prettier-ignore
            let lastReviewDateNoDash = `${rnwlCntct.LastReviewDate.replaceAll('-', '')}`;
            calCntct.classList.add('text-light');
            calCntct.classList.add('calTask');
            calCntct.classList.add('renewal');
            lastReviewDateNoDash >= calDateNoDash
              ? calCntct.classList.add('rCompleted')
              : calCntct.classList.add('rNotCompleted');
            if (rnwlCntct._id == _id.value) calCntct.classList.add('active');
            calCntct.classList.add(rnwlCntct.Status);
            calCntct.classList.add(rnwlCntct.Source);
            calCntct.classList.add(rnwlCntct.LastEditedBy);
            if (
              TasksDropDown.value == 'event' ||
              TasksDropDown.value == 'eCompleted' ||
              TasksDropDown.value == 'eNotCompleted'
            )
              calCntct.classList.add('hiddenContact');
            if (
              TasksDropDown.value == 'rCompleted' &&
              lastReviewDateNoDash < calDateNoDash
            )
              calCntct.classList.add('hiddenContact');
            if (
              TasksDropDown.value == 'rNotCompleted' &&
              lastReviewDateNoDash >= calDateNoDash
            )
              calCntct.classList.add('hiddenContact');
            if (
              StatusSelect.value != '' &&
              StatusSelect.value != 'All' &&
              StatusSelect.value != rnwlCntct.Status
            )
              calCntct.classList.add('hiddenContact');
            if (
              SourceSelect.value != '' &&
              SourceSelect.value != 'All' &&
              SourceSelect.value != rnwlCntct.Source
            )
              calCntct.classList.add('hiddenContact');
            if (
              LastEditedBySelect.value != '' &&
              LastEditedBySelect.value != 'All' &&
              LastEditedBySelect.value != rnwlCntct.LastEditedBy
            )
              calCntct.classList.add('hiddenContact');
            calCntct.textContent = `${rnwlCntct.LastName}`;
            calCntct.setAttribute('id', `renewal${rnwlCntct._id}${rep + 1}`);
            calCntct.addEventListener('click', () => {
              emailBody.value = '';
              emailSubject.value = 'choose-email-template';
              removeActiveCalCntct();
              loadSidePanel(`${srvrURL}${phonePath}${rnwlCntct.Phone}`);
              calCntct.classList.add('active');
            });
            document.getElementById(`day${rep}`).appendChild(calCntct);
          });
        }
      }
    );
    getJSON(
      `${srvrURL}${contactsWithCalEventsPath}${calDates.toJSON().slice(0, 10)}`
    ).then((data) => {
      // Populates completed and not completed calendar events
      let rnwlCntcts;
      if (data.contacts.length) {
        rnwlCntcts = data.contacts;
        rnwlCntcts.map((rnwlCntct) => {
          let calCntct = document.createElement('div');
          calCntct.classList.add('text-light');
          calCntct.classList.add('calTask');
          calCntct.classList.add('event');
          const sortedCalEvents = rnwlCntct.CalendarEvents.filter((obj) => {
            return obj.DateYYYYMMDD === `${calDates.toJSON().slice(0, 10)}`;
          });
          !sortedCalEvents[0].Completed
            ? calCntct.classList.add('eNotCompleted')
            : calCntct.classList.add('eCompleted');
          if (rnwlCntct._id == _id.value) calCntct.classList.add('active');
          calCntct.classList.add(rnwlCntct.Status);
          calCntct.classList.add(rnwlCntct.Source);
          calCntct.classList.add(sortedCalEvents[0].EventAuthor);
          if (
            TasksDropDown.value == 'renewal' ||
            TasksDropDown.value == 'rCompleted' ||
            TasksDropDown.value == 'rNotCompleted'
          )
            calCntct.classList.add('hiddenContact');
          if (
            TasksDropDown.value == 'eCompleted' &&
            !sortedCalEvents[0].Completed
          )
            calCntct.classList.add('hiddenContact');
          if (
            TasksDropDown.value == 'eNotCompleted' &&
            sortedCalEvents[0].Completed
          )
            calCntct.classList.add('hiddenContact');
          if (
            StatusSelect.value != '' &&
            StatusSelect.value != 'All' &&
            StatusSelect.value != rnwlCntct.Status
          )
            calCntct.classList.add('hiddenContact');
          if (
            SourceSelect.value != '' &&
            SourceSelect.value != 'All' &&
            SourceSelect.value != rnwlCntct.Source
          )
            calCntct.classList.add('hiddenContact');
          if (
            LastEditedBySelect.value != '' &&
            LastEditedBySelect.value != 'All' &&
            LastEditedBySelect.value != sortedCalEvents[0].EventAuthor
          )
            calCntct.classList.add('hiddenContact');
          calCntct.textContent = `${rnwlCntct.LastName}`;
          calCntct.setAttribute('id', `Event${sortedCalEvents[0]._id}`);
          calCntct.addEventListener('click', () => {
            emailBody.value = '';
            removeActiveCalCntct();
            loadSidePanel(`${srvrURL}${phonePath}${rnwlCntct.Phone}`);
            calCntct.classList.add('active');
          });
          document.getElementById(`day${rep}`).appendChild(calCntct);
        });
      }
    });
  }
}

function updateContactTasks(contactTask) {
  fetch(`${srvrURL}${updateEventPath}${contactTask.UID}`, {
    method: 'PATCH',
    body: JSON.stringify({
      _id: contactTask.UID,
      EventAuthor: contactTask.Author.value,
      DateYYYYMMDD: contactTask.Dated.value.slice(0, 10),
      DateHHMMSS: contactTask.Dated.value.slice(10, 16),
      Description: contactTask.Description.value,
      Completed: contactTask.CheckBox.checked,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then(() => {
      contactEditDate();
      PhoneInput = document.getElementById('Phone');
      contactTasksTextArea.value = '';
      loadSidePanel(`${srvrURL}${phonePath}${PhoneInput.value}`);
    });
}

function loadContactTasks(dailyTask) {
  ContactTaskList.innerHTML = '';
  getJSON(`${srvrURL}${eventsPath}${dailyTask}`).then((data) => {
    // sorts the array in reverse chronological order
    let CalendarEventsArray = data.data.CalendarEvents;
    CalendarEventsArray.sort(compare);

    for (const [key, value] of Object.entries(CalendarEventsArray)) {
      // Creates a DIV
      let ContactTaskGroup = document.createElement('div');
      ContactTaskGroup.setAttribute('class', 'input-group');
      ContactTaskList.appendChild(ContactTaskGroup);

      let contactTask = {
        UID: value._id,
        Dated: document.createElement('input'),
        Description: document.createElement('textarea'),
        CheckBox: document.createElement('input'),
        Author: document.createElement('select'),
      };

      // Creates a datetime-local Input
      contactTask.Dated.type = 'datetime-local';
      contactTask.Dated.value = `${value.DateYYYYMMDD}${value.DateHHMMSS}`;
      contactTask.Dated.setAttribute(
        'class',
        'form-control eventDates border-bottom-0'
      );
      contactTask.Dated.addEventListener('focusout', () => {
        updateContactTasks(contactTask);
      });
      ContactTaskGroup.appendChild(contactTask.Dated);

      // Creates a text input for the description
      contactTask.Description.value = `${value.Description}`;
      contactTask.Description.spellcheck = 'false';
      contactTask.Description.rows = Math.round(
        contactTask.Description.value.length / 120 + 1
      );
      contactTask.Description.setAttribute(
        'class',
        'form-control eventDescriptions border-top-0'
      );
      contactTask.Description.addEventListener('change', () => {
        updateContactTasks(contactTask);
      });
      // Create a select input for the Event Author
      contactTask.Author.addEventListener('change', () => {
        updateContactTasks(contactTask);
      });
      ContactTaskGroup.appendChild(contactTask.Author);

      LastEditedByS.forEach((staffMember) => {
        let CntctTskAuthors = document.createElement('option');
        CntctTskAuthors.value = staffMember;
        CntctTskAuthors.innerHTML = staffMember;
        if (value.EventAuthor == staffMember) CntctTskAuthors.selected = true;
        contactTask.Author.appendChild(CntctTskAuthors);
      });

      // Creates a checkbox
      contactTask.CheckBox.type = 'checkbox';
      contactTask.CheckBox.checked = value.Completed;
      contactTask.CheckBox.setAttribute(
        'class',
        'form-check-input mt-0 bartkaCheckbox'
      );
      contactTask.CheckBox.addEventListener('click', () => {
        fetch(`${srvrURL}${updateEventPath}${value._id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            _id: value._id,
            EventAuthor: contactTask.Author.value,
            DateYYYYMMDD: contactTask.Dated.value.slice(0, 10),
            DateHHMMSS: contactTask.Dated.value.slice(10, 16),
            Description: contactTask.Description.value,
            Completed: contactTask.CheckBox.checked,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.text())
          .then(() => {
            contactEditDate();
            let checkCompletion = document.getElementById(`Event${value._id}`);
            if (checkCompletion) {
              checkCompletion = checkCompletion.className;
              if (checkCompletion.includes('eNotCompleted')) {
                let checkCompletion = document.getElementById(
                  `Event${value._id}`
                );
                checkCompletion.setAttribute('class', `eCompleted text-light`);
              } else {
                let checkCompletion = document.getElementById(
                  `Event${value._id}`
                );
                checkCompletion.setAttribute(
                  'class',
                  `eNotCompleted text-light`
                );
              }
            }

            PhoneInput = document.getElementById('Phone');
            contactTasksTextArea.value = '';
            loadSidePanel(`${srvrURL}${phonePath}${PhoneInput.value}`);
          });
      });
      ContactTaskGroup.appendChild(contactTask.CheckBox);
      ContactTaskList.appendChild(contactTask.Description);
    }
    return data;
  });
}

function removeActiveCalCntct() {
  let highlightedItems = document
    .getElementById('calendarDates')
    .querySelectorAll('*');
  highlightedItems.forEach((userItem) => {
    userItem.classList.remove('active');
  });
}

function populateSelect(calArray, SelectElement) {
  calArray.forEach((calArrayItems) => {
    let calOption = document.createElement('option');
    calOption.value = calArrayItems;
    calOption.innerHTML = calArrayItems;
    SelectElement.appendChild(calOption);
  });
}

function calendarFilter(chosenFilter) {
  if (chosenFilter) {
    renewals = document.getElementsByClassName('calTask');
    for (key in renewals) {
      if (renewals[key].className) {
        if (chosenFilter.target.value == 'All') {
          document
            .getElementById(`${renewals[key].id}`)
            .classList.remove('hiddenContact');
        } else {
          document
            .getElementById(`${renewals[key].id}`)
            .classList.add('hiddenContact');
          if (renewals[key].className.includes(chosenFilter.target.value)) {
            document
              .getElementById(`${renewals[key].id}`)
              .classList.remove('hiddenContact');
          }
        }
      }
    }
  }
}

function contactEditDate() {
  if (_id.value) {
    lastEditDate = new Date().toJSON(); //.slice(0, 16);
    fetch(`${srvrURL}/${_id.value}`, {
      method: 'PATCH',
      body: JSON.stringify({
        LastEditDate: lastEditDate,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

function updateDB(input) {
  fetch(input.updateURL, {
    method: input.fetchMethod,
    body: JSON.stringify({
      [input.key]: input.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      alert('Please enter a unique phone number');
    });
}
