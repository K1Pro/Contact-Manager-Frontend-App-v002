console.log('retrieved all global functions');
///////////////////////////////////////////////
// vvv This scans for all separate HTML Modules vvv

function loadSidePanel(URL, slctdCalTask) {
  // This populates the Side Panel Input Fields following certain actions
  getJSON(URL).then((data) => {
    dateSelector = document.getElementById(`CalendarDate`).value;
    for (let rep = 0; rep < ContactFields.length; rep++) {
      let ContactFieldsIDs = ContactFields[rep].id;
      // console.log(ContactFieldsIDs);
      if (ContactFieldsIDs) {
        document.getElementById(`${ContactFieldsIDs}`).value = data.data
          .contacts[0][ContactFieldsIDs]
          ? `${data.data.contacts[0][ContactFieldsIDs]}`
          : '';
      }
      if (ContactFieldsIDs == '_id') {
        let contactID = document.getElementById(`${ContactFieldsIDs}`);
        loadContactTasks(contactID.value, slctdCalTask);
        // Highlights each renewal and event active in the calendar
        calID = data.data.contacts[0]._id;
        for (let rep = 0; rep < 31; rep++) {
          let cntctCalRnwl = document.getElementById(
            `${renewalTag}${calID}${rep}`
          );
          if (cntctCalRnwl) {
            cntctCalRnwl.classList.add(activeTag);
          }
        }
        calEvnts = data.data.contacts[0].CalendarEvents;
        calEvnts.forEach((calEvent) => {
          let cntctCalEvnt = document.getElementById(`Event${calEvent._id}`);
          if (cntctCalEvnt) {
            cntctCalEvnt.classList.add(activeTag);
          }
        });
      }
      if (
        ContactFieldsIDs == 'Policy1RenewDate' ||
        ContactFieldsIDs == 'Policy2RenewDate' ||
        ContactFieldsIDs == 'Policy3RenewDate' ||
        ContactFieldsIDs == 'Policy4RenewDate'
      ) {
        slctdPolicyGroup = ContactFieldsIDs.slice(0, 7);
        slctdPolicy1RenewDate = document.getElementById(ContactFieldsIDs);
        slctdPolicyType = document.getElementById(`${slctdPolicyGroup}Type`);
        slctdPolicyNo = document.getElementById(`${slctdPolicyGroup}Number`);
        slctdPolicy1RenewDate.classList.remove('selectedRenewDate');
        slctdPolicyNo.classList.remove('selectedRenewDate');
        slctdPolicyType.classList.remove('selectedRenewDate');
        cnvrtdDateSelector = new Date(dateSelector);
        dateSelectorRenewal = new Date(
          cnvrtdDateSelector.getTime() +
            1000 /*sec*/ *
              60 /*min*/ *
              60 /*hour*/ *
              24 /*day*/ *
              28 /*# of days*/
        )
          .toJSON()
          .slice(5, 10);

        if (dateSelectorRenewal == slctdPolicy1RenewDate.value.slice(5, 10)) {
          slctdPolicy1RenewDate.classList.add('selectedRenewDate');
          slctdPolicyNo.classList.add('selectedRenewDate');
          slctdPolicyType.classList.add('selectedRenewDate');
        }
      }
    }
  });
}

function calendarDatesFillIn(chosenDate) {
  let prevMondayLastWeek = 1 - chosenDate.getDay() - daysInWeek;
  for (let rep = 0; rep < 28; rep++) {
    document
      .getElementById(`${dayTag}${rep}`)
      .classList.remove(calSelectedDayTag);
    document
      .getElementById(`${dayTag}${rep}`)
      .classList.remove(calTodaysDayTag);
    let calDates = new Date(
      chosenDate.getTime() +
        1000 /*sec*/ *
          60 /*min*/ *
          60 /*hour*/ *
          24 /*day*/ *
          (prevMondayLastWeek + rep) /*# of days*/
    );
    if (TodaysDate.toJSON().slice(0, 10) == calDates.toJSON().slice(0, 10))
      document.getElementById(`${dayTag}${rep}`).classList.add(calTodaysDayTag);

    let rnwlDates = new Date(
      chosenDate.getTime() +
        1000 /*sec*/ *
          60 /*min*/ *
          60 /*hour*/ *
          24 /*day*/ *
          (prevMondayLastWeek + rep + 28) /*# of days*/
    );
    // prettier-ignore
    if (calDates.toJSON().slice(0, 10) == chosenDate.toJSON().slice(0, 10)) document.getElementById(`${dayTag}${rep}`).classList.add(calSelectedDayTag);
    // prettier-ignore
    document.getElementById(`${dayTag}${rep}`).innerHTML = `${calDates.toJSON().slice(5, 10)}`;
    document.getElementById(`${dayTag}${rep}`).addEventListener('click', () => {
      // prettier-ignore
      for (let rep = 0; rep < 28; rep++) {document.getElementById(`${dayTag}${rep}`).classList.remove(calSelectedDayTag);}
      // prettier-ignore
      document.getElementById(`${dayTag}${rep}`).classList.add(calSelectedDayTag);
      changeCalendarHTML_Date(calDates);
      createEventTime.value = `${calDates.toJSON().slice(0, 16)}`;
    });
    getJSON(`${srvrURL}${rnwlPath}${rnwlDates.toJSON().slice(5, 10)}`).then(
      (data) => {
        // Populates renewals
        let rnwlCntcts;
        if (data.data.contacts.length) {
          rnwlCntcts = data.data.contacts;
          rnwlCntcts.map((rnwlCntct) => {
            let calCntct = document.createElement('div');
            // prettier-ignore
            let calDateNoDash = `${calDates.toJSON().slice(0, 10).replaceAll('-', '')}`;
            // prettier-ignore
            let lastReviewDateNoDash = `${rnwlCntct.LastReviewDate.replaceAll('-', '')}`;
            calCntct.classList.add(textlightTag);
            calCntct.classList.add(calTaskTag);
            calCntct.classList.add(renewalTag);
            lastReviewDateNoDash >= calDateNoDash
              ? calCntct.classList.add(rCompletedTag)
              : calCntct.classList.add(rNotCompletedTag);
            if (rnwlCntct._id == _id.value) calCntct.classList.add(activeTag);
            calCntct.classList.add(rnwlCntct.Status);
            calCntct.classList.add(rnwlCntct.Source);
            calCntct.classList.add(rnwlCntct.LastEditedBy);
            if (
              TasksDropDown.value == eventTag ||
              TasksDropDown.value == eCompletedTag ||
              TasksDropDown.value == eNotCompletedTag
            )
              calCntct.classList.add(hiddenContactTag);
            if (
              TasksDropDown.value == rCompletedTag &&
              lastReviewDateNoDash < calDateNoDash
            )
              calCntct.classList.add(hiddenContactTag);
            if (
              TasksDropDown.value == rNotCompletedTag &&
              lastReviewDateNoDash >= calDateNoDash
            )
              calCntct.classList.add(hiddenContactTag);
            if (
              StatusSelect.value != calTaskTag &&
              StatusSelect.value != rnwlCntct.Status
            )
              calCntct.classList.add(hiddenContactTag);
            if (
              SourceSelect.value != calTaskTag &&
              SourceSelect.value != rnwlCntct.Source
            )
              calCntct.classList.add(hiddenContactTag);
            if (
              LastEditedBySelect.value != calTaskTag &&
              LastEditedBySelect.value != rnwlCntct.LastEditedBy
            )
              calCntct.classList.add(hiddenContactTag);
            calCntct.textContent = `${rnwlCntct.LastName}`;
            calCntct.setAttribute(
              'id',
              `${renewalTag}${rnwlCntct._id}${rep + 1}`
            );
            calCntct.addEventListener('click', () => {
              emailBody.value = '';
              emailSubject.value = 'choose-email-template';
              removeActiveCalCntct();
              loadSidePanel(`${srvrURL}${phonePath}${rnwlCntct.Phone}`);
              calCntct.classList.add(activeTag);
            });
            document.getElementById(`${dayTag}${rep}`).appendChild(calCntct);
          });
        }
      }
    );
    getJSON(
      `${srvrURL}${contactsWithCalEventsPath}${calDates.toJSON().slice(0, 10)}`
    ).then((data) => {
      // Populates completed and not completed calendar events
      let rnwlCntcts;
      if (data.contacts.length) {
        rnwlCntcts = data.contacts;
        rnwlCntcts.map((rnwlCntct) => {
          let calCntct = document.createElement('div');
          calCntct.classList.add(textlightTag);
          calCntct.classList.add(calTaskTag);
          calCntct.classList.add(eventTag);
          const sortedCalEvents = rnwlCntct.CalendarEvents.filter((obj) => {
            return obj.DateYYYYMMDD === `${calDates.toJSON().slice(0, 10)}`;
          });
          !sortedCalEvents[0].Completed
            ? calCntct.classList.add(eNotCompletedTag)
            : calCntct.classList.add(eCompletedTag);
          if (rnwlCntct._id == _id.value) calCntct.classList.add(activeTag);
          calCntct.classList.add(rnwlCntct.Status);
          calCntct.classList.add(rnwlCntct.Source);
          calCntct.classList.add(sortedCalEvents[0].EventAuthor);
          if (
            TasksDropDown.value == renewalTag ||
            TasksDropDown.value == rCompletedTag ||
            TasksDropDown.value == rNotCompletedTag
          )
            calCntct.classList.add(hiddenContactTag);
          if (
            TasksDropDown.value == eCompletedTag &&
            !sortedCalEvents[0].Completed
          )
            calCntct.classList.add(hiddenContactTag);
          if (
            TasksDropDown.value == eNotCompletedTag &&
            sortedCalEvents[0].Completed
          )
            calCntct.classList.add(hiddenContactTag);
          if (
            StatusSelect.value != calTaskTag &&
            StatusSelect.value != rnwlCntct.Status
          )
            calCntct.classList.add(hiddenContactTag);
          if (
            SourceSelect.value != calTaskTag &&
            SourceSelect.value != rnwlCntct.Source
          )
            calCntct.classList.add(hiddenContactTag);
          if (
            LastEditedBySelect.value != calTaskTag &&
            LastEditedBySelect.value != sortedCalEvents[0].EventAuthor
          )
            calCntct.classList.add(hiddenContactTag);
          calCntct.textContent = `${rnwlCntct.LastName}`;
          calCntct.setAttribute('id', `Event${sortedCalEvents[0]._id}`);
          calCntct.addEventListener('click', () => {
            emailBody.value = '';
            removeActiveCalCntct();
            loadSidePanel(
              `${srvrURL}${phonePath}${rnwlCntct.Phone}`, // Phone URL
              `${sortedCalEvents[0]._id}` // Specific Contact Task ID
            );
            calCntct.classList.add(activeTag);
          });
          document.getElementById(`${dayTag}${rep}`).appendChild(calCntct);
        });
      }
    });
  }
}

function loadContactTasks(dailyTask, slctdCalTask) {
  ContactTaskList.innerHTML = '';
  getJSON(`${srvrURL}${eventsPath}${dailyTask}`).then((data) => {
    // sorts the array in reverse chronological order
    let CalendarEventsArray = data.data.CalendarEvents;
    CalendarEventsArray.sort(compare);

    for (const [key, value] of Object.entries(CalendarEventsArray)) {
      // Creates a DIV
      let ContactTaskGroup = document.createElement('div');
      ContactTaskGroup.setAttribute('class', 'input-group');
      ContactTaskList.appendChild(ContactTaskGroup);

      let contactTask = {
        UID: value._id,
        Dated: document.createElement('input'),
        Description: document.createElement('textarea'),
        CheckBox: document.createElement('input'),
        Author: document.createElement('select'),
      };
      // Creates a datetime-local Input
      contactTask.Dated.type = 'datetime-local';
      contactTask.Dated.value = `${value.DateYYYYMMDD}${value.DateHHMMSS}`;
      contactTask.Dated.setAttribute(
        'class',
        `form-control eventDates border-bottom-0`
      );
      if (slctdCalTask && slctdCalTask == contactTask.UID)
        contactTask.Dated.classList.add('contactTaskSelected');
      contactTask.Dated.addEventListener('change', () => {
        updateContactTasks(contactTask);
      });
      ContactTaskGroup.appendChild(contactTask.Dated);

      // Creates a text input for the description
      contactTask.Description.value = `${value.Description}`;
      contactTask.Description.spellcheck = 'false';
      contactTask.Description.rows = Math.round(
        contactTask.Description.value.length / 120 + 1
      );
      contactTask.Description.setAttribute(
        'class',
        `form-control ${eventDescriptionsTag} border-top-0`
      );
      if (slctdCalTask && slctdCalTask == contactTask.UID)
        contactTask.Description.classList.add('contactTaskSelected');
      contactTask.Description.addEventListener('change', () => {
        updateContactTasks(contactTask);
      });
      // Create a select input for the Event Author
      contactTask.Author.addEventListener('change', () => {
        updateContactTasks(contactTask);
      });
      contactTask.Author.setAttribute('name', `TasksAgentSelector`);
      if (slctdCalTask && slctdCalTask == contactTask.UID)
        contactTask.Author.classList.add('contactTaskSelected');
      ContactTaskGroup.appendChild(contactTask.Author);

      LastEditedByS.forEach((staffMember) => {
        let CntctTskAuthors = document.createElement('option');
        CntctTskAuthors.value = staffMember;
        CntctTskAuthors.innerHTML = staffMember;
        if (value.EventAuthor == staffMember) CntctTskAuthors.selected = true;
        contactTask.Author.appendChild(CntctTskAuthors);
      });

      // Creates a checkbox
      contactTask.CheckBox.type = 'checkbox';
      contactTask.CheckBox.checked = value.Completed;
      contactTask.CheckBox.setAttribute(
        'class',
        `form-check-input mt-0 ${bartkaCheckboxTag}`
      );
      if (slctdCalTask && slctdCalTask == contactTask.UID)
        contactTask.CheckBox.classList.add('contactTaskSelected');
      contactTask.CheckBox.addEventListener('click', () => {
        fetch(`${srvrURL}${updateEventPath}${value._id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            _id: value._id,
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
            contactEditDate();
            let checkCompletion = document.getElementById(`Event${value._id}`);
            if (checkCompletion) {
              checkCompletion = checkCompletion.className;
              if (checkCompletion.includes(eNotCompletedTag)) {
                let checkCompletion = document.getElementById(
                  `Event${value._id}`
                );
                checkCompletion.setAttribute(
                  'class',
                  `${eCompletedTag} ${textlightTag} task${value._id}`
                );
              } else {
                let checkCompletion = document.getElementById(
                  `Event${value._id}`
                );
                checkCompletion.setAttribute(
                  'class',
                  `${eNotCompletedTag} ${textlightTag} task${value._id}`
                );
              }
            }
            // PhoneInput = document.getElementById('Phone');
            // contactTasksTextArea.value = '';
            snackbar(`Event updated for ${FirstName.value}`);
            // loadSidePanel(`${srvrURL}${phonePath}${PhoneInput.value}`);
          });
      });
      ContactTaskGroup.appendChild(contactTask.CheckBox);
      ContactTaskList.appendChild(contactTask.Description);
    }
    return data;
  });
}

function matchDatalist(searchInput) {
  let dataList = document.getElementById('contactsList');
  let totalSearchCntcts = dataList.childNodes.length;
  let searchCncttracker = 1;
  let uniquePhoneSet = new Set();
  let firstSearchCntct;
  Array.from(document.getElementById('contactsList').options).forEach(function (
    option_element
  ) {
    searchCncttracker++;
    let dataListLabel = option_element.label.toLowerCase();
    let dataListvalue = option_element.value;
    if (
      dataListLabel.includes(searchInput) ||
      dataListvalue.includes(searchInput)
    ) {
      uniquePhoneSet.add(dataListvalue);
      [firstSearchCntct] = uniquePhoneSet;
      return firstSearchCntct;
    }
    if (firstSearchCntct && searchCncttracker == totalSearchCntcts) {
      loadSidePanel(`${srvrURL}${phonePath}${firstSearchCntct}`);
      removeActiveCalCntct();
      contactSearch.value = '';
    } else if (!firstSearchCntct && searchCncttracker == totalSearchCntcts) {
      snackbar(
        'Please enter either a valid name (First name, Last Name) or phone.'
      );
    }
  });
}
