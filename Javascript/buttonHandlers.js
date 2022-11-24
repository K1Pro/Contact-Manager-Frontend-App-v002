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
  contactSearch.addEventListener('focusin', function (e) {
    getJSON(ContactsURL).then((data) => {
      for (const [key, value] of Object.entries(data.data.contacts)) {
        let FullName = `${value.FirstName} ${value.LastName}`;
        let option = document.createElement('option');
        option.value = FullName;
        contactsList.appendChild(option);
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
