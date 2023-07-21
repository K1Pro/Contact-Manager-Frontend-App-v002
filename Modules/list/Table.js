function tableModule() {
  // vvv Start coding here for Calendar Module vvv

  getJSON(`${srvrURL}`).then((data) => {
    contactData = data;
    populateListTable(contactData);
    return contactData;
  });

  // function populateListTableFunction() {
  //   console.log(contactData);
  //   // Detects the last editted contact in an interval and repopulates the calendar upon detection
  //   if (contactData) {
  //     sortKey = 'LastEditDate';
  //     sortAscDesc = 1;
  //     let sortedContactData = contactData;
  //     sortedContactData = sortedContactData.data.contacts.sort(compare);
  //     let lastSortedContact = sortedContactData?.[0].LastEditDate;
  //     // Retrieves the last editted contact once page is loaded
  //     getJSON(`${srvrURL}${lastEdittedContactPath}`).then((data) => {
  //       lastEdittedContact = data?.data.contacts[0].LastEditDate;
  //       if (lastEdittedContact == lastSortedContact) {
  //         console.log('test');
  //       } else {
  //         getJSON(`${srvrURL}`).then((data) => {
  //           contactData = data;
  //           return contactData;
  //         });
  //       }
  //     });
  //   }
  // }

  // setInterval(populateListTableFunction, 1000);

  // ^^^ End coding here for Calendar Module ^^^
}

/////////////////////////////////////////////////////////////
// vvv This scans if all DOM Elements have been retrieved vvv
const isTableElementLoaded = async () => {
  while (DOMElements === undefined) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};
isTableElementLoaded().then(() => {
  console.log('retrieved module {list table}');
  tableModule();
});
