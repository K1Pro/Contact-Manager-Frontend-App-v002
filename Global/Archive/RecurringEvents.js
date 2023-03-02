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
          PhoneInput = document.getElementById('Phone');
          snackbar(`Event created for ${FirstName.value}`);
          loadSidePanel(`${srvrURL}${phonePath}${PhoneInput.value}`);
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
