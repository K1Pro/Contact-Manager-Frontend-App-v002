getJSON(`${srvrURL}${sortedContactsPath}`).then((data) => {
  for (const [key, value] of Object.entries(data.data.contacts)) {
    let CreatedBy = value.CreatedBy;
    // let FullName = `${value.FirstName} ${value.LastName}`;
    // You can change the value to whatever you would like, here it is to the createdby value
    if (CreatedBy == 'Bart') {
      // console.log(value._id);
      fetch(`${srvrURL}/${value._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          CreatedBy: 'Bartosz',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
});
