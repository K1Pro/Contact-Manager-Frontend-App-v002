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
function updateContactTasks(contactTask) {
  fetch(`${srvrURL}${updateEventPath}${contactTask.UID}`, {
    method: 'PATCH',
    body: JSON.stringify({
      _id: contactTask.UID,
      EventAuthor: contactTask.Author.value,
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
      snackbar(`Update event for ${FirstName.value}`);
      contactEditDate();
    });
}
///////////////////////////////////////////////////////////
//////// vvv Removes active tag from calendar vvv /////////
function removeActiveCalCntct() {
  let highlightedItems = document
    .getElementById(calendarDatesTag)
    .querySelectorAll('*');
  highlightedItems.forEach((userItem) => {
    userItem.classList.remove(activeTag);
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
  Object.entries(calArray).forEach((calArrayItems) => {
    let [key, value] = calArrayItems;
    key = key.replaceAll('_', '-');
    value = value.replaceAll('_', '-');
    key = key.replaceAll('number', '');
    value = value.replaceAll('number', '');
    let calOption = document.createElement('option');
    calOption.value = key;
    calOption.innerHTML = value;
    SelectElement.appendChild(calOption);
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
          document
            .getElementById(`${renewals[key].id}`)
            .classList.remove(hiddenContactTag);
        } else {
          document
            .getElementById(`${renewals[key].id}`)
            .classList.add(hiddenContactTag);
          if (renewals[key].className.includes(chosenFilter.target.value)) {
            document
              .getElementById(`${renewals[key].id}`)
              .classList.remove(hiddenContactTag);
          }
        }
      }
    }
  }
}
///////////////////////////////////////////////////////////
///// vvv Saves old value mostly from side panel vvv //////
function saveOldValue(textbox) {
  let checkValidAgain = document
    .getElementById(`${textbox.id}`)
    .checkValidity();
  if (checkValidAgain) {
    snackbar(`Updated ${textbox.id} for ${FirstName.value}`);
  } else {
    let invalidInput = document.getElementById(`${textbox.id}`);
    if (invalidInput.value) {
      snackbar(
        `Please correct the ${textbox.placeholder.toLowerCase()} format: ${
          invalidInput.pattern
        }`
      );
    } else {
      snackbar(
        `Please enter a ${textbox.placeholder.toLowerCase()}. This is required.`
      );
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
    document
      .getElementById(`${policyInfoInput.id}`)
      .classList.remove('selectedRenewDate');
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
  document.getElementById(`${dayTag}${rep}`).classList.remove('calendarRow');
  document
    .getElementById(`${dayTag}${rep}`)
    .classList.remove('calendarSatSunRow');
  document.getElementById(`${dayTag}${rep}`).classList.remove('Day28');
  document.getElementById(`${dayTag}${rep}`).classList.remove('SatSun28');
  document.getElementById(`${dayTag}${rep}`).classList.remove('Day21');
  document.getElementById(`${dayTag}${rep}`).classList.remove('SatSun21');
  document.getElementById(`${dayTag}${rep}`).classList.remove('Day14');
  document.getElementById(`${dayTag}${rep}`).classList.remove('SatSun14');
  document.getElementById(`${dayTag}${rep}`).classList.remove('Day7');
  document.getElementById(`${dayTag}${rep}`).classList.remove('SatSun7');
  document.getElementById(`${dayTag}${rep}`).classList.remove('Day1');
  document.getElementById(`${dayTag}${rep}`).classList.remove('Day0');
}
///////////////////////////////////////////////////////////
///////////// vvv Resizes the screen on load vvv ///////////
let limitFunc = function () {
  if (window.innerWidth < 768) {
    /*your functions for big screen*/
    console.log('smallscreen');
    document.getElementById('DaysSelect').value = 0;
    document.getElementById('DaysSelect').dispatchEvent(new Event('change'));
  }
};
// window.addEventListener('load', limitFunc);
// document.addEventListener('DOMContentLoaded', limitFunc);
window.addEventListener('resize', limitFunc);
