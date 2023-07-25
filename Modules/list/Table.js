function tableModule() {
  // vvv Start coding here for Calendar Module vvv

  // Stores most recently editted user info in browser storage
  getJSON(`${srvrURL}${lastEdittedContactPath}`).then((data) => {
    contactData = data;
    localStorage.setItem('BundleContactList-MostRecentContactID', data.data.contacts[0]._id);
    localStorage.setItem('BundleContactList-MostRecentContactLastName', data.data.contacts[0].LastName);
    localStorage.setItem('BundleContactList-MostRecentContactEditDate', data.data.contacts[0].LastEditDate);
    console.log(`===============`);
    console.log(`Last Editted: ${localStorage.getItem('BundleContactList-MostRecentContactID')}`);
    console.log(`Last Editted: ${localStorage.getItem('BundleContactList-MostRecentContactLastName')}`);
    console.log(`Last Editted: ${localStorage.getItem('BundleContactList-MostRecentContactEditDate')}`);
  });

  getJSON(`${srvrURL}`).then((data) => {
    contactData = data;
    populateListTable(contactData);
    return contactData;
  });

  function populateListTableFunction() {
    // Retrieves the last editted contact once page is loaded
    getJSON(`${srvrURL}${lastEdittedContactPath}`).then((data) => {
      if (
        localStorage.getItem('BundleContactList-MostRecentContactEditDate') != data?.data.contacts[0].LastEditDate ||
        localStorage.getItem('BundleContactList-MostRecentContactID') != data?.data.contacts[0]._id
      ) {
        localStorage.setItem('BundleContactList-MostRecentContactID', data.data.contacts[0]._id);
        localStorage.setItem('BundleContactList-MostRecentContactLastName', data.data.contacts[0].LastName);
        localStorage.setItem('BundleContactList-MostRecentContactEditDate', data.data.contacts[0].LastEditDate);
        console.log(`===============`);
        console.log(`Last Editted: ${localStorage.getItem('BundleContactList-MostRecentContactID')}`);
        console.log(`Last Editted: ${localStorage.getItem('BundleContactList-MostRecentContactLastName')}`);
        console.log(`Last Editted: ${localStorage.getItem('BundleContactList-MostRecentContactEditDate')}`);
        snackbar('Updating contacts, please wait...');
        getJSON(`${srvrURL}`).then((data) => {
          snackbar('Updated!');
          contactData = data;
          populateListTable(contactData);
          return contactData;
        });
      }
    });
  }

  setInterval(populateListTableFunction, 1000);

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
