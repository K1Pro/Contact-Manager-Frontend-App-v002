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
    let RenewalDates = new Date(
      Date.now() +
        1000 /*sec*/ *
          60 /*min*/ *
          60 /*hour*/ *
          24 /*day*/ *
          (noOfDaysToPrevMonday + 28) /*# of days*/
    );
    // Highlights the selected date, defaults to today's date
    // prettier-ignore
    if (CalendarDates.toJSON().slice(0, 10) == chosenDate.toJSON().slice(0, 10)) document.getElementById(`day${rep}`).classList.add('calendarCurrentDay');
    // This fills in the individual calendar date days
    // prettier-ignore
    document.getElementById(`day${rep}`).setAttribute('data-day', `${CalendarDates.toJSON().slice(5, 10)}`);
    // prettier-ignore
    document.getElementById(`day${rep}`).setAttribute('data-renewalday', `${RenewalDates.toJSON().slice(5, 10)}`);
    // prettier-ignore
    document.getElementById(`day${rep}`).innerHTML = `${CalendarDates.toJSON().slice(5, 10)}`;
    // prettier-ignore
    document.getElementById(`day${rep}`).addEventListener('click', () => {CalendarHTML_Date.innerHTML = `${CalendarDates.toJSON().slice(0, 10)}`;
    });
    getJSON(`${RenewalURL}${RenewalDates.toJSON().slice(5, 10)}`).then(
      (data) => {
        let renewalContact;
        if (data.data.contacts.length) {
          renewalContact = data.data.contacts;
          renewalContact.map((x) => {
            let p = document.createElement('div');
            p.textContent = `${x.LastName}`;
            p.classList.add('notCompleted');
            p.classList.add('text-light');
            // p.classList.add('font-weight-bold');
            // prettier-ignore
            document.querySelector(`[data-renewalday="${RenewalDates.toJSON().slice(5, 10)}"]`).appendChild(p);
          });
        }
      }
    );
  }
}
