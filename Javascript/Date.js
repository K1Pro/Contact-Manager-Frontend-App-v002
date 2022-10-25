const myInterval = setInterval(myTimer, 50);
function myTimer() {
  let pageElements = document.getElementsByTagName('*');
  if ('CalendarDate' in pageElements) {
    console.log('CalendarDate found');
    clearInterval(myInterval);

    let TodaysDate = new Date();
    // prettier-ignore
    const bartsMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',];
    // prettier-ignore
    const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',];

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
      // targetDate.setDate(BartDate.getDate() - dayCounter + rep);
      // console.log(targetDate);
      // console.log(BartDate.getDay());
      // console.log(dayCounter);
      // dayCounterTwo = BartDate.getDate() - dayCounter + rep;
      // console.log(dayCounterTwo);
      // // console.log(`day${rep}`);
      // document.getElementById(`day${rep}`).innerHTML = BartDate.toJSON().slice(
      //   8,
      //   10
      // );
      // .addEventListener('change', function (e) {
      //   let ContactFieldID = this.id;
      //   let ContactFieldValue = this.value;
      //   updateContactInfo(id.value, ContactFieldID, ContactFieldValue);
      // });
      // }
    }
  }
}
