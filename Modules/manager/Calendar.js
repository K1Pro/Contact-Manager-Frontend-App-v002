function calendarModule() {
  // vvv Start coding here for Calendar Module vvv
  CalendarHTML_Date.value = TodaysDate.toJSON().slice(0, 10);
  // populateSelect(LastEditedByS, LastEditedBySelect);
  populateSlctWObj(TasksObj, TasksSelect);
  populateSlctWObj(LastEditedByObj, LastEditedBySelect);
  populateSlctWObj(StatusObj, StatusSelect);
  populateSlctWObj(SourceObj, SourceSelect);
  populateSlctWObj(DaysObj, DaysSelect);
  dayShowHide(document.getElementById('DaysSelect').value);
  // calendarDatesFillIn(TodaysDate, document.getElementById('DaysSelect').value);
  console.log(TodaysDate);
  if (window.innerWidth < smallScrnSize) {
    /*your functions for big screen*/
    dayShowHide(3);
    document.getElementById('DaysSelect').value = 3;
    calendarDatesFillIn(TodaysDate, 3);
    document.getElementById('DaysSelect').classList.add(hiddenContactTag);
  } else {
    dayShowHide(21);
    document.getElementById('DaysSelect').value = 21;
    calendarDatesFillIn(TodaysDate, 21);
    document.getElementById('DaysSelect').classList.remove(hiddenContactTag);
  }

  // Retrieves the last editted contact once page is loaded
  getJSON(`${srvrURL}${lastEdittedContactPath}`).then((data) => {
    lastEdittedContact = data.data.contacts[0].LastEditDate;
    return lastEdittedContact;
  });
  // Detects the last editted contact in an interval and repopulates the calendar upon detection
  setInterval(function () {
    getJSON(`${srvrURL}${lastEdittedContactPath}`).then((data) => {
      if (lastEdittedContact == data.data.contacts[0].LastEditDate) {
        // console.log(`Last edited: ${data.data.contacts[0].LastName}`);
      } else {
        console.log(`Last edited: ${data.data.contacts[0].LastName}`);
        lastEdittedContact = data.data.contacts[0].LastEditDate;
        for (let rep = 0; rep < document.getElementById('DaysSelect').value; rep++) {
          if (document.getElementById(`${dayTag}${rep}`).classList.contains(calSelectedDayTag)) {
            prevMondayLastWeek = document.getElementById(`${dayTag}${rep}`).id.replace('day', '');
            prevMonthHHMM = Date.parse(document.getElementById('CalendarDate').value);
            calendarDatesFillIn(
              new Date(prevMonthHHMM),
              document.getElementById('DaysSelect').value,
              prevMondayLastWeek
            );
            return lastEdittedContact;
          }
        }
      }
    });
  }, 1000);
  // ^^^ End coding here for Calendar Module ^^^
}

/////////////////////////////////////////////////////////////
// vvv This scans if all DOM Elements have been retrieved vvv
const isCalendarElementLoaded = async () => {
  while (DOMElements === undefined) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};
isCalendarElementLoaded().then(() => {
  console.log('retrieved module {calendar}');
  calendarModule();
});
