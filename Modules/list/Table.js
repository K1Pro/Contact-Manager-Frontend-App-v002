function tableModule() {
  // vvv Start coding here for Calendar Module vvv

  getJSON(`${srvrURL}`).then((data) => {
    contactData = data;
    populateListTable(contactData);
    return contactData;
  });

  function populateListTableFunction() {
    if (contactData) {
      // Retrieves the last editted contact once page is loaded
      getJSON(`${srvrURL}${lastEdittedContactPath}`).then((data) => {
        if (data) {
          let updatedCntct = contactData.data.contacts.find(
            (lastEdittedCntct) => lastEdittedCntct.LastEditDate == data.data.contacts[0].LastEditDate
          );
          if (!updatedCntct) {
            clearInterval(populateListTableInterval);
            snackbar('Updating contacts, please wait...');
            getJSON(`${srvrURL}`).then((data) => {
              snackbar('Updated!');
              contactData = data;
              populateListTable(contactData);
              populateListTableInterval = setInterval(populateListTableFunction, 1000);
              return contactData;
            });
          }
        }
      });
    }
  }

  let populateListTableInterval = setInterval(populateListTableFunction, 1000);

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
