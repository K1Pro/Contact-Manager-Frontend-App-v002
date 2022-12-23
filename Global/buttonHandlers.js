function buttonHandlers() {
  // vvv Start coding here for Calendar Module vvv

  // Previous Month Button in Calendar Module
  CalendarHTML_PrevMonthBtn.addEventListener('click', function () {
    daysInWeek = daysInWeek + 28;
    calendarDatesFillIn(TodaysDate, daysInWeek);
  });

  // Previous Week Button in Calendar Module
  CalendarHTML_PrevWeekBtn.addEventListener('click', function () {
    daysInWeek = daysInWeek + 7;
    calendarDatesFillIn(TodaysDate, daysInWeek);
  });

  // Next Week Button in Calendar Module
  CalendarHTML_NextWeekBtn.addEventListener('click', function () {
    daysInWeek = daysInWeek - 7;
    calendarDatesFillIn(TodaysDate, daysInWeek);
  });

  // Next Month Button in Calendar Module
  CalendarHTML_NextMonthBtn.addEventListener('click', function () {
    daysInWeek = daysInWeek - 28;
    calendarDatesFillIn(TodaysDate, daysInWeek);
  });

  CalendarHTML_Date.addEventListener('change', function (e) {
    console.log(e.target.value);
  });

  renewalsCheckBox.addEventListener('click', function () {
    renewals = document.getElementsByClassName('renewal');
    for (key in renewals) {
      if (renewals[key].className) {
        if (renewals[key].className.includes('hiddenContact')) {
          // console.log(document.getElementById(`${renewals[key].id}`));
          // console.log(renewals[key].className.includes('hiddenContact'));
          // document.getElementById(`${renewals[key].id}`).style.display = 'none';
          document
            .getElementById(`${renewals[key].id}`)
            .classList.remove('hiddenContact');
        } else {
          document
            .getElementById(`${renewals[key].id}`)
            .classList.add('hiddenContact');
        }
        // renewals[key].className.style.display = 'none';
      }
    }
    // renewals.style.display = 'none';
    console.log('its working');
  });
  completedCheckBox.addEventListener('click', function () {
    console.log('its working');
  });
  notCompletedCheckBox.addEventListener('click', function () {
    console.log('its working');
  });

  // Review Button in Side Panel
  reviewContact.addEventListener('click', function () {
    if (_id.value) {
      let reviewDate = TodaysDate.toJSON().slice(0, 10);
      fetch(`${serverURL}/${_id.value}`, {
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
      getJSON(`${serverURL}/${_id.value}`).then((data) => {
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
        fetch(`${serverURL}/${_id.value}`, {
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
            loadSidePanel(PhoneInput.value);
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
    loadSidePanel(e.target.value);
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
