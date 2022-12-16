console.log('retrieved all global functions');
///////////////////////////////////////////////

// getJSON(`${ContactsWithCalEvents}`).then((data) => {
//   console.log(data.contact);
// });
function initiallyLoadSidePanel() {
  let initialLoadDate = `${TodaysDate.toJSON().slice(0, 10)}`;

  getJSON(`${lastEdittedContact}`).then((data) => {
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
initiallyLoadSidePanel();

function loadSidePanel(e) {
  // This populates the Side Panel Input Fields following a Contact Search
  // console.log(`here is the input of ID: ${IDinput.value}`);
  getJSON(`${PhoneURL}${e}`).then((data) => {
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

function calendarDatesFillIn(chosenDate, chosenWeek) {
  for (let rep = 1; rep < 29; rep++) {
    // document.getElementById(`day${rep}`).removeEventListener('click', this); remove the event listener so it doesn't trigger other days clicks
    document.getElementById(`day${rep}`).classList.remove('calendarCurrentDay');
    let noOfDaysToPrevMonday = 0 - chosenDate.getDay() - chosenWeek + rep;
    let CalendarDates = new Date(
      Date.now() +
        1000 /*sec*/ *
          60 /*min*/ *
          60 /*hour*/ *
          24 /*day*/ *
          noOfDaysToPrevMonday /*# of days*/
    );
    let RenewalDates = new Date(
      Date.now() +
        1000 /*sec*/ *
          60 /*min*/ *
          60 /*hour*/ *
          24 /*day*/ *
          (noOfDaysToPrevMonday + 28) /*# of days*/
    );
    // Highlights the selected date, defaults to today's date
    // prettier-ignore
    if (CalendarDates.toJSON().slice(0, 10) == chosenDate.toJSON().slice(0, 10)) document.getElementById(`day${rep}`).classList.add('calendarCurrentDay');
    // prettier-ignore
    document.getElementById(`day${rep}`).innerHTML = `${CalendarDates.toJSON().slice(5, 10)}`;
    document.getElementById(`day${rep}`).addEventListener('click', () => {
      CalendarHTML_Date.innerHTML = `${CalendarDates.toJSON().slice(0, 10)}`;
    });
    getJSON(`${RenewalURL}${RenewalDates.toJSON().slice(5, 10)}`).then(
      (data) => {
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
      }
    );
    getJSON(
      `${ContactsWithCalEvents}${CalendarDates.toJSON().slice(0, 10)}`
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
  getJSON(`${EventsURL}${dailyTask}`).then((data) => {
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
        fetch(`${UpdateEvent}${value._id}`, {
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
        fetch(`${UpdateEvent}${value._id}`, {
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
      let opt1 = document.createElement('option');
      let opt2 = document.createElement('option');
      let opt3 = document.createElement('option');
      let opt4 = document.createElement('option');
      let opt5 = document.createElement('option');
      let opt6 = document.createElement('option');
      opt1.value = 'Bartosz';
      opt1.innerHTML = 'Bartosz';
      if (value.EventAuthor == 'Bartosz') {
        opt1.selected = true;
      }
      opt2.value = 'Hanna';
      opt2.innerHTML = 'Hanna';
      if (value.EventAuthor == 'Hanna') {
        opt2.selected = true;
      }
      opt3.value = 'Kamilla';
      opt3.innerHTML = 'Kamilla';
      if (value.EventAuthor == 'Kamilla') {
        opt3.selected = true;
      }
      opt4.value = 'Piotr';
      opt4.innerHTML = 'Piotr';
      if (value.EventAuthor == 'Piotr') {
        opt4.selected = true;
      }
      opt5.value = 'Aneta';
      opt5.innerHTML = 'Aneta';
      if (value.EventAuthor == 'Aneta') {
        opt5.selected = true;
      }
      opt6.value = 'Yuliya';
      opt6.innerHTML = 'Yuliya';
      if (value.EventAuthor == 'Yuliya') {
        opt6.selected = true;
      }
      ContactTaskAuthor.addEventListener('change', (e) => {
        fetch(`${UpdateEvent}${value._id}`, {
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
        fetch(`${UpdateEvent}${value._id}`, {
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

      ContactTaskGroup.appendChild(ContactTaskDate);
      ContactTaskGroup.appendChild(ContactTaskAuthor);
      ContactTaskAuthor.appendChild(opt1);
      ContactTaskAuthor.appendChild(opt2);
      ContactTaskAuthor.appendChild(opt3);
      ContactTaskAuthor.appendChild(opt4);
      ContactTaskAuthor.appendChild(opt5);
      ContactTaskAuthor.appendChild(opt6);
      ContactTaskGroup.appendChild(ContactTaskCheckBox);
      ContactTaskList.appendChild(ContactTaskDescription);
    }
    return data;
  });
}

function contactEditDate() {
  if (_id.value) {
    let lastEditDate = TodaysDate.toJSON().slice(0, 10);
    fetch(`${ContactsPatchURL}/${_id.value}`, {
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
