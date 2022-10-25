const myInterval = setInterval(myTimer, 50);
function myTimer() {
  let pageElements = document.getElementsByTagName('*');
  if ('CalendarDate' in pageElements) {
    console.log('CalendarDate found');
    clearInterval(myInterval);

    let TodaysDate = new Date();

    const CalendarHTML_Date = document.getElementById('CalendarDate');
    CalendarHTML_Date.innerHTML = TodaysDate.toJSON().slice(0, 10);
    console.log(CalendarHTML_Date.innerHTML);

    for (let rep = 1; rep < 29; rep++) {
      let noOfDaysToPrevMonday = 0 - TodaysDate.getDay() - 7 + rep;
      let CalendarDates = new Date(
        Date.now() +
          1000 /*sec*/ *
            60 /*min*/ *
            60 /*hour*/ *
            24 /*day*/ *
            noOfDaysToPrevMonday /*# of days*/
      );
      console.log(CalendarDates);
      document.getElementById(`day${rep}`).innerHTML =
        CalendarDates.toJSON().slice(5, 10);
    }
  }
}
