getJSON(`${srvrURL}${sortedContactsPath}`).then((data) => {
  console.log(data);
  for (const [key, value] of Object.entries(data.data.contacts)) {
    let WeeklyEvents = value.MonthlyEvents;
    // let CreatedBy = value.CreatedBy;

    let FullName = `${value.FirstName} ${value.LastName}`;

    // You can change the value to whatever you would like, here it is to the createdby value
    if (WeeklyEvents) {
      console.log(FullName);
      console.log(WeeklyEvents);
      console.log(value._id);
      //   // console.log(value._id);
      // fetch(`${srvrURL}${deleteEmptyFieldPath}${value._id}`, {
      //   method: 'DELETE',
      //   body: JSON.stringify({
      //     MonthlyEvents: '',
      //   }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
    }
  }
});
