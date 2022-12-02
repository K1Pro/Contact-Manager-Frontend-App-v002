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

  // Contact Search in Side Panel Module
  contactSearch.addEventListener('change', function (e) {
    ContactsURL = `http://192.168.64.9:8000/api/v2/contacts?Phone=${e.target.value}`;
    getJSON(ContactsURL).then((data) => {
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
