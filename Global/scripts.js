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
function compare(a, b) {
  if (a.DateYYYYMMDD < b.DateYYYYMMDD) {
    return 1;
  }
  if (a.DateYYYYMMDD > b.DateYYYYMMDD) {
    return -1;
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
/////////// vvv Delete All Recurring Tasks vvv ////////////
function deleteRecurTasks() {
  fetch(`${srvrURL}${deleteEmptyFieldPath}${_id.value}`, {
    method: 'DELETE',
    body: JSON.stringify({
      WeeklyEvents: '',
      MonthlyEvents: '',
      SemiAnnualEvents: '',
      AnnualEvents: '',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      loadContactTasks(_id.value);
      snackbar(`Event updated for ${FirstName.value}`);
      contactEditDate();
      response.json();
    })
    .catch((error) => {
      alert('Please connect to server');
    });
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
////////////// vvv Populates selects vvv //////////////////
function populateSelect(calArray, SelectElement) {
  calArray.forEach((calArrayItems) => {
    let calOption = document.createElement('option');
    calOption.value = calArrayItems;
    calOption.innerHTML = calArrayItems;
    SelectElement.appendChild(calOption);
  });
}
///////////////////////////////////////////////////////////
//////// vvv Populates selects with objects vvv ///////////
function populateSlctWObj(calArray, SelectElement) {
  storedFilter = localStorage.getItem(SelectElement.id);
  calArrayLength = Object.entries(calArray).length;
  rep = 0;
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
  if (_id.value) {
    lastEditDate = new Date().toJSON(); //.slice(0, 16);
    fetch(`${srvrURL}/${_id.value}`, {
      method: 'PATCH',
      body: JSON.stringify({
        LastEditDate: lastEditDate,
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
    document.getElementById(`${policyInfoInput.id}`).classList.remove('selectedRenewDate');
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
///////////// vvv Calendar Events styling vvv ///////////
function calEventStyle(calCntct, rnwlCntct) {
  // if (rnwlCntct._id == _id.value) calCntct.classList.add(activeTag);
  // calCntct.classList.add(textlightTag);
  // calCntct.classList.add(calTaskTag);
  // calCntct.classList.add(rnwlCntct.Status);
  // calCntct.classList.add(rnwlCntct.Source);
  // if (TasksSelect.value == eventTag || TasksSelect.value == eCmpltdTag || TasksSelect.value == eNotCmpltdTag)
  //   calCntct.classList.add(hiddenContactTag);
  // if (StatusSelect.value != calTaskTag && StatusSelect.value != rnwlCntct.Status)
  //   calCntct.classList.add(hiddenContactTag);
  // if (SourceSelect.value != calTaskTag && SourceSelect.value != rnwlCntct.Source)
  //   calCntct.classList.add(hiddenContactTag);
  // calCntct.textContent = `${rnwlCntct.LastName}`;
}
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// window.addEventListener('load', limitFunc);
// document.addEventListener('DOMContentLoaded', limitFunc);
window.addEventListener('resize', limitFunc);
