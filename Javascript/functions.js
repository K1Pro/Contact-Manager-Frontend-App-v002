console.log('retrieved all global functions');
///////////////////////////////////////////////
getJSON(ContactsURL).then((data) => {
  // this populates a dataset into the main search bar
  for (const [key, value] of Object.entries(data.data.contacts)) {
    let FullName = `${value.FirstName} ${value.LastName}`;
    let option = document.createElement('option');
    option.label = FullName;
    option.innerHTML = value.Phone;
    // option.style.display = 'none'; Doesnt get rid of MongoDB IDs from showing in autocomplete dropdown
    contactsList.appendChild(option);
  }
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
      let Policy1RenewDate = `${value.Policy1RenewDate}`;
      Policy1RenewDate = Policy1RenewDate.slice(5, 10);
      // prettier-ignore
      if (document.querySelector(`[data-day="${Policy1RenewDate}"]`)) {
        let p = document.createElement('div');
        p.textContent = `${value.LastName}`;
        p.classList.add('notCompleted');
        p.classList.add('text-light');
        // prettier-ignore
        document.querySelector(`[data-day="${Policy1RenewDate}"]`).appendChild(p);
      }
    }
    // let mySpans = document.getElementsByClassName('day-hover');
    // for (let i = 0; i < mySpans.length; i++) {
    //   if (mySpans[i].innerHTML == '11-18') {
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
