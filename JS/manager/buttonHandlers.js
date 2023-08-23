function buttonHandlers() {
  // vvv Start coding here for Calendar Module vvv

  // Previous Month Button in Calendar Module
  CalendarHTML_PrevMonthBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    removePolicyInfoHighlight();
    findcalSlctdDay = document
      .getElementById('calendarDates')
      .getElementsByClassName(calSelectedDayTag)[0]
      .id.replace('day', '');
    retrievedDate = document.getElementById('CalendarDate').value.split('-');
    document.getElementById('DaysSelect').value >= 7 ? (numberOfDays = 28) : (numberOfDays = 7);
    prevMonth =
      new Date(retrievedDate[0], retrievedDate[1] - 1, retrievedDate[2]).getTime() +
      1000 * 60 * 60 * 24 * -numberOfDays;
    prevMonthHHMM = new Date(prevMonth).setHours(TodaysHour, TodaysMinutes);
    changeCalendarHTML_Date(new Date(prevMonthHHMM));
    calendarDatesFillIn(new Date(prevMonthHHMM), document.getElementById('DaysSelect').value, findcalSlctdDay);
  });

  // Previous Week Button in Calendar Module
  CalendarHTML_PrevWeekBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    removePolicyInfoHighlight();
    findcalSlctdDay = document
      .getElementById('calendarDates')
      .getElementsByClassName(calSelectedDayTag)[0]
      .id.replace('day', '');
    retrievedDate = document.getElementById('CalendarDate').value.split('-');
    document.getElementById('DaysSelect').value >= 7
      ? (numberOfDays = 7)
      : (numberOfDays = document.getElementById('DaysSelect').value);
    prevWeek =
      new Date(retrievedDate[0], retrievedDate[1] - 1, retrievedDate[2]).getTime() +
      1000 * 60 * 60 * 24 * -numberOfDays;
    prevWeekHHMM = new Date(prevWeek).setHours(TodaysHour, TodaysMinutes);
    changeCalendarHTML_Date(new Date(prevWeekHHMM));
    calendarDatesFillIn(new Date(prevWeekHHMM), document.getElementById('DaysSelect').value, findcalSlctdDay);
  });

  // Next Week Button in Calendar Module
  CalendarHTML_NextWeekBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    removePolicyInfoHighlight();
    findcalSlctdDay = document
      .getElementById('calendarDates')
      .getElementsByClassName(calSelectedDayTag)[0]
      .id.replace('day', '');
    retrievedDate = document.getElementById('CalendarDate').value.split('-');
    document.getElementById('DaysSelect').value >= 7
      ? (numberOfDays = 7)
      : (numberOfDays = document.getElementById('DaysSelect').value);
    nextWeek =
      new Date(retrievedDate[0], retrievedDate[1] - 1, retrievedDate[2]).getTime() + 1000 * 60 * 60 * 24 * numberOfDays;
    nextWeekHHMM = new Date(nextWeek).setHours(TodaysHour, TodaysMinutes);
    changeCalendarHTML_Date(new Date(nextWeekHHMM));
    calendarDatesFillIn(new Date(nextWeekHHMM), document.getElementById('DaysSelect').value, findcalSlctdDay);
  });

  // Next Month Button in Calendar Module
  CalendarHTML_NextMonthBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    removePolicyInfoHighlight();
    findcalSlctdDay = document
      .getElementById('calendarDates')
      .getElementsByClassName(calSelectedDayTag)[0]
      .id.replace('day', '');
    retrievedDate = document.getElementById('CalendarDate').value.split('-');
    document.getElementById('DaysSelect').value >= 7 ? (numberOfDays = 28) : (numberOfDays = 7);
    nextMonth =
      new Date(retrievedDate[0], retrievedDate[1] - 1, retrievedDate[2]).getTime() + 1000 * 60 * 60 * 24 * numberOfDays;
    nextMonthHHMM = new Date(nextMonth).setHours(TodaysHour, TodaysMinutes);
    changeCalendarHTML_Date(new Date(nextMonthHHMM));
    calendarDatesFillIn(new Date(nextMonthHHMM), document.getElementById('DaysSelect').value, findcalSlctdDay);
  });

  CalendarHTML_Date.addEventListener('click', function (e) {
    dateSelector = e.target.value;
    return dateSelector;
  });

  CalendarHTML_Date.addEventListener('change', function (e) {
    if (dateSelector != e.target.value) {
      abortCalendarDatesFillIn();
      removePolicyInfoHighlight();
      let retrievedDate = e.target.value.split('-');
      let dateSelected =
        new Date(retrievedDate[0], retrievedDate[1] - 1, retrievedDate[2]).getTime() + 1000 * 60 * 60 * 12;
      calendarDatesFillIn(new Date(dateSelected), document.getElementById('DaysSelect').value);
    }
  });

  // Calendar filter dropdowns
  document.querySelectorAll('.DropDown').forEach((filterDropDown) => {
    filterDropDown.addEventListener('change', function (filter) {
      localStorage.setItem(filter.target.id, filter.target.value);

      if (filter.target.id != 'DaysSelect') {
        let retrievedTasksEvents = document.getElementsByClassName('calTask');
        let allFilterDropDowns = document.querySelectorAll('.DropDown');
        let filterDropDownArray = [...allFilterDropDowns].map((el) => el.value);
        console.log(filterDropDownArray);
        for (key in retrievedTasksEvents) {
          if (retrievedTasksEvents[key].className) {
            let filteredClasses = retrievedTasksEvents[key].className;

            let TasksEventsClassArray = filteredClasses.split(' ');

            let bothArraysEqual = filterDropDownArray.every((r) => TasksEventsClassArray.includes(r));
            if (bothArraysEqual) {
              console.log('test - yes');
              document.getElementById(`${retrievedTasksEvents[key].id}`).classList.remove('hiddenContact');
            } else {
              console.log('test - no');
              document.getElementById(`${retrievedTasksEvents[key].id}`).classList.add('hiddenContact');
            }
          }
        }
      }
    });
  });

  DaysSelect.addEventListener('change', function (e) {
    abortCalendarDatesFillIn();
    localStorage.setItem(e.target.id, e.target.value);
    dayShowHide(e.target.value);
    retrievedDate = document.getElementById('CalendarDate').value.split('-');
    nextWeek = new Date(retrievedDate[0], retrievedDate[1] - 1, retrievedDate[2]).getTime();
    nextWeekHHMM = new Date(nextWeek).setHours(TodaysHour, TodaysMinutes);
    calendarDatesFillIn(new Date(nextWeekHHMM), document.getElementById('DaysSelect').value);
  });

  // Review Button in Side Panel
  reviewContact.addEventListener('click', function () {
    LastEditedBy.value = loggedInUser;
    if (_id.value) {
      reviewDate = new Date().toJSON().slice(0, 10);
      lastEditDate = new Date().toJSON();
      fetch(`${srvrURL}/${_id.value}`, {
        method: 'PATCH',
        body: JSON.stringify({
          LastReviewDate: reviewDate,
          LastEditDate: lastEditDate,
          LastEditedBy: loggedInUser,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  });

  // Side Panel Call Button
  callContact.addEventListener('mousedown', function () {
    callContact.setAttribute('href', `tel:${Phone.value}`);
    // if (Phone.value) {
    //   window.open(`tel:${Phone.value}`);
    //   //<a href="tel:630-202-3773">CLICK TO CALL</a>
    // }
  });

  // Email module send email button using SMPTJS
  sendEmail.addEventListener('click', function () {
    let cntctEmail = document.getElementById('Email');
    if (cntctEmail.value.length > 4) {
      Email.send({
        SecureToken: SMTP[LastEditedBy.value][0],
        To: cntctEmail.value,
        From: SMTP[loggedInUser][1],
        Subject: emailSubject.options[emailSubject.selectedIndex].text,
        Body: emailBody.value,
      }).then(() => {
        snackbar(`Email successfully sent to: ${cntctEmail.value}`);
        emailBody.value = '';
        emailSubject.selectedIndex = 0;
      });
    } else {
      snackbar(`Please provide an email`);
      cntctEmail.classList.add('selectedEventWiggle');
      setTimeout(function () {
        cntctEmail.classList.remove('selectedEventWiggle');
      }, 2000);
    }
  });

  emailSubject.addEventListener('change', function (selected) {
    emailTemplateHandler();
    emailBody.value = `Hi <strong>${FirstName.value}</strong>,<br><br>
    ${emailTemplates[selected.target.value]}`;
    console.log('==========================================');
    let cntctEmail = document.getElementById('Email');
    console.log(cntctEmail.value);
    console.log(SMTP[loggedInUser][1]);
    console.log(emailSubject.options[emailSubject.selectedIndex].text);
    console.log(emailBody.value);
    console.log('==========================================');
  });

  // Create Event Button in ContactTasks Module
  createEvent.addEventListener('click', function () {
    if (_id.value && contactTasksTextArea.value) {
      getJSON(`${srvrURL}/${_id.value}`).then((data) => {
        let calendarEventsArray = data.data.contact.CalendarEvents ? data.data.contact.CalendarEvents : [];
        let obj = {};
        calendarEventsArray.push(
          (obj = {
            EventAuthor: EventAuthor.value,
            DateYYYYMMDD: createEventTime.value.slice(0, 10),
            DateHHMMSS: createEventTime.value.slice(10, 16),
            Description: contactTasksTextArea.value,
            Completed: false,
          })
        );
        fetch(`${srvrURL}/${_id.value}`, {
          method: 'PATCH',
          body: JSON.stringify({
            CalendarEvents: calendarEventsArray,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.text())
          .then(() => {
            contactEditDate();
            IDInput = document.getElementById('_id');
            snackbar(`Event created for ${FirstName.value}`);
            loadSidePanel(`${srvrURL}/${IDInput.value}`);
            EventAuthor.value = loggedInUser;
            contactTasksTextArea.value = '';
          });
      });
    } else {
      snackbar('Please enter task description');
    }
  });

  contactSearch.addEventListener('keyup', function (e) {
    if (e.target.value.length > 2) {
      console.log(contactData);
      populateSearchBarDropDownFunction(contactData, e.target.value);
      contactSearchList.classList.add('show');
      contactSearchList.style.position = 'absolute';
      contactSearchList.style.inset = '0px 0px auto auto';
      contactSearchList.style.margin = '0px';
      contactSearchList.style.transform = 'translate(0px, 62.6667px)';
      contactSearchList.setAttribute('data-popper-placement', 'bottom-end');
    } else {
      contactSearchList.classList.remove('show');
      contactSearchList.removeAttribute('style');
      contactSearchList.removeAttribute('data-popper-placement');
    }
  });

  contactSearch.addEventListener('focusout', function (e) {
    contactSearchList.classList.remove('show');
    contactSearchList.removeAttribute('style');
    contactSearchList.removeAttribute('data-popper-placement');
  });

  // This dynamically creates various events within the "Create Task" button of the contact tasks module
  for (const [key, value] of Object.entries(eventTemplatesObj)) {
    let eventTemplate = document.createElement('li');
    eventTemplate.classList.add('dropdown-item');
    eventTemplate.innerHTML = key.replaceAll('_', ' ');
    eventTemplate.addEventListener('click', function (e) {
      contactTasksTextArea.value = value;
    });
    cntctTasksTxtAreaList.appendChild(eventTemplate);
  }

  document.querySelectorAll('.yearlyEventInput').forEach((yearlyEvntInpt) => {
    yearlyEvntInpt.addEventListener('change', function (e) {
      let MM = document.getElementById(`${e.target.id.slice(0, 12)}MM`).value;
      let DD = document.getElementById(`${e.target.id.slice(0, 12)}DD`).value;
      if (MM && DD) {
        let updateThis = {
          updateURL: `${srvrURL}/${_id.value}`,
          fetchMethod: 'PATCH',
          key: `${e.target.id.slice(0, 12)}MMDD`,
          value: `${MM}-${DD}`,
        };
        updateDB(updateThis);
        contactEditDate();
      } else {
        let updateThis = {
          updateURL: `${srvrURL}${deleteEmptyFieldPath}${_id.value}`,
          fetchMethod: 'DELETE',
          key: `${e.target.id.slice(0, 12)}MMDD`,
          value: ``,
        };
        updateDB(updateThis);
        contactEditDate();
      }
    });
  });

  // Agent Information Input changed calendar event status....need to refactor this further
  document.querySelectorAll('.dynamicInputs').forEach((dynamicInput) => {
    dynamicInput.addEventListener('click', function (e) {
      oldDynamicInput = e.target.value;
      return oldDynamicInput;
    });
    dynamicInput.addEventListener('change', function (e) {
      if (oldDynamicInput == 'Do-Not-Renew') {
        snackbar(`${FirstName.value} removed from "Do Not Renew" List`);
      }
      if (e.target.value == 'Do-Not-Renew') {
        snackbar(`${FirstName.value} placed on "Do Not Renew" List`);
      }
      let retrievedTasksEvents = document.getElementsByClassName(calTaskTag);
      for (key in retrievedTasksEvents) {
        if (retrievedTasksEvents[key].className && retrievedTasksEvents[key].id.includes(_id.value)) {
          let cntctEvents = document.getElementById(retrievedTasksEvents[key].id);
          cntctEvents.classList.remove(oldDynamicInput);
          cntctEvents.classList.add(e.target.value);
          let dynamicSelect = document.getElementById(`${dynamicInput.id}Select`);
          e.target.value == dynamicSelect.value
            ? cntctEvents.classList.remove('hiddenContact')
            : cntctEvents.classList.add('hiddenContact');
        }
      }
    });
  });

  // ^^^ End coding here for Calendar Module ^^^
}

// vvv This scans if all DOM Elements have been retrieved vvv
const isButtonHandlersElementLoaded = async () => {
  while (DOMElements === undefined) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};
isButtonHandlersElementLoaded().then(() => {
  console.log('retrieved module {button handlers}');
  buttonHandlers();
});
