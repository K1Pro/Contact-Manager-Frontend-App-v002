function calendarModule() {
  // vvv Start coding here for Calendar Module vvv
  CalendarHTML_Date.value = TodaysDate.toJSON().slice(0, 10);
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
    localStorage.getItem(`DaysSelect`)
      ? (daysFirstLoaded = localStorage.getItem(`DaysSelect`))
      : (daysFirstLoaded = 21);

    dayShowHide(daysFirstLoaded);
    document.getElementById('DaysSelect').value = daysFirstLoaded;
    calendarDatesFillIn(TodaysDate, daysFirstLoaded);
    document.getElementById('DaysSelect').classList.remove(hiddenContactTag);
  }
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
