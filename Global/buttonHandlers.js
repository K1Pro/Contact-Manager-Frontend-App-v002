function buttonHandlers() {
  // vvv Start coding here for Calendar Module vvv

  // Previous Month Button in Calendar Module
  CalendarHTML_PrevMonthBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    weekTracker = weekTracker - 28;
    let prevMonth = new Date(Date.now() + 1000 * 60 * 60 * 24 * weekTracker);
    changeCalendarHTML_Date(prevMonth);
    calendarDatesFillIn(prevMonth);
  });

  // Previous Week Button in Calendar Module
  CalendarHTML_PrevWeekBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    let retrievedDate = document
      .getElementById('CalendarDate')
      .value.split('-');
    let prevWeek =
      new Date(
        retrievedDate[0],
        retrievedDate[1] - 1,
        retrievedDate[2]
      ).getTime() +
      1000 * 60 * 60 * 24 * -7;
    changeCalendarHTML_Date(new Date(prevWeek));
    calendarDatesFillIn(new Date(prevWeek));
  });

  // Next Week Button in Calendar Module
  CalendarHTML_NextWeekBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    weekTracker = weekTracker + daysInWeek;
    let nextWeek = new Date(Date.now() + 1000 * 60 * 60 * 24 * weekTracker);
    changeCalendarHTML_Date(nextWeek);
    calendarDatesFillIn(nextWeek);
    // daysInWeek = daysInWeek - 7;
    // calendarDatesFillIn(TodaysDate, daysInWeek);
  });

  // Next Month Button in Calendar Module
  CalendarHTML_NextMonthBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    weekTracker = weekTracker + 28;
    let nextMonth = new Date(Date.now() + 1000 * 60 * 60 * 24 * weekTracker);
    changeCalendarHTML_Date(nextMonth);
    calendarDatesFillIn(nextMonth);
  });

  CalendarHTML_Date.addEventListener('focusout', function (e) {
    //there is a timezone issue
    let retrievedDate = e.target.value.split('-');
    let dateSelected =
      new Date(
        retrievedDate[0],
        retrievedDate[1] - 1,
        retrievedDate[2]
      ).getTime() +
      1000 * 60 * 60 * 12;
    calendarDatesFillIn(new Date(dateSelected));
  });

  // Calendar filter dropdowns
  document.querySelectorAll('.DropDown').forEach((filterDropDown) => {
    filterDropDown.addEventListener('change', function () {
      let retrievedTasksEvents = document.getElementsByClassName('calTask');
      let allFilterDropDowns = document.querySelectorAll('.DropDown');
      let filterDropDownArray = [...allFilterDropDowns].map((el) => el.value);
      for (key in retrievedTasksEvents) {
        if (retrievedTasksEvents[key].className) {
          let filteredClasses = retrievedTasksEvents[key].className;
          let TasksEventsClassArray = filteredClasses.split(' ');
          let bothArraysEqual = filterDropDownArray.every((r) =>
            TasksEventsClassArray.includes(r)
          );
          if (bothArraysEqual) {
            document
              .getElementById(`${retrievedTasksEvents[key].id}`)
              .classList.remove('hiddenContact');
          } else {
            document
              .getElementById(`${retrievedTasksEvents[key].id}`)
              .classList.add('hiddenContact');
          }
        }
      }
    });
  });

  // Review Button in Side Panel
  reviewContact.addEventListener('click', function () {
    if (_id.value) {
      let reviewDate = TodaysDate.toJSON().slice(0, 10);
      fetch(`${srvrURL}/${_id.value}`, {
        method: 'PATCH',
        body: JSON.stringify({
          LastReviewDate: reviewDate,
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
    if (cntctEmail.value) {
      Email.send({
        SecureToken: SMTP[LastEditedBy.value][0],
        To: cntctEmail.value,
        From: SMTP[LastEditedBy.value][1],
        Subject: emailSubject.value,
        Body: emailBody.value,
      }).then(() => alert(`Email successfully sent to: ${cntctEmail.value}`));
    }
  });

  emailSubject.addEventListener('change', function (selected) {
    emailTemplateHandler();
    emailBody.value = `Hi <strong>${FirstName.value}</strong>,<br><br>
    ${emailTemplates[selected.target.value]}`;
  });

  // Create Event Button in ContactTasks Module
  createEvent.addEventListener('click', function () {
    if (_id.value && contactTasksTextArea.value) {
      getJSON(`${srvrURL}/${_id.value}`).then((data) => {
        let calendarEventsArray = data.data.contact.CalendarEvents
          ? data.data.contact.CalendarEvents
          : [];
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
            PhoneInput = document.getElementById('Phone');
            contactTasksTextArea.value = '';
            loadSidePanel(`${srvrURL}${phonePath}${PhoneInput.value}`);
            // You can possibly use this in the future
            // getJSON(ContactsURL).then((data) => {
            //   console.log('This is after the create button is pressed');
            // });
          });
      });
    }
  });

  // This populates the Side Panel Input Fields following a Contact Search
  contactSearch.addEventListener('change', function (e) {
    loadSidePanel(`${srvrURL}${phonePath}${e.target.value}`);
    removeActiveCalCntct();
    contactSearch.value = '';
  });

  document.querySelectorAll('.eventTemplates').forEach((dynamicEvent) => {
    dynamicEvent.addEventListener('click', function (e) {
      e.preventDefault();
      contactTasksTextArea.value = `${e.target.id.replaceAll('-', ' ')}, `;
    });
  });

  document.querySelectorAll('.dynamicInputs').forEach((dynamicInput) => {
    dynamicInput.addEventListener('change', function (e) {
      const dynamicInputVals = [...dynamicInput].map((el) => el.value);
      let dynamicSelect = document.getElementById(`${dynamicInput.id}Select`);
      // this changes events that are viewable after filtering
      getJSON(`${srvrURL}/${_id.value}`).then((data) => {
        if (data.data.contact.CalendarEvents) {
          calEvnts = data.data.contact.CalendarEvents;
          calEvnts.forEach((calEvent) => {
            let cntctEvents = document.getElementById(`Event${calEvent._id}`);
            dynamicInputVals.forEach((CntctStatus) => {
              cntctEvents.classList.remove(CntctStatus);
              cntctEvents.classList.add(e.target.value);
              if (
                dynamicSelect.value == '' ||
                dynamicSelect.value == 'All' ||
                dynamicSelect.value == e.target.value
              ) {
                cntctEvents.classList.remove('hiddenContact');
              } else {
                cntctEvents.classList.add('hiddenContact');
              }
            });
          });
        }
      });
      // this changes renewals that are viewable after filtering
      if (
        dynamicSelect.value == '' ||
        dynamicSelect.value == 'All' ||
        dynamicSelect.value == this.value
      ) {
        for (let rep = 0; rep < 31; rep++) {
          let cntctCalRnwl = document.getElementById(
            `renewal${_id.value}${rep}`
          );
          if (cntctCalRnwl) {
            cntctCalRnwl.classList.remove('hiddenContact');
            dynamicInputVals.forEach((prevStatus) => {
              cntctCalRnwl.classList.remove(prevStatus);
            });
            cntctCalRnwl.classList.add(Status.value);
          }
        }
      } else {
        for (let rep = 0; rep < 31; rep++) {
          let cntctCalRnwl = document.getElementById(
            `renewal${_id.value}${rep}`
          );
          if (cntctCalRnwl) {
            cntctCalRnwl.classList.add('hiddenContact');
            dynamicInputVals.forEach((prevStatus) => {
              cntctCalRnwl.classList.remove(prevStatus);
            });
            cntctCalRnwl.classList.add(Status.value);
          }
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
