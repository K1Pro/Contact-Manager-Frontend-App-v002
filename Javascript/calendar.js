function calendarModule() {
  // vvv Start coding here for Calendar Module vvv
  CalendarHTML_Date.innerHTML = TodaysDate.toJSON().slice(0, 10);
  initialCalendarDatesFillIn(TodaysDate, daysInWeek);

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
