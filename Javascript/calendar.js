const myInterval = setInterval(myTimer, 50);
function myTimer() {
  let pageElements = document.getElementsByTagName('*');
  if ('CalendarDate' in pageElements) {
    console.log('CalendarDate found');
    clearInterval(myInterval);

    // vvv Start coding here for Calendar Module vvv
    let daysInWeek = 7;
    let TodaysDate = new Date();
    const CalendarHTML_Date = document.getElementById('CalendarDate');
    const CalendarHTML_PrevBtn = document.getElementById('CalendarPrev');
    const CalendarHTML_NextBtn = document.getElementById('CalendarNext');

    // Previous Week Button in Calendar Module
    CalendarHTML_PrevBtn.addEventListener('click', function () {
      daysInWeek = daysInWeek + 7;
      calendarDatesFillIn(TodaysDate, daysInWeek);
    });

    // Next Week Button in Calendar Module
    CalendarHTML_NextBtn.addEventListener('click', function () {
      daysInWeek = daysInWeek - 7;
      calendarDatesFillIn(TodaysDate, daysInWeek);
    });

    CalendarHTML_Date.innerHTML = TodaysDate.toJSON().slice(0, 10);

    function calendarDatesFillIn(chosenDate, chosenWeek) {
      for (let rep = 1; rep < 29; rep++) {
        document
          .getElementById(`day${rep}`)
          .classList.remove('calendarCurrentDay');

        let noOfDaysToPrevMonday = 0 - chosenDate.getDay() - chosenWeek + rep;

        let CalendarDates = new Date(
          Date.now() +
            1000 /*sec*/ *
              60 /*min*/ *
              60 /*hour*/ *
              24 /*day*/ *
              noOfDaysToPrevMonday /*# of days*/
        );
        // This highlights the selected date, defaults to today's date
        if (
          CalendarDates.toJSON().slice(0, 10) ==
          chosenDate.toJSON().slice(0, 10)
        ) {
          document
            .getElementById(`day${rep}`)
            .classList.add('calendarCurrentDay');
        }
        // This fills in the individual calendar date days
        document.getElementById(`day${rep}`).innerHTML =
          CalendarDates.toJSON().slice(5, 10);
      }
    }
    calendarDatesFillIn(TodaysDate, daysInWeek);
  }
  // ^^^ End coding here for Calendar Module ^^^
}
