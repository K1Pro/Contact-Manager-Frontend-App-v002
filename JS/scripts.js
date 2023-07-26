console.log('retrieved all global scripts');
///////////////////////////////////////////////////////////
//// vvv This scans for all separate HTML Modules vvv /////
async function isElementLoaded(selector) {
  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
}
///////////////////////////////////////////////////////////
///////////// vvv Compare Function vvv ////////////////////
function compare(a = 0, b = 0) {
  if (a[sortKey] < b[sortKey]) {
    return 1 * sortAscDesc;
  }
  if (a[sortKey] > b[sortKey]) {
    return -1 * sortAscDesc;
  }
  return 0;
}
///////////////////////////////////////////////////////////
// vvv Function when calendar in selector is changed vvv //
function changeCalendarHTML_Date(chosenDate) {
  CalendarHTML_Date.value = `${chosenDate.toJSON().slice(0, 10)}`;
}
///////////////////////////////////////////////////////////
/// vvv Checks if something doesnt have a remainder vvv ///
function isInt(n) {
  return n % 1 === 0;
}
///////////////////////////////////////////////////////////
////////////// vvv Updates contact tasks vvv //////////////
function updateContactTasks(contactTask, inputChanged) {
  fetch(`${srvrURL}${updateEventPath}${contactTask.UID}`, {
    method: 'PATCH',
    body: JSON.stringify({
      _id: contactTask.UID,
      EventAuthor: contactTask.Author.value,
      DayOfWeek: contactTask.Dated.value.slice(8, 10), //need to compute this
      DayOfMonth: contactTask.Dated.value.slice(8, 10),
      DayOfYear: contactTask.Dated.value.slice(5, 10),
      DateYYYYMMDD: contactTask.Dated.value.slice(0, 10),
      DateHHMMSS: contactTask.Dated.value.slice(10, 16),
      Description: contactTask.Description.value,
      Completed: contactTask.CheckBox.checked,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then(() => {
      if (inputChanged.target.type == 'checkbox') {
        if (inputChanged.target.checked == true) {
          let checkCompletion = document.getElementById(`Event${contactTask.UID}`);
          if (checkCompletion) checkCompletion.setAttribute('class', `${eCmpltdTag} ${textlightTag} ${activeTag}`);
        } else {
          let checkCompletion = document.getElementById(`Event${contactTask.UID}`);
          if (checkCompletion) checkCompletion.setAttribute('class', `${eNotCmpltdTag} ${textlightTag} ${activeTag}`);
        }
      }
      snackbar(`Event updated for ${FirstName.value}`);
      contactEditDate();
    });
}
///////////////////////////////////////////////////////////
////////// vvv Populates searchbar dropdown vvv ///////////
function populateSearchBarDropDownFunction(data, searchQuery) {
  contactSearchList.innerHTML = '';
  rep = 0;
  uniqueIDSet = new Set();
  data.data.contacts.forEach((contact) => {
    // console.log(data.data.contacts);
    for (const info in contact) {
      if (
        contact[info]
          .replaceAll(' ', '')
          .replaceAll('-', '')
          .replaceAll('(', '')
          .replaceAll(')', '')
          .toLowerCase()
          .includes(
            searchQuery.replaceAll(' ', '').replaceAll('-', '').replaceAll('(', '').replaceAll(')', '').toLowerCase()
          ) &&
        !uniqueIDSet.has(contact._id) &&
        rep < 16
      ) {
        rep++;
        uniqueIDSet.add(contact._id);
        let searchBarDropDownOpt = document.createElement('li');
        if (rep == 16) {
          searchBarDropDownOpt.innerHTML = `More results...`;
        } else {
          if (contact.SpouseFullName) {
            if (
              contact.SpouseFullName.replaceAll(' ', '')
                .replaceAll('-', '')
                .replaceAll('(', '')
                .replaceAll(')', '')
                .toLowerCase()
                .includes(
                  searchQuery
                    .replaceAll(' ', '')
                    .replaceAll('-', '')
                    .replaceAll('(', '')
                    .replaceAll(')', '')
                    .toLowerCase()
                )
            ) {
              searchBarDropDownOpt.innerHTML = `${contact.SpouseFullName}`;
            } else {
              searchBarDropDownOpt.innerHTML = `${contact.FullName}`;
            }
          } else {
            searchBarDropDownOpt.innerHTML = `${contact.FullName}`;
          }
          searchBarDropDownOpt.addEventListener('mousedown', (e) => {
            loadSidePanel(`${srvrURL}/${contact._id}`);
            contactSearch.value = '';
          });
        }
        searchBarDropDownOpt.classList.add('dropdown-item');
        contactSearchList.appendChild(searchBarDropDownOpt);
      }
    }
  });
  if (!uniqueIDSet.size) {
    let searchBarDropDownOpt = document.createElement('li');
    searchBarDropDownOpt.innerHTML = `No contact found`;
    searchBarDropDownOpt.classList.add('dropdown-item');
    contactSearchList.appendChild(searchBarDropDownOpt);
  }
}
///////////////////////////////////////////////////////////
//// vvv Highlights active events from calendar vvv ///////
function highlghtActvEvnt(cntctID) {
  let highlightedItems = document.getElementById(calendarDatesTag).querySelectorAll('*');
  highlightedItems.forEach((userItem) => {
    userItem.classList.remove(activeTag);
    if (userItem.className.includes(cntctID)) userItem.classList.add(activeTag);
  });
}
///////////////////////////////////////////////////////////
//////// vvv Populates selects with objects vvv ///////////
function populateSlctWObj(calArray, SelectElement, firstBlankEl) {
  storedFilter = localStorage.getItem(SelectElement.id);
  calArrayLength = Object.entries(calArray).length;
  rep = 0;
  if (firstBlankEl) {
    let calOption = document.createElement('option');
    calOption.value = '';
    calOption.innerHTML = firstBlankEl;
    SelectElement.appendChild(calOption);
  }
  Object.entries(calArray).forEach((calArrayItems) => {
    rep++;
    let [key, value] = calArrayItems;
    key = key.replaceAll('_', '-');
    value = value.replaceAll('_', '-');
    key = key.replaceAll('number', '');
    value = value.replaceAll('number', '');
    let calOption = document.createElement('option');
    calOption.value = key;
    calOption.innerHTML = value;
    SelectElement.appendChild(calOption);
    if (rep == calArrayLength && storedFilter) {
      SelectElement.value = storedFilter;
    }
  });
}
///////////////////////////////////////////////////////////
////////////// vvv Filters Calendar vvv ///////////////////
function calendarFilter(chosenFilter) {
  if (chosenFilter) {
    renewals = document.getElementsByClassName(calTaskTag);
    for (key in renewals) {
      if (renewals[key].className) {
        if (chosenFilter.target.value == calTaskTag) {
          document.getElementById(`${renewals[key].id}`).classList.remove(hiddenContactTag);
        } else {
          document.getElementById(`${renewals[key].id}`).classList.add(hiddenContactTag);
          if (renewals[key].className.includes(chosenFilter.target.value)) {
            document.getElementById(`${renewals[key].id}`).classList.remove(hiddenContactTag);
          }
        }
      }
    }
  }
}
///////////////////////////////////////////////////////////
///// vvv Saves old value mostly from side panel vvv //////
function saveOldValue(textbox) {
  let checkValidAgain = document.getElementById(`${textbox.id}`).checkValidity();
  if (checkValidAgain) {
    snackbar(`Updated ${textbox.id} for ${FirstName.value}`);
  } else {
    let invalidInput = document.getElementById(`${textbox.id}`);
    if (invalidInput.value) {
      snackbar(`Please correct the ${textbox.placeholder.toLowerCase()} format: ${invalidInput.pattern}`);
    } else {
      snackbar(`Please enter a ${textbox.placeholder.toLowerCase()}. This is required.`);
    }
    invalidInput.value = oldInputValue;
  }
}
///////////////////////////////////////////////////////////
///////// vvv checks phone number format vvv //////////////
function phonenumber(inputtxt) {
  console.log(inputtxt);
  let phoneno = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
  if (inputtxt.match(phoneno)) {
    snackbar('Phone is good');
  } else {
    snackbar('Please enter either a valid name or phone.');
  }
}
///////////////////////////////////////////////////////////
//// vvv Patches date that contact was last editted vvv ///
function contactEditDate() {
  LastEditedBy.value = loggedInUser;
  if (_id.value) {
    lastEditDate = new Date().toJSON(); //.slice(0, 16);
    fetch(`${srvrURL}/${_id.value}`, {
      method: 'PATCH',
      body: JSON.stringify({
        LastEditDate: lastEditDate,
        LastEditedBy: loggedInUser,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
///////////////////////////////////////////////////////////
//// vvv Aborts loading more events into calendar vvv /////
function abortCalendarDatesFillIn() {
  controller.abort();
  controller = new AbortController();
  signal = controller.signal;
}
///////////////////////////////////////////////////////////
///////////////// vvv Updates DB vvv //////////////////////
function updateDB(input) {
  fetch(input.updateURL, {
    method: input.fetchMethod,
    body: JSON.stringify({
      [input.key]: input.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      alert('Please enter a unique phone number');
    });
}
///////////////////////////////////////////////////////////
////////////// vvv Snackbar vvv ///////////////////
function snackbar(message) {
  const snackbar = document.getElementById('snackbar');
  snackbar.innerHTML = message;
  snackbar.className = 'show';
  setTimeout(function () {
    snackbar.className = snackbar.className.replace('show', '');
  }, 3000);
}
///////////////////////////////////////////////////////////
////////// vvv Removes highlighted fields vvv /////////////
function removePolicyInfoHighlight() {
  document.querySelectorAll('.policyInfo').forEach((policyInfoInput) => {
    document.getElementById(`${policyInfoInput.id}`).classList.remove('selectedEvent');
  });
}
///////////////////////////////////////////////////////////
///// vvv Increases the height of tasks textarea vvv //////
function auto_height(elem) {
  elem.style.height = '1px';
  elem.style.height = elem.scrollHeight + 'px';
}
///////////////////////////////////////////////////////////
////////// vvv Removes calendar row styling vvv ///////////
function deleteCalRow(rep) {
  document.getElementById(`${dayTag}${rep}`).classList.add(hiddenContactTag);
  document.getElementById(`${dayTag}${rep}`).classList.remove('Day28');
  document.getElementById(`${dayTag}${rep}`).classList.remove('SatSun28');
  document.getElementById(`${dayTag}${rep}`).classList.remove('Day21');
  document.getElementById(`${dayTag}${rep}`).classList.remove('SatSun21');
  document.getElementById(`${dayTag}${rep}`).classList.remove('Day14');
  document.getElementById(`${dayTag}${rep}`).classList.remove('SatSun14');
  document.getElementById(`${dayTag}${rep}`).classList.remove('Day7');
  document.getElementById(`${dayTag}${rep}`).classList.remove('SatSun7');
  document.getElementById(`${dayTag}${rep}`).classList.remove('Day3');
  document.getElementById(`${dayTag}${rep}`).classList.remove('SatSun3');
  document.getElementById(`${dayTag}${rep}`).classList.remove('Day1');
}
///////////////////////////////////////////////////////////
///////////// vvv Calendar Day Show or Hide vvv ///////////
function dayShowHide(daysSelected) {
  for (let rep = 0; rep < 28; rep++) {
    deleteCalRow(rep);
    if (rep < daysSelected) {
      document.getElementById(`${dayTag}${rep}`).classList.remove(hiddenContactTag);
      if (rep == 5 || rep == 6 || rep == 12 || rep == 13 || rep == 19 || rep == 20 || rep == 26 || rep == 27) {
        document.getElementById(`${dayTag}${rep}`).classList.add(`SatSun${daysSelected}`);
      } else {
        document.getElementById(`${dayTag}${rep}`).classList.add(`Day${daysSelected}`);
      }
    }
  }
}
///////////////////////////////////////////////////////////
///////////// vvv Resizes the screen on load vvv ///////////
let limitFunc = function () {
  newWidth = window.innerWidth;
  if (prevWidth > smallScrnSize && newWidth < smallScrnSize) {
    // functions for big screen
    abortCalendarDatesFillIn();
    dayShowHide(3);
    document.getElementById('DaysSelect').value = 3;
    calendarDatesFillIn(TodaysDate, 3);
    document.getElementById('DaysSelect').classList.add(hiddenContactTag);
  } else if (prevWidth < smallScrnSize && newWidth > smallScrnSize) {
    // functions for small screen
    abortCalendarDatesFillIn();
    dayShowHide(21);
    document.getElementById('DaysSelect').value = 21;
    calendarDatesFillIn(TodaysDate, 21);
    document.getElementById('DaysSelect').classList.remove(hiddenContactTag);
  }
  prevWidth = window.innerWidth;
  return prevWidth;
};
///////////////////////////////////////////////////////////
///////////// vvv Adding days to date vvv ///////////
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

////////////////////////////////////////////////////////////////
//// vvv Wiggle renewal inputs that match selected date vvv ///
function wiggleRenewalInput(dateSelector, ContactFieldsIDs) {
  let slctdPolicyGroup = ContactFieldsIDs.slice(0, 7);
  let slctdPolicyRenewDate = document.getElementById(ContactFieldsIDs);
  let slctdPolicyType = document.getElementById(`${slctdPolicyGroup}Type`);
  let slctdPolicyNo = document.getElementById(`${slctdPolicyGroup}Number`);
  slctdPolicyRenewDate.classList.remove('selectedEvent');
  slctdPolicyNo.classList.remove('selectedEvent');
  slctdPolicyType.classList.remove('selectedEvent');
  slctdPolicyRenewDate.classList.remove('selectedEventWiggle');
  slctdPolicyNo.classList.remove('selectedEventWiggle');
  slctdPolicyType.classList.remove('selectedEventWiggle');
  setTimeout(function () {
    slctdPolicyRenewDate.classList.remove('selectedEventWiggle');
  }, 2000);
  setTimeout(function () {
    slctdPolicyNo.classList.remove('selectedEventWiggle');
  }, 2000);
  setTimeout(function () {
    slctdPolicyType.classList.remove('selectedEventWiggle');
  }, 2000);
  cnvrtdDateSelector = new Date(dateSelector);
  dateSelectorRenewal = new Date(
    cnvrtdDateSelector.getTime() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 28 /*# of days*/
  )
    .toJSON()
    .slice(5, 10);

  if (dateSelectorRenewal == slctdPolicyRenewDate.value.slice(5, 10)) {
    slctdPolicyRenewDate.classList.add('selectedEvent');
    slctdPolicyNo.classList.add('selectedEvent');
    slctdPolicyType.classList.add('selectedEvent');
    slctdPolicyRenewDate.classList.add('selectedEventWiggle');
    slctdPolicyNo.classList.add('selectedEventWiggle');
    slctdPolicyType.classList.add('selectedEventWiggle');
  }
}

////////////////////////////////////////////////////////////////
/// vvv Wiggle monthly inputs that match selected date vvv ///
function wiggleMonthlyInput(dateSelector, ContactFieldsIDs) {
  let slctdPolicyGroup = ContactFieldsIDs.slice(0, 13);
  let slctdPolicyRecurringDay = document.getElementById(ContactFieldsIDs);
  let slctdPolicyNote = document.getElementById(`${slctdPolicyGroup}Note`);
  let slctdPolicyAt = document.getElementById(`${slctdPolicyGroup}At`);
  slctdPolicyRecurringDay.classList.remove('selectedEvent');
  slctdPolicyAt.classList.remove('selectedEvent');
  slctdPolicyNote.classList.remove('selectedEvent');
  slctdPolicyRecurringDay.classList.remove('selectedEventWiggle');
  slctdPolicyAt.classList.remove('selectedEventWiggle');
  slctdPolicyNote.classList.remove('selectedEventWiggle');
  setTimeout(function () {
    slctdPolicyRecurringDay.classList.remove('selectedEventWiggle');
  }, 2000);
  setTimeout(function () {
    slctdPolicyAt.classList.remove('selectedEventWiggle');
  }, 2000);
  setTimeout(function () {
    slctdPolicyNote.classList.remove('selectedEventWiggle');
  }, 2000);
  cnvrtdDateSelector = new Date(dateSelector).toJSON().slice(8, 10);

  if (cnvrtdDateSelector == slctdPolicyRecurringDay.value) {
    slctdPolicyRecurringDay.classList.add('selectedEvent');
    slctdPolicyAt.classList.add('selectedEvent');
    slctdPolicyNote.classList.add('selectedEvent');
    slctdPolicyRecurringDay.classList.add('selectedEventWiggle');
    slctdPolicyAt.classList.add('selectedEventWiggle');
    slctdPolicyNote.classList.add('selectedEventWiggle');
  }
}

////////////////////////////////////////////////////////////////
/// vvv Wiggle yearly inputs that match selected date vvv ///
function wiggleYearlyInput(dateSelector, ContactFieldsIDs) {
  let slctdPolicyGroup = ContactFieldsIDs.slice(0, 12);
  let slctdPolicyRecurringMonth = document.getElementById(`${slctdPolicyGroup}MM`);
  let slctdPolicyRecurringDay = document.getElementById(ContactFieldsIDs);
  let slctdPolicyNote = document.getElementById(`${slctdPolicyGroup}Note`);
  let slctdPolicyAt = document.getElementById(`${slctdPolicyGroup}At`);
  slctdPolicyRecurringMonth.classList.remove('selectedEvent');
  slctdPolicyRecurringDay.classList.remove('selectedEvent');
  slctdPolicyAt.classList.remove('selectedEvent');
  slctdPolicyNote.classList.remove('selectedEvent');
  slctdPolicyRecurringMonth.classList.remove('selectedEventWiggle');
  slctdPolicyRecurringDay.classList.remove('selectedEventWiggle');
  slctdPolicyAt.classList.remove('selectedEventWiggle');
  slctdPolicyNote.classList.remove('selectedEventWiggle');
  setTimeout(function () {
    slctdPolicyRecurringMonth.classList.remove('selectedEventWiggle');
  }, 2000);
  setTimeout(function () {
    slctdPolicyRecurringDay.classList.remove('selectedEventWiggle');
  }, 2000);
  setTimeout(function () {
    slctdPolicyAt.classList.remove('selectedEventWiggle');
  }, 2000);
  setTimeout(function () {
    slctdPolicyNote.classList.remove('selectedEventWiggle');
  }, 2000);
  cnvrtdDateSelector = new Date(dateSelector).toJSON().slice(5, 10);

  if (cnvrtdDateSelector == `${slctdPolicyRecurringMonth.value}-${slctdPolicyRecurringDay.value}`) {
    slctdPolicyRecurringMonth.classList.add('selectedEvent');
    slctdPolicyRecurringDay.classList.add('selectedEvent');
    slctdPolicyAt.classList.add('selectedEvent');
    slctdPolicyNote.classList.add('selectedEvent');
    slctdPolicyRecurringMonth.classList.add('selectedEventWiggle');
    slctdPolicyRecurringDay.classList.add('selectedEventWiggle');
    slctdPolicyAt.classList.add('selectedEventWiggle');
    slctdPolicyNote.classList.add('selectedEventWiggle');
  }
}
