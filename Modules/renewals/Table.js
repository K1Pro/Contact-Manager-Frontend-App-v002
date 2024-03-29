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
    console.log(`===============`);
  });

  getJSON(`${srvrURL}${renewalsPath}`).then((data) => {
    contactData = data;
    populateListTable(contactData);
    return contactData;
  });

  function populateListTableFunction() {
    // Retrieves the last editted contact once page is loaded
    getJSON(`${srvrURL}${lastEdittedContactPath}`).then((data) => {
      if (data) {
        console.log(`No change, most recent edit: ${data?.data.contacts[0].LastName}`);
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
          console.log(`===============`);
          snackbar('Updating contacts, please wait...');
          getJSON(`${srvrURL}${renewalsPath}`).then((data) => {
            snackbar('Updated!');
            contactData = data;
            populateListTable(contactData);
            return contactData;
          });
        }
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
