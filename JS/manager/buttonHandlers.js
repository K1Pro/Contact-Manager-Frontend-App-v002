function buttonHandlers() {
  // vvv Start coding here for Calendar Module vvv

  // Previous Month Button in Calendar Module
  CalendarHTML_PrevMonthBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    removePolicyInfoHighlight();
    retrievedDate = document.getElementById('CalendarDate').value.split('-');
    prevMonth =
      new Date(retrievedDate[0], retrievedDate[1] - 1, retrievedDate[2]).getTime() + 1000 * 60 * 60 * 24 * -28;
    prevMonthHHMM = new Date(prevMonth).setHours(TodaysHour, TodaysMinutes);
    changeCalendarHTML_Date(new Date(prevMonthHHMM));
    calendarDatesFillIn(new Date(prevMonthHHMM), document.getElementById('DaysSelect').value);
  });

  // Previous Week Button in Calendar Module
  CalendarHTML_PrevWeekBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    removePolicyInfoHighlight();
    retrievedDate = document.getElementById('CalendarDate').value.split('-');
    prevWeek = new Date(retrievedDate[0], retrievedDate[1] - 1, retrievedDate[2]).getTime() + 1000 * 60 * 60 * 24 * -7;
    prevWeekHHMM = new Date(prevWeek).setHours(TodaysHour, TodaysMinutes);
    changeCalendarHTML_Date(new Date(prevWeekHHMM));
    calendarDatesFillIn(new Date(prevWeekHHMM), document.getElementById('DaysSelect').value);
  });

  // Next Week Button in Calendar Module
  CalendarHTML_NextWeekBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    removePolicyInfoHighlight();
    retrievedDate = document.getElementById('CalendarDate').value.split('-');
    nextWeek = new Date(retrievedDate[0], retrievedDate[1] - 1, retrievedDate[2]).getTime() + 1000 * 60 * 60 * 24 * 7;
    nextWeekHHMM = new Date(nextWeek).setHours(TodaysHour, TodaysMinutes);
    changeCalendarHTML_Date(new Date(nextWeekHHMM));
    calendarDatesFillIn(new Date(nextWeekHHMM), document.getElementById('DaysSelect').value);
  });

  // Next Month Button in Calendar Module
  CalendarHTML_NextMonthBtn.addEventListener('click', function () {
    abortCalendarDatesFillIn();
    removePolicyInfoHighlight();
    retrievedDate = document.getElementById('CalendarDate').value.split('-');
    nextMonth = new Date(retrievedDate[0], retrievedDate[1] - 1, retrievedDate[2]).getTime() + 1000 * 60 * 60 * 24 * 28;
    nextMonthHHMM = new Date(nextMonth).setHours(TodaysHour, TodaysMinutes);
    changeCalendarHTML_Date(new Date(nextMonthHHMM));
    calendarDatesFillIn(new Date(nextMonthHHMM), document.getElementById('DaysSelect').value);
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
    if (_id.value) {
      reviewDate = new Date().toJSON().slice(0, 10);
      lastEditDate = new Date().toJSON();
      fetch(`${srvrURL}/${_id.value}`, {
        method: 'PATCH',
        body: JSON.stringify({
          LastReviewDate: reviewDate,
          LastEditDate: lastEditDate,
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
        Subject: emailSubject.options[emailSubject.selectedIndex].text,
        Body: emailBody.value,
      }).then(() => snackbar(`Email successfully sent to: ${cntctEmail.value}`));
    }
  });

  emailSubject.addEventListener('change', function (selected) {
    emailTemplateHandler();
    emailBody.value = `Hi <strong>${FirstName.value}</strong>,<br><br>
    ${emailTemplates[selected.target.value]}`;
    console.log('==========================================');
    let cntctEmail = document.getElementById('Email');
    console.log(cntctEmail.value);
    console.log(SMTP[LastEditedBy.value][1]);
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
            PhoneInput = document.getElementById('Phone');
            snackbar(`Event created for ${FirstName.value}`);
            loadSidePanel(`${srvrURL}${phonePath}${PhoneInput.value}`);
            // let retrievedUniqueDays = document.getElementsByClassName('uniqueday');
            // rtrvdCalDateSlctr = document.getElementById('CalendarDate');
            // // This adds an event to the calendar once the event is created, work on this further
            // for (key in retrievedUniqueDays) {
            //   if (retrievedUniqueDays[key].className) {
            //     // prettier-ignore
            //     let fullCalPpltdDate = `${rtrvdCalDateSlctr.value.slice(0, 5)}${retrievedUniqueDays[key].innerHTML.replaceAll('<b>', '').slice(0, 5)}`;
            //     let shortCreatedEvntTime = createEventTime.value.slice(0, 10);
            //     if (shortCreatedEvntTime == fullCalPpltdDate) {
            //       let eventUniqueDay = document.getElementById(retrievedUniqueDays[key].id);
            //       let calCntct = document.createElement('div');
            //       calCntct.classList.add(textlightTag);
            //       calCntct.classList.add(calTaskTag);
            //       calCntct.classList.add(eventTag);
            //       calCntct.classList.add(eNotCmpltdTag);
            //       calCntct.classList.add(activeTag);
            //       calCntct.classList.add(Status.value);
            //       calCntct.classList.add(Source.value);
            //       calCntct.classList.add(EventAuthor.value);
            //       calCntct.textContent = `${LastName.value}`;
            //       eventUniqueDay.appendChild(calCntct);
            //     }
            //   }
            // }
            contactTasksTextArea.value = '';
          });
      });
    } else {
      snackbar('Please enter task description');
    }
  });

  contactSearch.addEventListener('change', function (e) {
    contactSearchChange(e);
  });

  contactSearch.addEventListener('keyup', function (e) {
    contactSearchKeyUp(e);
  });

  document.querySelectorAll('.eventTemplates').forEach((dynamicEvent) => {
    dynamicEvent.addEventListener('click', function (e) {
      e.preventDefault();
      contactTasksTextArea.value = `${e.target.innerHTML.replaceAll('...', ',')} `;
    });
  });

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
      addRecurEvntsToCal(e, `${MM}-${DD}`, 0);
    });
  });

  // there is still one bug with this solution, sometimes after choosing another week in the calendar the task does not show up
  document.querySelectorAll('.monthlyEventInput').forEach((dynamicInput) => {
    dynamicInput.addEventListener('change', function (e) {
      addRecurEvntsToCal(e, e.target.value, 3);
    });
  });

  // Agent Information Input changed calendar event status
  document.querySelectorAll('.dynamicInputs').forEach((dynamicInput) => {
    dynamicInput.addEventListener('click', function (e) {
      oldDynamicInput = e.target.value;
      return oldDynamicInput;
    });
    dynamicInput.addEventListener('change', function (e) {
      let retrievedTasksEvents = document.getElementsByClassName(calTaskTag);
      for (key in retrievedTasksEvents) {
        if (retrievedTasksEvents[key].className && retrievedTasksEvents[key].className.includes(_id.value)) {
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
