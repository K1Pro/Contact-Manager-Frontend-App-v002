console.log('retrieved all global functions');
///////////////////////////////////////////////

// getJSON(`${ContactsWithCalEvents}`).then((data) => {
//   console.log(data.contact);
// });
function initiallyLoadSidePanel() {
  let initialLoadDate = `${TodaysDate.toJSON().slice(0, 10)}`;

  getJSON(`${serverURL}${lastEdittedContactPath}`).then((data) => {
    // console.log(data.data.contacts[0]);

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
      }
    }
  });
}

function loadSidePanel(e) {
  // This populates the Side Panel Input Fields following a Contact Search
  // console.log(`here is the input of ID: ${IDinput.value}`);
  getJSON(`${serverURL}${phonePath}${e}`).then((data) => {
    // console.log(data.data.contacts[0].CalendarEvents);
    // console.log(data.data.contacts[0]._id);
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
      }
    }
    // return data;
  });
}
function changeCalendarHTML_Date(chosenDate) {
  console.log('We are choosing the date');
  CalendarHTML_Date.value = `${chosenDate.toJSON().slice(0, 10)}`;
}

function calendarDatesFillIn(chosenDate) {
  let prevMondayLastWeek = 0 - chosenDate.getDay() - daysInWeek;
  for (let rep = 1; rep < 29; rep++) {
    document.getElementById(`day${rep}`).classList.remove('calendarCurrentDay');
    let CalendarDates = new Date(
      chosenDate.getTime() +
        1000 /*sec*/ *
          60 /*min*/ *
          60 /*hour*/ *
          24 /*day*/ *
          (prevMondayLastWeek + rep) /*# of days*/
    );
    let RenewalDates = new Date(
      chosenDate.getTime() +
        1000 /*sec*/ *
          60 /*min*/ *
          60 /*hour*/ *
          24 /*day*/ *
          (prevMondayLastWeek + rep + 28) /*# of days*/
    );
    // Highlights the selected date, defaults to today's date
    // prettier-ignore
    if (CalendarDates.toJSON().slice(0, 10) == chosenDate.toJSON().slice(0, 10)) document.getElementById(`day${rep}`).classList.add('calendarCurrentDay');
    // prettier-ignore
    document.getElementById(`day${rep}`).innerHTML = `${CalendarDates.toJSON().slice(5, 10)}`;
    // document.getElementById(`day${rep}`).removeEventListener('click', () => {
    //   changeCalendarHTML_Date(CalendarDates);
    // });
    document.getElementById(`day${rep}`).addEventListener('click', () => {
      changeCalendarHTML_Date(CalendarDates);
    });
    getJSON(
      `${serverURL}${renewalPath}${RenewalDates.toJSON().slice(5, 10)}`
    ).then((data) => {
      // Populates renewals
      let renewalContact;
      if (data.data.contacts.length) {
        renewalContact = data.data.contacts;
        renewalContact.map((x) => {
          let p = document.createElement('div');
          let calDateNoDash = `${CalendarDates.toJSON()
            .slice(0, 10)
            .replaceAll('-', '')}`;
          // prettier-ignore
          let lastReviewDateNoDash = `${x.LastReviewDate.replaceAll('-', '')}`;
          if (lastReviewDateNoDash < calDateNoDash) {
            p.classList.add('renewal');
          } else {
            p.classList.add('Completed');
          }
          p.classList.add(`${x.Status.replace(' ', '')}`);
          p.classList.add(`${x.Source.replace(' ', '')}`);
          p.textContent = `${x.LastName}`;
          p.setAttribute(
            'id',
            `renewal${x._id}${Math.floor(Math.random() * 100)}`
          );

          p.classList.add('text-light');
          p.addEventListener('click', (e) => {
            loadSidePanel(x.Phone);
          });
          document.getElementById(`day${rep}`).appendChild(p);
        });
      }
    });
    getJSON(
      `${serverURL}${contactsWithCalEventsPath}${CalendarDates.toJSON().slice(
        0,
        10
      )}`
    ).then((data) => {
      // Populates completed and not completed calendar events
      let renewalContact;
      if (data.contacts.length) {
        renewalContact = data.contacts;
        renewalContact.map((x) => {
          let p = document.createElement('div');
          const results = x.CalendarEvents.filter((obj) => {
            return (
              obj.DateYYYYMMDD === `${CalendarDates.toJSON().slice(0, 10)}`
            );
          });
          if (!results[0].Completed) {
            p.classList.add('notCompleted');
          } else {
            p.classList.add('Completed');
          }
          p.setAttribute('id', `Event${results[0]._id}`);
          p.textContent = `${x.LastName}`;
          p.classList.add('text-light');
          p.addEventListener('click', (e) => {
            loadSidePanel(x.Phone);
          });
          document.getElementById(`day${rep}`).appendChild(p);
        });
      }
    });
  }
}

function loadContactTasks(dailyTask) {
  ContactTaskList.innerHTML = '';
  getJSON(`${serverURL}${eventsPath}${dailyTask}`).then((data) => {
    // sorts the array in reverse chronological order
    let CalendarEventsArray = data.data.CalendarEvents;
    function compare(a, b) {
      if (a.DateYYYYMMDD < b.DateYYYYMMDD) {
        return 1;
      }
      if (a.DateYYYYMMDD > b.DateYYYYMMDD) {
        return -1;
      }
      return 0;
    }
    CalendarEventsArray.sort(compare);
    for (const [key, value] of Object.entries(CalendarEventsArray)) {
      // Creates a DIV
      let ContactTaskGroup = document.createElement('div');
      ContactTaskGroup.setAttribute('class', 'input-group');
      ContactTaskList.appendChild(ContactTaskGroup);

      let ContactTaskDate = document.createElement('input');
      let ContactTaskDescription = document.createElement('textarea');
      let ContactTaskCheckBox = document.createElement('input');
      let ContactTaskAuthor = document.createElement('select');

      // Creates a datetime-local Input
      ContactTaskDate.type = 'datetime-local';
      ContactTaskDate.value = `${value.DateYYYYMMDD}${value.DateHHMMSS}`;
      ContactTaskDate.setAttribute(
        'class',
        'form-control eventDates border-bottom-0'
      );
      ContactTaskDate.addEventListener('change', (e) => {
        fetch(`${serverURL}${updateEventPath}${value._id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            _id: value._id,
            EventAuthor: ContactTaskAuthor.value,
            DateYYYYMMDD: e.target.value.slice(0, 10),
            DateHHMMSS: e.target.value.slice(10, 16),
            Description: ContactTaskDescription.value,
            Completed: ContactTaskCheckBox.checked,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.text())
          .then(() => {
            contactEditDate();
            // console.log(response);
            PhoneInput = document.getElementById('Phone');
            contactTasksTextArea.value = '';
            loadSidePanel(PhoneInput.value);
          });
      });
      ContactTaskGroup.appendChild(ContactTaskDate);

      // Creates a text input for the description
      // ContactTaskDescription.type = 'input';
      ContactTaskDescription.value = `${value.Description}`;
      ContactTaskDescription.spellcheck = 'false';
      // console.log(Math.round(ContactTaskDescription.value.length / 100 + 1));
      // console.log(ContactTaskDescription.value.length / 100 + 1);
      ContactTaskDescription.rows = Math.round(
        ContactTaskDescription.value.length / 120 + 1
      );
      ContactTaskDescription.setAttribute(
        'class',
        'form-control eventDescriptions border-top-0'
      );
      ContactTaskDescription.addEventListener('change', (e) => {
        fetch(`${serverURL}${updateEventPath}${value._id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            _id: value._id,
            EventAuthor: ContactTaskAuthor.value,
            DateYYYYMMDD: ContactTaskDate.value.slice(0, 10),
            DateHHMMSS: ContactTaskDate.value.slice(10, 16),
            Description: e.target.value,
            Completed: ContactTaskCheckBox.checked,
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
            loadSidePanel(PhoneInput.value);
          });
      });

      // Create a select input for the Event Author
      ContactTaskAuthor.addEventListener('change', (e) => {
        fetch(`${serverURL}${updateEventPath}${value._id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            _id: value._id,
            EventAuthor: e.target.value,
            DateYYYYMMDD: ContactTaskDate.value.slice(0, 10),
            DateHHMMSS: ContactTaskDate.value.slice(10, 16),
            Description: ContactTaskDescription.value,
            Completed: ContactTaskCheckBox.checked,
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
            loadSidePanel(PhoneInput.value);
          });
      });
      ContactTaskGroup.appendChild(ContactTaskAuthor);

      staffMembers.forEach((staffMember) => {
        let ContactTaskAuthors = document.createElement('option');
        ContactTaskAuthors.value = staffMember;
        ContactTaskAuthors.innerHTML = staffMember;
        if (value.EventAuthor == staffMember) {
          ContactTaskAuthors.selected = true;
        }
        ContactTaskAuthor.appendChild(ContactTaskAuthors);
      });

      // Creates a checkbox
      ContactTaskCheckBox.type = 'checkbox';
      ContactTaskCheckBox.checked = value.Completed;
      ContactTaskCheckBox.setAttribute(
        'class',
        'form-check-input mt-0 bartkaCheckbox'
      );
      ContactTaskCheckBox.addEventListener('click', (e) => {
        // console.log(value._id);
        // console.log(ContactTaskDate.value.slice(0, 10));
        // console.log(ContactTaskDate.value.slice(10, 16));
        // console.log(ContactTaskDescription.value);
        // console.log(e.target.checked);
        fetch(`${serverURL}${updateEventPath}${value._id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            _id: value._id,
            EventAuthor: ContactTaskAuthor.value,
            DateYYYYMMDD: ContactTaskDate.value.slice(0, 10),
            DateHHMMSS: ContactTaskDate.value.slice(10, 16),
            Description: ContactTaskDescription.value,
            Completed: e.target.checked,
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
              if (checkCompletion.includes('notCompleted')) {
                let checkCompletion = document.getElementById(
                  `Event${value._id}`
                );
                checkCompletion.setAttribute('class', `Completed text-light`);
              } else {
                let checkCompletion = document.getElementById(
                  `Event${value._id}`
                );
                checkCompletion.setAttribute(
                  'class',
                  `notCompleted text-light`
                );
              }
            }

            // let testName = document.getElementById(
            //   `Event${value._id}`
            // ).className;

            PhoneInput = document.getElementById('Phone');
            contactTasksTextArea.value = '';
            loadSidePanel(PhoneInput.value);
          });
      });

      ContactTaskGroup.appendChild(ContactTaskCheckBox);
      ContactTaskList.appendChild(ContactTaskDescription);
    }
    return data;
  });
}

function contactEditDate() {
  if (_id.value) {
    let lastEditDate = TodaysDate.toJSON().slice(0, 10);
    fetch(`${serverURL}/${_id.value}`, {
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
