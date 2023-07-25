console.log('retrieved contact manager functions');
///////////////////////////////////////////////

function loadSidePanel(URL, slctdCalTask) {
  // This populates the Side Panel Input Fields following certain actions
  getJSON(URL).then((data) => {
    dateSelector = document.getElementById(`CalendarDate`).value;
    for (let rep = 0; rep < ContactFields.length; rep++) {
      let ContactFieldsIDs = ContactFields[rep].id;
      // console.log(ContactFieldsIDs);
      if (ContactFieldsIDs) {
        document.getElementById(`${ContactFieldsIDs}`).value = data.data.contact[ContactFieldsIDs]
          ? `${data.data.contact[ContactFieldsIDs]}`
          : '';
      }
      if (ContactFieldsIDs == '_id') {
        let contactID = document.getElementById(`${ContactFieldsIDs}`);
        loadContactTasks(contactID.value, slctdCalTask);
        // Highlights each renewal and event active in the calendar
        calID = data.data.contact._id;
        highlghtActvEvnt(calID);
        calEvnts = data.data.contact.CalendarEvents;
        calEvnts.forEach((calEvent) => {
          let cntctCalEvnt = document.getElementById(`Event${calEvent._id}`);
          if (cntctCalEvnt) {
            cntctCalEvnt.classList.add(activeTag);
          }
        });
      }
      if (ContactFieldsIDs.includes('RenewDate')) {
        wiggleRenewalInput(dateSelector, ContactFieldsIDs);
      }
      if (ContactFieldsIDs.includes('MonthlyEvent') && ContactFieldsIDs.includes('DD')) {
        wiggleMonthlyInput(dateSelector, ContactFieldsIDs);
      }
      if (ContactFieldsIDs.includes('YearlyEvent') && ContactFieldsIDs.includes('DD')) {
        wiggleYearlyInput(dateSelector, ContactFieldsIDs);
      }
    }
  });
}

function calendarDatesFillIn(chosenDate, DaysSelected, noDateChange) {
  document.getElementById('DaysSelect').value == 7 ? (daysInWeek = 0) : (daysInWeek = 7);

  noDateChange ? (prevMondayLastWeek = -noDateChange) : (prevMondayLastWeek = 1 - chosenDate.getDay() - daysInWeek);

  if (document.getElementById('DaysSelect').value == 3) prevMondayLastWeek = -1;
  if (document.getElementById('DaysSelect').value == 1) prevMondayLastWeek = 0;

  for (let rep = 0; rep < DaysSelected; rep++) {
    document.getElementById(`${dayTag}${rep}`).classList.remove(calSelectedDayTag);
    document.getElementById(`${dayTag}${rep}`).classList.remove(calTodaysDayTag);
    if (document.getElementById('DaysSelect').value == 1 && window.innerWidth >= 768) {
      document.getElementById(`${dayTag}${rep}`).style.whiteSpace = 'pre-wrap';
    } else {
      document.getElementById(`${dayTag}${rep}`).style.whiteSpace = 'nowrap';
    }

    let calDates = new Date(
      chosenDate.getTime() +
        1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * (prevMondayLastWeek + rep) /*# of days*/
    );

    if (TodaysDate.toJSON().slice(0, 10) == calDates.toJSON().slice(0, 10))
      document.getElementById(`${dayTag}${rep}`).classList.add(calTodaysDayTag);

    if (calDates.toJSON().slice(0, 10) == chosenDate.toJSON().slice(0, 10)) {
      document.getElementById(`${dayTag}${rep}`).classList.add(calSelectedDayTag);
    }

    if (
      calDates.toJSON().slice(5, 10) !=
      document.getElementById(`${dayTag}${rep}`).innerHTML.replace(/\s+/g, '').slice(0, 5)
    ) {
      TodaysDate.toJSON().slice(0, 10) == calDates.toJSON().slice(0, 10)
        ? (document.getElementById(`${dayTag}${rep}`).innerHTML = `${calDates.toJSON().slice(5, 10)} (Today)`)
        : (document.getElementById(`${dayTag}${rep}`).innerHTML = `${calDates.toJSON().slice(5, 10)}`);
    }

    document.getElementById(`${dayTag}${rep}`).addEventListener('click', () => {
      for (let rep = 0; rep < 28; rep++) {
        document.getElementById(`${dayTag}${rep}`).classList.remove(calSelectedDayTag);
      }
      document.getElementById(`${dayTag}${rep}`).classList.add(calSelectedDayTag);
      changeCalendarHTML_Date(calDates);
      createEventTime.value = `${new Date(calDates.getTime() + 1000 /*sec*/ * -300 /*min*/ * 60 /*hour*/)
        .toJSON()
        .slice(0, 16)}`;
    });

    getJSON(`${srvrURL}${UniqueContactAllEventTypes}${calDates.toJSON().slice(0, 10)}`).then((data) => {
      if (data.data.contacts.length) {
        rnwlCntcts = data.data.contacts;
        rnwlCntctsIDArray = rnwlCntcts.map((a) => a._id);

        // Removes existing events that have been moved....or in the future deleted
        uniqueDayElArray = document.getElementById(`${dayTag}${rep}`).querySelectorAll('*');
        for (let rep = 0; rep < uniqueDayElArray.length; rep++) {
          uniqueDayElArrayIDs = uniqueDayElArray[rep].id;
          if (uniqueDayElArrayIDs) {
            existingEvents = document.getElementById(`${uniqueDayElArrayIDs}`).id.slice(3).slice(0, -3);
            if (!rnwlCntctsIDArray.includes(existingEvents)) {
              document.getElementById(uniqueDayElArrayIDs).remove();
            }
          }
        }

        rnwlCntcts.map((rnwlCntct) => {
          rtrvdCalDateSlctr = document.getElementById('CalendarDate').value;
          cntctCreatedDate = rnwlCntct.CreateDate;
          // Below if statement checks if contact was created earlier than calendar date that is being filled in
          if (calDates.toJSON().slice(0, 10) >= cntctCreatedDate.slice(0, 10)) {
            let calCntct;
            document.getElementById(`${dayTag}${rep}`).innerHTML.includes(rnwlCntct.id)
              ? (calCntct = document.getElementById(`id_${rnwlCntct._id}_${calDates.toJSON().slice(8, 10)}`))
              : (calCntct = document.createElement('div'));
            calCntct.className = '';
            calCntct.classList.add(rnwlCntct.Type);
            if (rnwlCntct._id == _id.value) calCntct.classList.add(activeTag);
            calCntct.classList.add(`_${rnwlCntct._id}`);
            calCntct.classList.add(calTaskTag);
            calCntct.classList.add(rnwlCntct.Status);
            calCntct.classList.add(rnwlCntct.Source);
            calDateNoDash = `${calDates.toJSON().slice(0, 10).replaceAll('-', '')}`;
            const plus14Days = new Date(rnwlCntct.LastReviewDate).addDays(14).toJSON().slice(0, 10);
            lastReviewDateNoDash = `${plus14Days.replaceAll('-', '')}`;
            // Sorting calendar events if they exist, not used for renewals or recurring
            let sortedCalEvents = rnwlCntct.CalendarEvents.filter((obj) => {
              return obj.DateYYYYMMDD === `${calDates.toJSON().slice(0, 10)}`;
            });
            // Last Edit By or Event Author added to class name
            rnwlCntct.Type == 'event'
              ? calCntct.classList.add(sortedCalEvents[0].EventAuthor)
              : calCntct.classList.add(rnwlCntct.LastEditedBy);
            // Completed or Not Completed Styling
            if (
              (rnwlCntct.Type != 'event' && lastReviewDateNoDash >= calDateNoDash) ||
              (rnwlCntct.Type == 'event' && sortedCalEvents[0]?.Completed)
            ) {
              calCntct.classList.add(`Cmpltd`);
            } else {
              calCntct.classList.add(`NotCmpltd`);
            }
            if (!document.getElementById(`${dayTag}${rep}`).innerHTML.includes(rnwlCntct.id)) {
              // Adding text content, ID and Event Listener to each event
              rnwlCntct.Type == 'event'
                ? (calCntct.textContent = `${sortedCalEvents[0].DateHHMMSS.replace('T', '')} ${rnwlCntct.LastName}`)
                : (calCntct.textContent = `${rnwlCntct.LastName}`);

              if (document.getElementById('DaysSelect').value == 1 && window.innerWidth >= 768) {
                rnwlCntct.Type == 'event'
                  ? (calCntct.textContent = `${sortedCalEvents[0].DateHHMMSS.replace('T', '')} ${rnwlCntct.FirstName} ${
                      rnwlCntct.LastName
                    }:\r\n ${sortedCalEvents[0].Description}`)
                  : (calCntct.textContent = `${rnwlCntct.LastName}\r\n${rnwlCntct.Type}`);
              }

              calCntct.setAttribute('id', `id_${rnwlCntct._id}_${calDates.toJSON().slice(8, 10)}`);
              calCntct.addEventListener('click', () => {
                emailBody.value = '';
                emailSubject.value = 'choose-email-template';
                loadSidePanel(`${srvrURL}/${rnwlCntct._id}`, `${sortedCalEvents[0]?._id}`);
                calCntct.classList.add(activeTag);
                highlghtActvEvnt(rnwlCntct._id);
              });
              // Adding event to calendar box
              document.getElementById(`${dayTag}${rep}`).appendChild(calCntct);
            }
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
          // }
        });
      }
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
      sortAscDesc = 1;
      sortKey = 'DateYYYYMMDD';
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
        if (cntctTasks.dated) {
          contactTask.Dated.type = 'datetime-local';
          contactTask.Dated.value = `${value.DateYYYYMMDD}${value.DateHHMMSS}`;
          contactTask.Dated.setAttribute(
            'class',
            `form-control ${cntctTasks.CSSstyle}Dates border-bottom-0 respHeight`
          );
          if (slctdCalTask && slctdCalTask == contactTask.UID) contactTask.Dated.classList.add('selectedContactTask');
          contactTask.Dated.addEventListener('change', (inputChanged) => {
            updateContactTasks(contactTask, inputChanged);
          });
          ContactTaskGroup.appendChild(contactTask.Dated);
        }

        // Create a select input for the Event Author
        if (cntctTasks.dropDown) {
          contactTask.Author.addEventListener('change', (inputChanged) => {
            updateContactTasks(contactTask, inputChanged);
          });
          contactTask.Author.setAttribute('name', `TasksAgentSelector`);
          contactTask.Author.setAttribute('class', `respHeight`);
          if (slctdCalTask && slctdCalTask == contactTask.UID) contactTask.Author.classList.add('selectedContactTask');
          ContactTaskGroup.appendChild(contactTask.Author);
          cntctTasks.dropDownArray.forEach((dropDownOpt) => {
            let CntctTskAuthors = document.createElement('option');
            CntctTskAuthors.value = dropDownOpt;
            CntctTskAuthors.innerHTML = dropDownOpt;
            if (value.EventAuthor == dropDownOpt) CntctTskAuthors.selected = true;
            contactTask.Author.appendChild(CntctTskAuthors);
          });
        }

        // Creates a checkbox for completed or not completed tasks
        contactTask.CheckBoxLabel.setAttribute('class', `${cntctTasks.CSSstyle}checkBoxLabel`);
        ContactTaskGroup.appendChild(contactTask.CheckBoxLabel);
        contactTask.CheckBox.type = 'checkbox';
        contactTask.CheckBox.checked = value.Completed;
        contactTask.CheckBox.setAttribute('class', `form-check-input mt-0 ${bartkaCheckboxTag} respHeight`);
        if (slctdCalTask && slctdCalTask == contactTask.UID) contactTask.CheckBox.classList.add('selectedContactTask');
        contactTask.CheckBox.addEventListener('click', (inputChanged) => {
          updateContactTasks(contactTask, inputChanged);
        });
        contactTask.CheckBoxLabel.appendChild(contactTask.CheckBox);
        contactTask.CheckBoxSpan.setAttribute('class', `${cntctTasks.CSSstyle}checkBoxSpan`);
        if (slctdCalTask && slctdCalTask == contactTask.UID)
          contactTask.CheckBoxSpan.classList.add('selectedContactTask');
        contactTask.CheckBoxLabel.appendChild(contactTask.CheckBoxSpan);

        // Creates a text input for the description
        contactTask.Description.value = `${value.Description}`;
        contactTask.Description.spellcheck = 'false';
        contactTask.Description.setAttribute(
          'class',
          `form-control ${cntctTasks.CSSstyle}Descriptions border-top-0 respHeight`
        );
        if (slctdCalTask && slctdCalTask == contactTask.UID)
          contactTask.Description.classList.add('selectedContactTask');
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
    });
  });
}
