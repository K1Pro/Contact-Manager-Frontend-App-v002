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
  calendarDatesFillIn(TodaysDate);
  if (window.innerWidth < 768) {
    /*your functions for big screen*/
    console.log('smallscreen');
    document.getElementById('DaysSelect').value = 0;
    document.getElementById('DaysSelect').dispatchEvent(new Event('change'));
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
