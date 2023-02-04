function buttonHandlers() {
  // vvv Start coding here for Calendar Module vvv

  // Previous Month Button in Calendar Module
  CalendarHTML_PrevMonthBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    removePolicyInfoHighlight();
    retrievedDate = document.getElementById('CalendarDate').value.split('-');
    prevMonth =
      new Date(
        retrievedDate[0],
        retrievedDate[1] - 1,
        retrievedDate[2]
      ).getTime() +
      1000 * 60 * 60 * 24 * -28;
    prevMonthHHMM = new Date(prevMonth).setHours(TodaysHour, TodaysMinutes);
    changeCalendarHTML_Date(new Date(prevMonthHHMM));
    calendarDatesFillIn(new Date(prevMonthHHMM));
  });

  // Previous Week Button in Calendar Module
  CalendarHTML_PrevWeekBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    removePolicyInfoHighlight();
    retrievedDate = document.getElementById('CalendarDate').value.split('-');
    prevWeek =
      new Date(
        retrievedDate[0],
        retrievedDate[1] - 1,
        retrievedDate[2]
      ).getTime() +
      1000 * 60 * 60 * 24 * -7;
    prevWeekHHMM = new Date(prevWeek).setHours(TodaysHour, TodaysMinutes);
    changeCalendarHTML_Date(new Date(prevWeekHHMM));
    calendarDatesFillIn(new Date(prevWeekHHMM));
  });

  // Next Week Button in Calendar Module
  CalendarHTML_NextWeekBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    removePolicyInfoHighlight();
    retrievedDate = document.getElementById('CalendarDate').value.split('-');
    nextWeek =
      new Date(
        retrievedDate[0],
        retrievedDate[1] - 1,
        retrievedDate[2]
      ).getTime() +
      1000 * 60 * 60 * 24 * 7;
    nextWeekHHMM = new Date(nextWeek).setHours(TodaysHour, TodaysMinutes);
    changeCalendarHTML_Date(new Date(nextWeekHHMM));
    calendarDatesFillIn(new Date(nextWeekHHMM));
  });

  // Next Month Button in Calendar Module
  CalendarHTML_NextMonthBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    removePolicyInfoHighlight();
    retrievedDate = document.getElementById('CalendarDate').value.split('-');
    nextMonth =
      new Date(
        retrievedDate[0],
        retrievedDate[1] - 1,
        retrievedDate[2]
      ).getTime() +
      1000 * 60 * 60 * 24 * 28;
    nextMonthHHMM = new Date(nextMonth).setHours(TodaysHour, TodaysMinutes);
    changeCalendarHTML_Date(new Date(nextMonthHHMM));
    calendarDatesFillIn(new Date(nextMonthHHMM));
  });

  Status.addEventListener('change', function (e) {
    if (e.target.value == 'Do-Not-Renew') {
      console.log('Hi there, status was changed');
      Policy1RenewDate.value = '';
      Policy2RenewDate.value = '';
      Policy3RenewDate.value = '';
      Policy4RenewDate.value = '';
      fetch(`${srvrURL}${deleteEmptyFieldPath}${_id.value}`, {
        method: 'DELETE',
        body: JSON.stringify({
          Policy1RenewMMDD: '',
          Policy2RenewMMDD: '',
          Policy3RenewMMDD: '',
          Policy4RenewMMDD: '',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .catch((error) => {
          alert('Please enter a unique phone number');
        });
      snackbar(`Updated ${FirstName.value} placed on "Do Not Renew" List`);
      contactEditDate();
    }
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
        new Date(
          retrievedDate[0],
          retrievedDate[1] - 1,
          retrievedDate[2]
        ).getTime() +
        1000 * 60 * 60 * 12;
      calendarDatesFillIn(new Date(dateSelected));
    }
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

  DaysSelect.addEventListener('change', function (e) {
    daysSelected = e.target.value;
    for (let rep = 0; rep < 28; rep++) {
      deleteCalRow(rep);
      if (rep < daysSelected) {
        document.getElementById(`day0`).classList.remove(hiddenContactTag);
        document
          .getElementById(`${dayTag}${rep}`)
          .classList.remove(hiddenContactTag);
        if (
          rep == 5 ||
          rep == 6 ||
          rep == 12 ||
          rep == 13 ||
          rep == 19 ||
          rep == 20 ||
          rep == 26 ||
          rep == 27
        ) {
          document
            .getElementById(`${dayTag}${rep}`)
            .classList.add(`SatSun${daysSelected}`);
        } else {
          document
            .getElementById(`${dayTag}${rep}`)
            .classList.add(`Day${daysSelected}`);
        }
      } else if (daysSelected == 0) {
        deleteCalRow(rep); // Deletes Day0 once
        document.querySelectorAll('.uniqueday').forEach((weekdays) => {
          uniqueday = weekdays.className;
          if (uniqueday.includes(calSelectedDayTag)) {
            document
              .getElementById(weekdays.id)
              .classList.remove('hiddenContact');
            document
              .getElementById(weekdays.id)
              .classList.add(`Day${daysSelected}`);
          }
        });
      }
    }
  });

  contactTasksTextArea.addEventListener('focus', () => {
    cntctTasksTxtAreaList.classList.remove(hiddenContactTag);
  });
  contactTasksTextArea.addEventListener('keydown', () => {
    cntctTasksTxtAreaList.classList.add(hiddenContactTag);
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
            snackbar(`Event created for ${FirstName.value}`);
            loadSidePanel(`${srvrURL}${phonePath}${PhoneInput.value}`);
            let retrievedUniqueDays =
              document.getElementsByClassName('uniqueday');
            rtrvdCalDateSlctr = document.getElementById('CalendarDate');
            // This adds an event to the calendar once the event is created, work on this further
            for (key in retrievedUniqueDays) {
              if (retrievedUniqueDays[key].className) {
                // prettier-ignore
                let fullCalPpltdDate = `${rtrvdCalDateSlctr.value.slice(0, 5)}${retrievedUniqueDays[key].innerHTML.slice(0, 5)}`;
                let shortCreatedEvntTime = createEventTime.value.slice(0, 10);
                if (shortCreatedEvntTime == fullCalPpltdDate) {
                  let eventUniqueDay = document.getElementById(
                    retrievedUniqueDays[key].id
                  );
                  let calCntct = document.createElement('div');
                  calCntct.classList.add(textlightTag);
                  calCntct.classList.add(calTaskTag);
                  calCntct.classList.add(eventTag);
                  calCntct.classList.add(eNotCompletedTag);
                  calCntct.classList.add(activeTag);
                  calCntct.classList.add(Status.value);
                  calCntct.classList.add(Source.value);
                  calCntct.classList.add(EventAuthor.value);
                  calCntct.textContent = `${LastName.value}`;
                  eventUniqueDay.appendChild(calCntct);
                }
              }
            }
            contactTasksTextArea.value = '';
          });
      });
    }
  });

  // This populates the Side Panel Input Fields following a Contact Search
  contactSearch.addEventListener('change', function (e) {
    let searchInput = e.target.value.toLowerCase();
    // phonenumber(e.target.value);
    if (e.target.value) {
      matchDatalist(searchInput);
    }
  });

  //REFACTOR AND CLEAN THIS UP A BIT
  contactSearch.addEventListener('keyup', function (e) {
    if (e.key !== 'Backspace') {
      let searchInput = e.target.value.toLowerCase();
      // checks a phone number for example 773
      let phNoBegin = /^\d{3}$/;
      // checks a phone number for example 773-853
      let phNoMiddle = /^\+?([0-9]{3})\)?[-]?([0-9]{3})$/;
      // checks a phone number for example 773-853-2731
      let phNoLast = /^\+?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
      if (searchInput.match(phNoBegin)) {
        this.value = `${searchInput}-`;
      } else if (searchInput.match(phNoMiddle)) {
        this.value = `${searchInput}-`;
      } else if (searchInput.match(phNoLast)) {
        matchDatalist(searchInput);
        contactSearch.blur();
      }
      if (e.key === 'Enter') {
        matchDatalist(searchInput);
        contactSearch.blur();
      }
    }
  });

  document.querySelectorAll('.eventTemplates').forEach((dynamicEvent) => {
    dynamicEvent.addEventListener('click', function (e) {
      e.preventDefault();
      contactTasksTextArea.value = `${e.target.innerHTML.replaceAll(
        '...[Insert text here]',
        ','
      )} `;
    });
  });

  document.querySelectorAll('#RecurEvents').forEach((recurEvents) => {
    recurEvents.addEventListener('click', function (e) {
      console.log(e.target.id);
      // if (_id.value && contactTasksTextArea.value) { use this later
      if (_id.value) {
        getJSON(`${srvrURL}/${_id.value}`).then((data) => {
          console.log(data);
        });
      }
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
            if (cntctEvents) {
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
            }
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
