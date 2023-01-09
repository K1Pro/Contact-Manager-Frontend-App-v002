function buttonHandlers() {
  // vvv Start coding here for Calendar Module vvv

  // Previous Month Button in Calendar Module
  CalendarHTML_PrevMonthBtn.addEventListener('click', function () {
    weekTracker = weekTracker - 28;
    let prevMonth = new Date(Date.now() + 1000 * 60 * 60 * 24 * weekTracker);
    changeCalendarHTML_Date(prevMonth);
    calendarDatesFillIn(prevMonth);
  });

  // Previous Week Button in Calendar Module
  CalendarHTML_PrevWeekBtn.addEventListener('click', function () {
    weekTracker = weekTracker - daysInWeek;
    let prevWeek = new Date(Date.now() + 1000 * 60 * 60 * 24 * weekTracker);
    // daysInWeek = daysInWeek + 7;
    changeCalendarHTML_Date(prevWeek);
    calendarDatesFillIn(prevWeek);
  });

  // Next Week Button in Calendar Module
  CalendarHTML_NextWeekBtn.addEventListener('click', function () {
    weekTracker = weekTracker + daysInWeek;
    let nextWeek = new Date(Date.now() + 1000 * 60 * 60 * 24 * weekTracker);
    changeCalendarHTML_Date(nextWeek);
    calendarDatesFillIn(nextWeek);
    // daysInWeek = daysInWeek - 7;
    // calendarDatesFillIn(TodaysDate, daysInWeek);
  });

  // Next Month Button in Calendar Module
  CalendarHTML_NextMonthBtn.addEventListener('click', function () {
    weekTracker = weekTracker + 28;
    let nextMonth = new Date(Date.now() + 1000 * 60 * 60 * 24 * weekTracker);
    changeCalendarHTML_Date(nextMonth);
    calendarDatesFillIn(nextMonth);
  });

  CalendarHTML_Date.addEventListener('focusout', function (e) {
    let checktime = new Date(e.target.value);
    calendarDatesFillIn(checktime);
  });

  renewalsCheckBox.addEventListener('click', function () {
    renewals = document.getElementsByClassName('renewal');
    for (key in renewals) {
      if (renewals[key].className) {
        if (renewals[key].className.includes('hiddenContact')) {
          document
            .getElementById(`${renewals[key].id}`)
            .classList.remove('hiddenContact');
        } else {
          document
            .getElementById(`${renewals[key].id}`)
            .classList.add('hiddenContact');
        }
      }
    }
    console.log('its working');
  });

  completedCheckBox.addEventListener('click', function () {
    completed = document.getElementsByClassName('Completed');
    for (key in completed) {
      if (completed[key].className) {
        if (completed[key].className.includes('hiddenContact')) {
          document
            .getElementById(`${completed[key].id}`)
            .classList.remove('hiddenContact');
        } else {
          document
            .getElementById(`${completed[key].id}`)
            .classList.add('hiddenContact');
        }
      }
    }
    console.log('its working');
  });

  notCompletedCheckBox.addEventListener('click', function () {
    notCompleted = document.getElementsByClassName('notCompleted');
    for (key in notCompleted) {
      if (notCompleted[key].className) {
        if (notCompleted[key].className.includes('hiddenContact')) {
          document
            .getElementById(`${notCompleted[key].id}`)
            .classList.remove('hiddenContact');
        } else {
          document
            .getElementById(`${notCompleted[key].id}`)
            .classList.add('hiddenContact');
        }
      }
    }
    console.log('its working');
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
            // id: _id.value,
            // EventID: calendarEventsArray.length + 1,
            // Date: createEventTime.value,
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
            // This creates a key-value pair to be patached, ex: "FirstName": Bart
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
    contactSearch.value = '';
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
