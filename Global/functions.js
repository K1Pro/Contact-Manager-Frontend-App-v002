console.log('retrieved all global functions');
///////////////////////////////////////////////

function loadSidePanel(URL, slctdCalTask) {
  // This populates the Side Panel Input Fields following certain actions
  getJSON(URL).then((data) => {
    dateSelector = document.getElementById(`CalendarDate`).value;
    for (let rep = 0; rep < ContactFields.length; rep++) {
      let ContactFieldsIDs = ContactFields[rep].id;
      // console.log(ContactFieldsIDs);
      if (ContactFieldsIDs) {
        document.getElementById(`${ContactFieldsIDs}`).value = data.data.contacts[0][ContactFieldsIDs]
          ? `${data.data.contacts[0][ContactFieldsIDs]}`
          : '';
      }
      if (ContactFieldsIDs == '_id') {
        let contactID = document.getElementById(`${ContactFieldsIDs}`);
        loadContactTasks(contactID.value, slctdCalTask);
        // Highlights each renewal and event active in the calendar
        calID = data.data.contacts[0]._id;
        for (let rep = 0; rep < 31; rep++) {
          let cntctCalRnwl = document.getElementById(`${rnwlTag}${calID}${rep}`);
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
          cnvrtdDateSelector.getTime() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 28 /*# of days*/
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
  let calRep = 0;
  let prevMondayLastWeek = 1 - chosenDate.getDay() - daysInWeek;
  for (let rep = 0; rep < 28; rep++) {
    document.getElementById(`${dayTag}${rep}`).classList.remove(calSelectedDayTag);
    document.getElementById(`${dayTag}${rep}`).classList.remove(calTodaysDayTag);

    let calDates = new Date(
      chosenDate.getTime() +
        1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * (prevMondayLastWeek + rep) /*# of days*/
    );

    if (TodaysDate.toJSON().slice(0, 10) == calDates.toJSON().slice(0, 10))
      document.getElementById(`${dayTag}${rep}`).classList.add(calTodaysDayTag);

    let rnwlDates = new Date(
      chosenDate.getTime() +
        1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * (prevMondayLastWeek + rep + 28) /*# of days*/
    );

    if (calDates.toJSON().slice(0, 10) == chosenDate.toJSON().slice(0, 10))
      document.getElementById(`${dayTag}${rep}`).classList.add(calSelectedDayTag);

    if (TodaysDate.toJSON().slice(0, 10) == calDates.toJSON().slice(0, 10)) {
      document.getElementById(`${dayTag}${rep}`).innerHTML = `<b>${calDates.toJSON().slice(5, 10)} (Today)</b>`;
    } else {
      document.getElementById(`${dayTag}${rep}`).innerHTML = `${calDates.toJSON().slice(5, 10)}`;
    }

    document.getElementById(`${dayTag}${rep}`).addEventListener('click', () => {
      for (let rep = 0; rep < 28; rep++) {
        document.getElementById(`${dayTag}${rep}`).classList.remove(calSelectedDayTag);
      }
      document.getElementById(`${dayTag}${rep}`).classList.add(calSelectedDayTag);
      changeCalendarHTML_Date(calDates);
      createEventTime.value = `${calDates.toJSON().slice(0, 16)}`;
    });

    calEvntsArray.forEach((calEvnt) => {
      getJSON(`${srvrURL}${calEvnt.apiPath}${calEvnt.param(calDates, rnwlDates)}`).then((data) => {
        if (data.data.contacts.length) {
          rnwlCntcts = data.data.contacts;
          rnwlCntcts.map((rnwlCntct) => {
            calRep++;
            rtrvdCalDateSlctr = document.getElementById('CalendarDate').value;
            cntctCreatedDate = rnwlCntct.CreateDate;
            if (rtrvdCalDateSlctr >= cntctCreatedDate) {
              let calCntct = document.createElement('div');
              calCntct.classList.add(calEvnt.evntType);
              if (rnwlCntct._id == _id.value) calCntct.classList.add(activeTag);
              calCntct.classList.add(`_${rnwlCntct._id}`);
              calCntct.classList.add(textlightTag);
              calCntct.classList.add(calTaskTag);
              calCntct.classList.add(rnwlCntct.Status);
              calCntct.classList.add(rnwlCntct.Source);
              calDateNoDash = `${calDates.toJSON().slice(0, 10).replaceAll('-', '')}`;
              lastReviewDateNoDash = `${rnwlCntct.LastReviewDate.replaceAll('-', '')}`;
              // Sorting calendar events if they exist, not used for renewals or recurring
              let sortedCalEvents = rnwlCntct.CalendarEvents.filter((obj) => {
                return obj.DateYYYYMMDD === `${calDates.toJSON().slice(0, 10)}`;
              });
              // Last Edit By or Event Author added to class name
              data.type == 'event'
                ? calCntct.classList.add(sortedCalEvents[0].EventAuthor)
                : calCntct.classList.add(rnwlCntct.LastEditedBy);
              // Completed or Not Completed Styling
              (data.type == 'renewal' && lastReviewDateNoDash >= calDateNoDash) ||
              (data.type == 'event' && sortedCalEvents[0]?.Completed) ||
              (data.type == 'monthly' && lastReviewDateNoDash >= calDateNoDash)
                ? calCntct.classList.add(`${calEvnt.shrtCut}Cmpltd`)
                : calCntct.classList.add(`${calEvnt.shrtCut}NotCmpltd`);
              // Passing a few variables into the calEvent
              // calEvnt.sortedCalEvents = sortedCalEvents[0]?._id;
              // calEvnt.weeklyCalEvents = rnwlCntct?.WeeklyEvents[0]?._id;
              // calEvnt.monthlyCalEvents = rnwlCntct?.MonthlyEvents[0]?._id;
              // calEvnt.semiannualCalEvents = rnwlCntct?.SemiAnnualEvents[0]?._id;
              // calEvnt.annualCalEvents = rnwlCntct?.AnnualEvents[0]?._id;
              calEvnt.rep = rep;
              calEvnt.rnwlCntct = rnwlCntct._id;
              // Adding text content, ID and Event Listener to each event
              calCntct.textContent = `${rnwlCntct.LastName}`;
              // calCntct.setAttribute('id', calEvnt.idTag());
              calCntct.setAttribute('id', `event${calRep}`);
              calCntct.addEventListener('click', () => {
                emailBody.value = '';
                emailSubject.value = 'choose-email-template';
                removeActiveCalCntct();
                loadSidePanel(`${srvrURL}${phonePath}${rnwlCntct.Phone}`, `${sortedCalEvents[0]?._id}`);
                calCntct.classList.add(activeTag);
              });
              // Adding event to calendar box
              document.getElementById(`${dayTag}${rep}`).appendChild(calCntct);
              // applying existing calendar filters
              calCntctClasses = calCntct.className;
              if (!calCntctClasses.includes(TasksSelect.value)) {
                calCntct.classList.add(hiddenContactTag);
              }
              if (!calCntctClasses.includes(StatusSelect.value)) {
                calCntct.classList.add(hiddenContactTag);
              }
              if (!calCntctClasses.includes(SourceSelect.value)) {
                calCntct.classList.add(hiddenContactTag);
              }
              if (!calCntctClasses.includes(LastEditedBySelect.value)) {
                calCntct.classList.add(hiddenContactTag);
              }
            }
          });
        }
      });
    });
  }
}

function loadContactTasks(dailyTask, slctdCalTask) {
  cntctTasksArray.forEach((cntctTasks) => {
    getJSON(`${srvrURL}${cntctTasks.apiPath}${dailyTask}`).then((data) => {
      taskList = document.getElementById(cntctTasks.placeHolder);
      taskList.innerHTML = '';
      // sorts the array in reverse chronological order
      let CalendarEventsArray = data.data[cntctTasks.taskType];
      CalendarEventsArray.sort(compare);

      for (const [key, value] of Object.entries(CalendarEventsArray)) {
        // Creates a DIV
        let ContactTaskGroup = document.createElement('div');
        ContactTaskGroup.setAttribute('class', 'input-group');
        taskList.appendChild(ContactTaskGroup);

        let contactTask = {
          UID: value._id,
          Dated: document.createElement('input'),
          Description: document.createElement('textarea'),
          CheckBoxLabel: document.createElement('label'),
          CheckBoxSpan: document.createElement('span'),
          CheckBox: document.createElement('input'),
          Author: document.createElement('select'),
        };

        // Creates a datetime-local Input
        contactTask.Dated.type = 'datetime-local';
        contactTask.Dated.value = `${value.DateYYYYMMDD}${value.DateHHMMSS}`;
        contactTask.Dated.setAttribute('class', `form-control ${cntctTasks.CSSstyle}Dates border-bottom-0`);
        if (slctdCalTask && slctdCalTask == contactTask.UID) contactTask.Dated.classList.add('contactTaskSelected');
        contactTask.Dated.addEventListener('change', (inputChanged) => {
          updateContactTasks(contactTask, inputChanged);
        });
        ContactTaskGroup.appendChild(contactTask.Dated);

        // Create a select input for the Event Author
        contactTask.Author.addEventListener('change', (inputChanged) => {
          updateContactTasks(contactTask, inputChanged);
        });
        contactTask.Author.setAttribute('name', `TasksAgentSelector`);
        if (slctdCalTask && slctdCalTask == contactTask.UID) contactTask.Author.classList.add('contactTaskSelected');
        ContactTaskGroup.appendChild(contactTask.Author);
        cntctTasks.DropDown.forEach((dropDownOpt) => {
          let CntctTskAuthors = document.createElement('option');
          CntctTskAuthors.value = dropDownOpt;
          CntctTskAuthors.innerHTML = dropDownOpt;
          if (value.EventAuthor == dropDownOpt) CntctTskAuthors.selected = true;
          contactTask.Author.appendChild(CntctTskAuthors);
        });

        // Creates a checkbox for completed or not completed tasks
        if (cntctTasks.checkBox) {
          contactTask.CheckBoxLabel.setAttribute('class', `${cntctTasks.CSSstyle}checkBoxLabel`);
          ContactTaskGroup.appendChild(contactTask.CheckBoxLabel);
          contactTask.CheckBox.type = 'checkbox';
          contactTask.CheckBox.checked = value.Completed;
          contactTask.CheckBox.setAttribute('class', `form-check-input mt-0 ${bartkaCheckboxTag}`);
          if (slctdCalTask && slctdCalTask == contactTask.UID)
            contactTask.CheckBox.classList.add('contactTaskSelected');
          contactTask.CheckBox.addEventListener('click', (inputChanged) => {
            updateContactTasks(contactTask, inputChanged);
          });
          contactTask.CheckBoxLabel.appendChild(contactTask.CheckBox);
          contactTask.CheckBoxSpan.setAttribute('class', `${cntctTasks.CSSstyle}checkBoxSpan`);
          contactTask.CheckBoxLabel.appendChild(contactTask.CheckBoxSpan);
        }

        // Creates a text input for the description
        contactTask.Description.value = `${value.Description}`;
        contactTask.Description.spellcheck = 'false';
        contactTask.Description.setAttribute('class', `form-control ${cntctTasks.CSSstyle}Descriptions border-top-0`);
        if (slctdCalTask && slctdCalTask == contactTask.UID)
          contactTask.Description.classList.add('contactTaskSelected');
        contactTask.Description.addEventListener('change', (inputChanged) => {
          updateContactTasks(contactTask, inputChanged);
        });
        contactTask.Description.addEventListener('keyup', () => {
          auto_height(contactTask.Description);
        });
        taskList.appendChild(contactTask.Description);
        contactTask.Description.style.height = '1px';
        contactTask.Description.style.height = contactTask.Description.scrollHeight + 2 + 'px';
      }
      return data; //probably does nothing
    });
  });
}

function matchDatalist(searchInput) {
  let dataList = document.getElementById('contactsList');
  let totalSearchCntcts = dataList.childNodes.length;
  let searchCncttracker = 1;
  let uniquePhoneSet = new Set();
  let firstSearchCntct;
  Array.from(document.getElementById('contactsList').options).forEach(function (option_element) {
    searchCncttracker++;
    let dataListLabel = option_element.label.toLowerCase();
    let dataListvalue = option_element.value;
    if (dataListLabel.includes(searchInput) || dataListvalue.includes(searchInput)) {
      uniquePhoneSet.add(dataListvalue);
      [firstSearchCntct] = uniquePhoneSet;
      return firstSearchCntct;
    }
    if (firstSearchCntct && searchCncttracker == totalSearchCntcts) {
      loadSidePanel(`${srvrURL}${phonePath}${firstSearchCntct}`);
      removeActiveCalCntct();
      contactSearch.value = '';
    } else if (!firstSearchCntct && searchCncttracker == totalSearchCntcts) {
      snackbar('Please enter either a valid name (First name, Last Name) or phone.');
    }
  });
}
