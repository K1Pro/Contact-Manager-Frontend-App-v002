console.log('retrieved all global functions');
///////////////////////////////////////////////
getJSON(ContactsURL).then((data) => {
  console.log(data.data.contacts[0].Policy1RenewDay);
  return data;
});

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
    // prettier-ignore
    document.getElementById(`day${rep}`).setAttribute('data-day', `${CalendarDates.toJSON().slice(5, 10)}`);
    // prettier-ignore
    document.getElementById(`day${rep}`).innerHTML = `${CalendarDates.toJSON().slice(5, 10)}`;
    document.getElementById(`day${rep}`).addEventListener('click', () => {
      CalendarHTML_Date.innerHTML = `${CalendarDates.toJSON().slice(0, 10)}`;
    });
  }

  getJSON(ContactsURL).then((data) => {
    for (const [key, value] of Object.entries(data.data.contacts)) {
      let Policy1RenewDate = `${value.Policy1RenewMonth}-${value.Policy1RenewDay}`;
      // prettier-ignore
      if (document.querySelector(`[data-day="${value.Policy1RenewMonth}-${value.Policy1RenewDay}"]`)) {
        let p = document.createElement('div');
        p.textContent = `${value.LastName}`;
        p.classList.add("notCompleted");
        p.classList.add("text-light");
        // prettier-ignore
        document.querySelector(`[data-day="${value.Policy1RenewMonth}-${value.Policy1RenewDay}"]`).appendChild(p);
      }
    }
    // let mySpans = document.getElementsByClassName('day-hover');
    // for (let i = 0; i < mySpans.length; i++) {
    //   if (mySpans[i].innerHTML == '11-18') {

    //   }
    // }
    // for (let rep = 1; rep < 29; rep++) {
    //   let p = document.createElement('div');
    //   let b = document.createElement('div');
    //   document.getElementById(`day${rep}`).appendChild(p);
    //   document.getElementById(`day${rep}`).appendChild(b);
    // }
    // console.log(data.data.contacts);
  });
}

async function getJSON(url, errorMsg = 'Something went wrong') {
  try {
    const response = await fetch(url);
    const contactData = await response.json();
    return contactData;
  } catch (error) {
    console.log(errorMsg);
  }
}
