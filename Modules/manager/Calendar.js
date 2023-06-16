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

  getJSON(`${srvrURL}${lastEdittedContactPath}`).then((data) => {
    lastEdittedContact = data.data.contacts[0]._id;
    return lastEdittedContact;
  });
  setInterval(function () {
    getJSON(`${srvrURL}${lastEdittedContactPath}`).then((data) => {
      if (lastEdittedContact == data.data.contacts[0]._id) {
        console.log('nothing has changed');
      } else {
        console.log('everything has changed');
        lastEdittedContact = data.data.contacts[0]._id;

        // retrievedDate = document.getElementById('CalendarDate').value.split('-');
        // console.log(retrievedDate);
        // prevMonth = new Date(retrievedDate[0], retrievedDate[1] - 1, retrievedDate[2]).getTime();
        // console.log(prevMonth);
        // prevMonthHHMM = new Date(prevMonth).setHours(TodaysHour, TodaysMinutes);
        // console.log(prevMonthHHMM);
        // // changeCalendarHTML_Date(new Date(prevMonthHHMM));
        // calendarDatesFillIn(new Date(prevMonthHHMM), document.getElementById('DaysSelect').value);

        return lastEdittedContact;
      }
      // console.log(lastEdittedContact);
      // console.log(document.getElementById(`_id`).value);
    });
  }, 1000);
  console.log(document.getElementById(`_id`).value);
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
