console.log('retrieved all global functions');
///////////////////////////////////////////////
getJSON(ContactsURL).then((data) => {
  // Populates a dataset into the main search bar
  for (const [key, value] of Object.entries(data.data.contacts)) {
    let FullName = `${value.FirstName} ${value.LastName}`;
    let searchDataSet = document.createElement('option');
    searchDataSet.label = FullName;
    searchDataSet.innerHTML = value.Phone;
    contactsList.appendChild(searchDataSet);
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
    // Highlights the selected date, defaults to today's date
    // prettier-ignore
    if (CalendarDates.toJSON().slice(0, 10) == chosenDate.toJSON().slice(0, 10)) document.getElementById(`day${rep}`).classList.add('calendarCurrentDay');
    // This fills in the individual calendar date days
    // prettier-ignore
    document.getElementById(`day${rep}`).setAttribute('data-day', `${CalendarDates.toJSON().slice(5, 10)}`);

    // prettier-ignore
    document.getElementById(`day${rep}`).innerHTML = `${CalendarDates.toJSON().slice(5, 10)}`;
    // let p = document.createElement('div');
    // p.classList.add('spinner-grow');
    // document.getElementById(`day${rep}`).appendChild(p);
    // <div class="spinner-grow text-dark"></div>
    // prettier-ignore
    document.getElementById(`day${rep}`).addEventListener('click', () => {CalendarHTML_Date.innerHTML = `${CalendarDates.toJSON().slice(0, 10)}`;
    });
  }

  getJSON(ContactsURL).then((data) => {
    contactsDB = data.data.contacts;
    let uniqueDailyContacts = new Set();
    // Populates calendar with policies based upon renew date 1
    for (let contact in contactsDB) {
      for (const [key, value] of Object.entries(contactsDB[contact])) {
        CalendarDates.forEach(function (node) {
          if (node.dataset.day) {
            if (value.includes(node.dataset.day) && key.includes('RenewDate')) {
              let uniqueDailyContactSet = uniqueDailyContacts.has(
                `${contactsDB[contact].LastName}-${node.dataset.day}`
              );
              uniqueDailyContacts.add(
                `${contactsDB[contact].LastName}-${node.dataset.day}`
              );
              if (!uniqueDailyContactSet) {
                let p = document.createElement('div');
                p.textContent = `${contactsDB[contact].LastName}`;
                p.classList.add('notCompleted');
                p.classList.add('text-light');
                // prettier-ignore
                document.querySelector(`[data-day="${node.dataset.day}"]`).appendChild(p);
              }
            }
          }
        });
      }
    }
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
