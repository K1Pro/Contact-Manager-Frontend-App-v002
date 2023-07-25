// From ContactTasks.html
<ul id="RecurEvents" class="dropdown-menu dropdown-menu-end" data-bs-theme="dark">
  <li>
    <a id="WeeklyEvents" class="dropdown-item">
      Create Weekly Task
    </a>
  </li>
  <li>
    <a id="MonthlyEvents" class="dropdown-item">
      Create Monthly Task
    </a>
  </li>
  <li>
    <a id="SemiAnnualEvents" class="dropdown-item">
      Create Semi-annual Task
    </a>
  </li>
  <li>
    <a id="AnnualEvents" class="dropdown-item">
      Create Annual Task
    </a>
  </li>
</ul>;

// From buttonHandlers.js
document.querySelectorAll('#RecurEvents').forEach((recurEvents) => {
  recurEvents.addEventListener('click', function (e) {
    ScndDayOfYear =
      new Date(createEventTime.value.slice(0, 10)).getTime() +
      1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 183;

    if (_id.value && contactTasksTextArea.value) {
      recurringEventsObj = {
        EventAuthor: EventAuthor.value,
        DayOfWeek: `${new Date(createEventTime.value.slice(0, 10)).getDay()}`, //need to compute this
        DayOfMonth: createEventTime.value.slice(8, 10),
        DayOfYear: createEventTime.value.slice(5, 10),
        SecondDayOfYear: new Date(ScndDayOfYear).toJSON().slice(5, 10),
        DateYYYYMMDD: createEventTime.value.slice(0, 10),
        DateHHMMSS: createEventTime.value.slice(10, 16),
        Description: contactTasksTextArea.value,
        Completed: false,
      };
      deleteRecurTasks();
      fetch(`${srvrURL}/${_id.value}`, {
        method: 'PATCH',
        body: JSON.stringify({
          [e.target.id]: recurringEventsObj,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.text())
        .then(() => {
          contactEditDate();
          IDInput = document.getElementById('_id');
          snackbar(`Event created for ${FirstName.value}`);
          loadSidePanel(`${srvrURL}/${IDInput.value}`);
          // This reloads the calender with events
          retrievedDate = document.getElementById('CalendarDate').value.split('-');
          nextWeek = new Date(retrievedDate[0], retrievedDate[1] - 1, retrievedDate[2]).getTime();
          nextWeekHHMM = new Date(nextWeek).setHours(TodaysHour, TodaysMinutes);
          calendarDatesFillIn(new Date(nextWeekHHMM));
          // This should be last
          contactTasksTextArea.value = '';
        });
    }
  });
});

// From Functions.js
// Completed or Not Completed Styling
(data.type = 'renewal' && lastReviewDateNoDash >= calDateNoDash) ||
(data.type == 'event' && sortedCalEvents[0]?.Completed) ||
(data.type == 'weekly' && lastReviewDateNoDash >= calDateNoDash) ||
(data.type == 'monthly' && lastReviewDateNoDash >= calDateNoDash) ||
(data.type == 'semiannual' && lastReviewDateNoDash >= calDateNoDash) ||
(data.type == 'annual' && lastReviewDateNoDash >= calDateNoDash)
  ? calCntct.classList.add(`${calEvnt.shrtCut}Cmpltd`)
  : calCntct.classList.add(`${calEvnt.shrtCut}NotCmpltd`);

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
          Input: document.createElement('input'),
        };

        // Creates a datetime-local Input
        if (cntctTasks.dated) {
          contactTask.Dated.type = 'datetime-local';
          contactTask.Dated.value = `${value.DateYYYYMMDD}${value.DateHHMMSS}`;
          contactTask.Dated.setAttribute('class', `form-control ${cntctTasks.CSSstyle}Dates border-bottom-0`);
          if (slctdCalTask && slctdCalTask == contactTask.UID) contactTask.Dated.classList.add('selectedContactTask');
          contactTask.Dated.addEventListener('change', (inputChanged) => {
            updateContactTasks(contactTask, inputChanged);
          });
          ContactTaskGroup.appendChild(contactTask.Dated);
        } else {
          contactTask.Dated.type = 'date';
          contactTask.Dated.disabled = true;
          contactTask.Dated.setAttribute(
            'class',
            `form-control ${cntctTasks.CSSstyle}Dates border-bottom-0 disabledDateInput`
          );
          contactTask.Dated.value = `${value.DateYYYYMMDD}`;
          ContactTaskGroup.appendChild(contactTask.Dated);
        }

        // Create a select input for the Event Author
        if (cntctTasks.dropDown) {
          contactTask.Author.addEventListener('change', (inputChanged) => {
            updateContactTasks(contactTask, inputChanged);
          });
          contactTask.Author.setAttribute('name', `TasksAgentSelector`);
          if (slctdCalTask && slctdCalTask == contactTask.UID) contactTask.Author.classList.add('selectedContactTask');
          ContactTaskGroup.appendChild(contactTask.Author);
          cntctTasks.dropDownArray.forEach((dropDownOpt) => {
            let CntctTskAuthors = document.createElement('option');
            CntctTskAuthors.value = dropDownOpt;
            CntctTskAuthors.innerHTML = dropDownOpt;
            if (value.EventAuthor == dropDownOpt) CntctTskAuthors.selected = true;
            contactTask.Author.appendChild(CntctTskAuthors);
          });
        } else {
          contactTask.Input.value = data.type;
          contactTask.Input.disabled = true;
          contactTask.Input.setAttribute('class', `disabledDropDownInput`);
          ContactTaskGroup.appendChild(contactTask.Input);
        }

        // Creates a checkbox for completed or not completed tasks
        contactTask.CheckBoxLabel.setAttribute('class', `${cntctTasks.CSSstyle}checkBoxLabel`);
        ContactTaskGroup.appendChild(contactTask.CheckBoxLabel);
        contactTask.CheckBox.type = 'checkbox';
        contactTask.CheckBox.checked = value.Completed;
        contactTask.CheckBox.setAttribute('class', `form-check-input mt-0 ${bartkaCheckboxTag}`);
        if (slctdCalTask && slctdCalTask == contactTask.UID) contactTask.CheckBox.classList.add('selectedContactTask');
        contactTask.CheckBox.addEventListener('click', (inputChanged) => {
          cntctTasks.checkBoxCMD ? updateContactTasks(contactTask, inputChanged) : deleteRecurTasks();
        });
        contactTask.CheckBoxLabel.appendChild(contactTask.CheckBox);
        contactTask.CheckBoxSpan.setAttribute('class', `${cntctTasks.CSSstyle}checkBoxSpan`);
        contactTask.CheckBoxLabel.appendChild(contactTask.CheckBoxSpan);

        // Creates a text input for the description
        contactTask.Description.value = `${value.Description}`;
        contactTask.Description.spellcheck = 'false';
        contactTask.Description.setAttribute('class', `form-control ${cntctTasks.CSSstyle}Descriptions border-top-0`);
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
      return data; //probably does nothing
    });
  });
}

// From Variables.js
const recurPath = `/recurEvents/`;

// From Arrays.js
const recrrngEvntsArray = ['Weekly', 'Monthly', 'SemiAnnual', 'Annual'];

let cntctTasksArray = [
  {
    taskType: 'CalendarEvents',
    apiPath: eventsPath,
    CSSstyle: 'event',
    placeHolder: 'ContactTaskList',
    dated: true,
    dropDown: true,
    dropDownArray: LastEditedByS,
    checkBoxCMD: true,
  },
  {
    taskType: 'RecurEvents',
    apiPath: recurPath,
    CSSstyle: 'recur',
    placeHolder: 'RecurringTaskList',
    dated: false,
    dropDown: false,
    dropDownArray: recrrngEvntsArray,
    checkBoxCMD: false,
  },
];

// Text Area from buttonHanders.js

contactTasksTextArea.addEventListener('focus', () => {
  cntctTasksTxtAreaList.classList.remove(hiddenContactTag);
});
contactTasksTextArea.addEventListener('keydown', () => {
  cntctTasksTxtAreaList.classList.add(hiddenContactTag);
});
