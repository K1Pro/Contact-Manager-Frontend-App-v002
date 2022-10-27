console.log('retrieved all global functions');
///////////////////////////////////////////////

function calendarDatesFillIn(chosenDate, chosenWeek) {
  for (let rep = 1; rep < 29; rep++) {
    document.getElementById(`day${rep}`).classList.remove('calendarCurrentDay');

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
      CalendarDates.toJSON().slice(0, 10) == chosenDate.toJSON().slice(0, 10)
    ) {
      document.getElementById(`day${rep}`).classList.add('calendarCurrentDay');
    }
    // This fills in the individual calendar date days
    document.getElementById(`day${rep}`).innerHTML =
      CalendarDates.toJSON().slice(5, 10);
  }
}
