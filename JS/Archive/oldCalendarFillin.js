getJSON(`${srvrURL}${rnwlPath}${rnwlDates.toJSON().slice(5, 10)}`).then((data) => {
  // Populates renewals
  if (data.data.contacts.length) {
    rnwlCntcts = data.data.contacts;
    rnwlCntcts.map((rnwlCntct) => {
      rtrvdCalDateSlctr = document.getElementById('CalendarDate').value;
      cntctCreatedDate = rnwlCntct.CreateDate;
      if (rtrvdCalDateSlctr >= cntctCreatedDate) {
        let calCntct = document.createElement('div');
        calEventStyle(calCntct, rnwlCntct);
        calDateNoDash = `${calDates.toJSON().slice(0, 10).replaceAll('-', '')}`;
        lastReviewDateNoDash = `${rnwlCntct.LastReviewDate.replaceAll('-', '')}`;
        calCntct.classList.add(rnwlCntct.LastEditedBy);
        //////////////
        lastReviewDateNoDash >= calDateNoDash
          ? calCntct.classList.add(rCmpltdTag)
          : calCntct.classList.add(rNotCmpltdTag);
        //////////////
        if (TasksSelect.value == rCmpltdTag && lastReviewDateNoDash < calDateNoDash)
          calCntct.classList.add(hiddenContactTag);
        //////////////
        if (TasksSelect.value == rNotCmpltdTag && lastReviewDateNoDash >= calDateNoDash)
          calCntct.classList.add(hiddenContactTag);
        //////////////
        if (LastEditedBySelect.value != calTaskTag && LastEditedBySelect.value != rnwlCntct.LastEditedBy)
          calCntct.classList.add(hiddenContactTag);
        //////////////
        calCntct.setAttribute('id', `${rnwlTag}${rnwlCntct._id}${rep + 1}`);
        calCntct.addEventListener('click', () => {
          emailBody.value = '';
          emailSubject.value = 'choose-email-template';
          removeActiveCalCntct();
          loadSidePanel(`${srvrURL}/${rnwlCntct._id}`, false);
          calCntct.classList.add(activeTag);
        });
        // document.getElementById(`${dayTag}${rep}`).appendChild(calCntct);
      }
    });
  }
});
getJSON(`${srvrURL}${contactsWithCalEventsPath}${calDates.toJSON().slice(0, 10)}`).then((data) => {
  // Populates completed and not completed calendar events
  if (data.data.contacts.length) {
    rnwlCntcts = data.data.contacts;
    rnwlCntcts.map((rnwlCntct) => {
      rtrvdCalDateSlctr = document.getElementById('CalendarDate').value;
      cntctCreatedDate = rnwlCntct.CreateDate;
      if (rtrvdCalDateSlctr >= cntctCreatedDate) {
        let calCntct = document.createElement('div');
        calEventStyle(calCntct, rnwlCntct);
        calDateNoDash = `${calDates.toJSON().slice(0, 10).replaceAll('-', '')}`;
        lastReviewDateNoDash = `${rnwlCntct.LastReviewDate.replaceAll('-', '')}`;

        //////////////
        sortedCalEvents = rnwlCntct.CalendarEvents.filter((obj) => {
          return obj.DateYYYYMMDD === `${calDates.toJSON().slice(0, 10)}`;
        });
        calCntct.classList.add(sortedCalEvents[0].EventAuthor);
        //////////////
        sortedCalEvents[0].Completed ? calCntct.classList.add(eCmpltdTag) : calCntct.classList.add(eNotCmpltdTag);
        //////////////
        if (TasksSelect.value == eCmpltdTag && !sortedCalEvents[0].Completed) calCntct.classList.add(hiddenContactTag);
        //////////////
        if (TasksSelect.value == eNotCmpltdTag && sortedCalEvents[0].Completed)
          calCntct.classList.add(hiddenContactTag);
        //////////////
        if (LastEditedBySelect.value != calTaskTag && LastEditedBySelect.value != sortedCalEvents[0].EventAuthor)
          calCntct.classList.add(hiddenContactTag);
        //////////////
        calCntct.setAttribute('id', `Event${sortedCalEvents[0]._id}`);
        calCntct.addEventListener('click', () => {
          emailBody.value = '';
          removeActiveCalCntct();
          loadSidePanel(
            `${srvrURL}/${rnwlCntct._id}`,
            `${sortedCalEvents[0]._id}` // Specific Contact Task ID
          );
          calCntct.classList.add(activeTag);
        });
        // document.getElementById(`${dayTag}${rep}`).appendChild(calCntct);
      }
    });
  }
});

getJSON(`${srvrURL}${MonthlyEventsPath}${calDates.toJSON().slice(8, 10)}`).then((data) => {
  if (data.data.contacts.length) {
    rnwlCntcts = data.data.contacts;
    rnwlCntcts.map((rnwlCntct) => {
      console.log('this is a recurring event');
      let calCntct = document.createElement('div');
      calCntct.classList.add(textlightTag);
      calCntct.classList.add(calTaskTag);
      calCntct.classList.add(eventTag);
      sortedCalEvents = rnwlCntct.MonthlyEvents.filter((obj) => {
        return obj.DayOfMonth === `${calDates.toJSON().slice(8, 10)}`;
      });
      // !sortedCalEvents[0].Completed
      //   ? calCntct.classList.add(eNotCmpltdTag)
      //   : calCntct.classList.add(eCmpltdTag);
      if (rnwlCntct._id == _id.value) calCntct.classList.add(activeTag);
      calCntct.classList.add(rnwlCntct.Status);
      calCntct.classList.add(rnwlCntct.Source);
      calCntct.classList.add(sortedCalEvents[0].EventAuthor);
      if (TasksSelect.value == rnwlTag || TasksSelect.value == rCmpltdTag || TasksSelect.value == rNotCmpltdTag)
        calCntct.classList.add(hiddenContactTag);
      if (TasksSelect.value == eCmpltdTag && !sortedCalEvents[0].Completed) calCntct.classList.add(hiddenContactTag);
      if (TasksSelect.value == eNotCmpltdTag && sortedCalEvents[0].Completed) calCntct.classList.add(hiddenContactTag);
      if (StatusSelect.value != calTaskTag && StatusSelect.value != rnwlCntct.Status)
        calCntct.classList.add(hiddenContactTag);
      if (SourceSelect.value != calTaskTag && SourceSelect.value != rnwlCntct.Source)
        calCntct.classList.add(hiddenContactTag);
      if (LastEditedBySelect.value != calTaskTag && LastEditedBySelect.value != sortedCalEvents[0].EventAuthor)
        calCntct.classList.add(hiddenContactTag);
      calCntct.textContent = `${rnwlCntct.LastName}`;
      calCntct.setAttribute('id', `Event${sortedCalEvents[0]._id}`);
      calCntct.addEventListener('click', () => {
        emailBody.value = '';
        removeActiveCalCntct();
        loadSidePanel(
          `${srvrURL}/${rnwlCntct._id}`, // Phone URL
          `${sortedCalEvents[0]._id}` // Specific Contact Task ID
        );
        calCntct.classList.add(activeTag);
      });
      // document.getElementById(`${dayTag}${rep}`).appendChild(calCntct);
    });
  }
});
