console.log('retrieved all global functions');
///////////////////////////////////////////////

// getJSON(ContactsURL).then((data) => {
//   // Try to find unique phone numbers
//   dbArray = Object.entries(data.data.contacts);
//   let mySet = new Set();
//   let uniquePhone;
//   let contactPhone;
//   dbArray.forEach(element => {
//     contactPhone = element[1].Phone
//     uniquePhone = mySet.has(contactPhone) 
//     if (!uniquePhone) {
//       mySet.add(contactPhone)
//       // console.log(contactPhone)
//     } else {
//       console.log(contactPhone)
//     }
//     });
//   console.log(mySet)
//   console.log(dbArray)
//   return dbArray
// });

// async function asyncCall() {
//   console.log('calling');
//   const result = await resolveAfter2Seconds();
//   console.log(result);
//   // expected output: "resolved"
// }

getJSON(ContactsURL).then((data) => {
  // Populates a dataset into the main search bar
  for (const [key, value] of Object.entries(data.data.contacts)) {
    let FullName = `${value.FirstName} ${value.LastName}`;
    let searchDataSet = document.createElement('option');
    searchDataSet.label = FullName;
    searchDataSet.innerHTML = value.Phone;
    contactsList.appendChild(searchDataSet);
  }
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
  }
  getJSON(ContactsURL).then((data) => {
    
    contactsDB = data.data.contacts;
    let uniqueDailyContacts = new Set();
    // for (let rep = 0; rep < 28; rep++) {
    //   console.log(UniqueDays[rep].dataset.renewalday);
    // }
    // Populates calendar with policies based upon all renew dates
    for (let contact in contactsDB) {
      for (const [key, value] of Object.entries(contactsDB[contact])) {
        // console.log(value); ************CHECK HERE*************************
        for (let rep = 0; rep < 28; rep++) {
          if (
            value.includes(UniqueDays[rep].dataset.renewalday) &&
            key.includes('RenewDate')
          ) {
            let uniqueDailyContactSet = uniqueDailyContacts.has(
              `${contactsDB[contact].LastName}-${UniqueDays[rep].dataset.renewalday}`
            );
            uniqueDailyContacts.add(
              `${contactsDB[contact].LastName}-${UniqueDays[rep].dataset.renewalday}`
            );
            if (!uniqueDailyContactSet) {
              let p = document.createElement('div');
              p.textContent = `${contactsDB[contact].LastName}`;
              p.classList.add('notCompleted');
              p.classList.add('text-light');
              // p.classList.add('font-weight-bold');
              // prettier-ignore
              document.querySelector(`[data-renewalday="${UniqueDays[rep].dataset.renewalday}"]`).appendChild(p);
            }
          }
          // if (
          //   value.includes(node.dataset.day) &&
          //   key.includes('CalendarEvents')
          // ) {
          //   //work on this here
          // }
          }
      }
    }
  });
}

function initialCalendarDatesFillIn(chosenDate, chosenWeek) {
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
  }
  getJSON(ContactsURL).then((data) => {
    
    contactsDB = data.data.contacts;
    let uniqueDailyContacts = new Set();
    // for (let rep = 0; rep < 28; rep++) {
    //   console.log(UniqueDays[rep].dataset.renewalday);
    // }
    // Populates calendar with policies based upon all renew dates
    for (let contact in contactsDB) {
      for (const [key, value] of Object.entries(contactsDB[contact])) {
        // console.log(value); ************CHECK HERE*************************
        for (let rep = 0; rep < 28; rep++) {
          if (
            value.includes(UniqueDays[rep].dataset.renewalday) &&
            key.includes('RenewDate')
          ) {
            let uniqueDailyContactSet = uniqueDailyContacts.has(
              `${contactsDB[contact].LastName}-${UniqueDays[rep].dataset.renewalday}`
            );
            uniqueDailyContacts.add(
              `${contactsDB[contact].LastName}-${UniqueDays[rep].dataset.renewalday}`
            );
            if (!uniqueDailyContactSet) {
              let p = document.createElement('div');
              p.textContent = `${contactsDB[contact].LastName}`;
              p.classList.add('notCompleted');
              p.classList.add('text-light');
              // p.classList.add('font-weight-bold');
              // prettier-ignore
              document.querySelector(`[data-renewalday="${UniqueDays[rep].dataset.renewalday}"]`).appendChild(p);
            }
          }
          // if (
          //   value.includes(node.dataset.day) &&
          //   key.includes('CalendarEvents')
          // ) {
          //   //work on this here
          // }
          }
      }
    }
  });
}
