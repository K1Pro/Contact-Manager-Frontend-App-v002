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
    console.log(dbArray);
    daysInWeek = daysInWeek - 28;
    calendarDatesFillIn(TodaysDate, daysInWeek);
  });

  // Create Event Button in ContactTasks Module
  createEvent.addEventListener('click', function () {
    if (_id.value && contactTasksTextArea.value) {
      ContactsURL = `http://192.168.64.9:8000/api/v2/contacts/${_id.value}`;
      getJSON(ContactsURL).then((data) => {
        let calendarEventsArray = data.data.contact.CalendarEvents
          ? data.data.contact.CalendarEvents
          : [];
        let obj = {};
        calendarEventsArray.push(
          (obj = {
            id: _id.value,
            EventID: calendarEventsArray.length + 1,
            Date: createEventTime.value,
            Description: contactTasksTextArea.value,
          })
        );
        console.log(calendarEventsArray);
        console.log(obj);
        fetch(`${ContactsPatchURL}/${_id.value}`, {
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
            getJSON(ContactsURL).then((data) => {
              console.log('This is after the create button is pressed');
            });
          });
      });
    }
  });

  // This populates the Side Panel Input Fields following a Contact Search
  contactSearch.addEventListener('change', function (e) {
    ContactsURL = `http://192.168.64.9:8000/api/v2/contacts?Phone=${e.target.value}`;
    getJSON(ContactsURL).then((data) => {
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
      }
      return data;
    });
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
