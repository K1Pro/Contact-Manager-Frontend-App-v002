if (phoneKey == this.id) {
  console.log('this is a phone number it has to be checked first');
  getJSON(`${serverURL}?fields=${phoneKey}`).then((data) => {
    // Require only unique phone numbers
    dbArray = Object.entries(data.data.contacts);
    let uniquePhoneSet = new Set();
    let uniquePhone;
    let contactPhone;
    dbArray.forEach((element) => {
      contactPhone = element[1][phoneKey];
      uniquePhone = uniquePhoneSet.has(contactPhone);
      if (!uniquePhone) {
        uniquePhoneSet.add(contactPhone);
        console.log(contactPhone);
      } else {
        console.log(contactPhone);
      }
    });
    console.log(uniquePhoneSet);
    console.log(dbArray);
  });
}
