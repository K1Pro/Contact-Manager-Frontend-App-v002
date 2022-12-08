console.log('retrieved all global functions');
///////////////////////////////////////////////

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
    // This fills in the individual calendar date days
    document
      .getElementById(`day${rep}`)
      .setAttribute('data-day', `${CalendarDates.toJSON().slice(5, 10)}`);
    document
      .getElementById(`day${rep}`)
      .setAttribute('data-renewalday', `${RenewalDates.toJSON().slice(5, 10)}`);
    document.getElementById(
      `day${rep}`
    ).innerHTML = `${CalendarDates.toJSON().slice(5, 10)}`;
    document.getElementById(`day${rep}`).addEventListener('click', () => {
      CalendarHTML_Date.innerHTML = `${CalendarDates.toJSON().slice(0, 10)}`;
      loadDailyTasks(`${RenewalDates.toJSON().slice(5, 10)}`);
    });
    getJSON(`${RenewalURL}${RenewalDates.toJSON().slice(5, 10)}`).then(
      (data) => {
        let renewalContact;
        if (data.data.contacts.length) {
          renewalContact = data.data.contacts;
          renewalContact.map((x) => {
            let p = document.createElement('div');
            p.textContent = `${x.LastName}`;
            p.classList.add('notCompleted');
            p.classList.add('text-light');
            // p.classList.add('font-weight-bold');
            // prettier-ignore
            document.querySelector(`[data-renewalday="${RenewalDates.toJSON().slice(5, 10)}"]`).appendChild(p);
          });
        }
      }
    );
  }
}

function loadDailyTasks(dailyTask) {
  TaskList.innerHTML = '';
  getJSON(`${RenewalURL}${dailyTask}`).then((data) => {
    // Populates a list of task into the DailyTasks Module
    for (const [key, value] of Object.entries(data.data.contacts)) {
      console.log(value);
      let DailyTaskFullName = `${value.FirstName} ${value.LastName}`;
      let DailyTask = document.createElement('div');
      DailyTask.classList.add('notCompleted');
      DailyTask.classList.add('text-light');
      // DailyTask.setAttribute('href', '#');
      DailyTask.innerHTML = DailyTaskFullName;
      TaskList.appendChild(DailyTask);

      // <button type="button" class="btn btn-warning">Warning</button>
    }
    return data;
  });
}

function loadContactTasks(dailyTask) {
  ContactTaskList.innerHTML = '';
  getJSON(`${EventsURL}${dailyTask}`).then((data) => {
    // console.log(data.data.CalendarEvents);
    for (const [key, value] of Object.entries(data.data.CalendarEvents)) {
      console.log(value);
      // Creates a DIV
      let ContactTaskGroup = document.createElement('div');
      ContactTaskGroup.setAttribute('class', 'input-group');
      ContactTaskList.appendChild(ContactTaskGroup);
      // Creates a datetime-local Input
      let ContactTaskDate = document.createElement('input');
      ContactTaskDate.type = 'datetime-local';
      ContactTaskDate.value = `${value.Date}`;
      ContactTaskDate.setAttribute('class', 'form-control');
      ContactTaskGroup.appendChild(ContactTaskDate);
      // Creates a text input
      let ContactTaskDescription = document.createElement('input');
      ContactTaskDescription.type = 'text';
      ContactTaskDescription.value = `${value.Description}`;
      ContactTaskDescription.setAttribute('class', 'form-control');
      ContactTaskGroup.appendChild(ContactTaskDescription);
      // Creates a checkbox
      let ContactTaskCheckBox = document.createElement('input');
      ContactTaskCheckBox.type = 'checkbox';
      ContactTaskCheckBox.setAttribute('class', 'form-check-input mt-0');
      ContactTaskGroup.appendChild(ContactTaskCheckBox);
    }
    return data;
  });
}
