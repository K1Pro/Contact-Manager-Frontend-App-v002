function sidePanelModule() {
  // vvv Start coding here for SidePanel Module vvv
  populateSlctWObj(LastEditedByObj, LastEditedBy);
  populateSlctWObj(StatusObj, Status);
  populateSlctWObj(SourceObj, Source);
  loadSidePanel(`${srvrURL}${lastEdittedContactPath}`);

  // Populates a dataset into the main search bar
  // getJSON(`${srvrURL}${sortedContactsPath}`).then((data) => {
  //   populateSearchBar(data);
  // });

  // Saves the current database to be used in populating the search bar primarily
  getJSON(`${srvrURL}${searchBarPath}`).then((data) => {
    contactData = data;
    return contactData;
  });

  // Populates an unordered list into the main search bar dropdown upon page load
  getJSON(`${srvrURL}${lastEditted10ContactsPath}${loggedInUser}`).then((data) => {
    contactData = data;
    localStorage.setItem('BundleContactList-MostRecentContactID', data.data.contacts[0]._id);
    localStorage.setItem('BundleContactList-MostRecentContactLastName', data.data.contacts[0].LastName);
    localStorage.setItem('BundleContactList-MostRecentContactEditDate', data.data.contacts[0].LastEditDate);
    console.log(`===============`);
    console.log(`Last Editted: ${localStorage.getItem('BundleContactList-MostRecentContactID')}`);
    console.log(`Last Editted: ${localStorage.getItem('BundleContactList-MostRecentContactLastName')}`);
    console.log(`Last Editted: ${localStorage.getItem('BundleContactList-MostRecentContactEditDate')}`);
    populateSearchBarDropDownFunction(contactData, '');
  });

  // Detects the last created contact in an interval and repopulates the search bar upon detection, there is a very weird bug here
  function autoPopulateSearchBarDropDown() {
    // Retrieves the last editted contact once page is loaded
    getJSON(`${srvrURL}${lastEdittedContactPath}`).then((data) => {
      if (
        localStorage.getItem('BundleContactList-MostRecentContactEditDate') != data.data.contacts[0].LastEditDate ||
        localStorage.getItem('BundleContactList-MostRecentContactID') != data.data.contacts[0]._id
      ) {
        localStorage.setItem('BundleContactList-MostRecentContactID', data.data.contacts[0]._id);
        localStorage.setItem('BundleContactList-MostRecentContactLastName', data.data.contacts[0].LastName);
        localStorage.setItem('BundleContactList-MostRecentContactEditDate', data.data.contacts[0].LastEditDate);
        console.log(`===============`);
        console.log(`Last Editted: ${localStorage.getItem('BundleContactList-MostRecentContactID')}`);
        console.log(`Last Editted: ${localStorage.getItem('BundleContactList-MostRecentContactLastName')}`);
        console.log(`Last Editted: ${localStorage.getItem('BundleContactList-MostRecentContactEditDate')}`);
        getJSON(`${srvrURL}${searchBarPath}`).then((data) => {
          for (let rep = 0; rep < document.getElementById('DaysSelect').value; rep++) {
            if (document.getElementById(`${dayTag}${rep}`).classList.contains(calSelectedDayTag)) {
              prevMondayLastWeek = document.getElementById(`${dayTag}${rep}`).id.replace('day', '');
              prevMonthHHMM = Date.parse(document.getElementById('CalendarDate').value);
              calendarDatesFillIn(
                new Date(prevMonthHHMM),
                document.getElementById('DaysSelect').value,
                prevMondayLastWeek
              );
              // return lastEdittedContact;
            }
          }

          contactData = data;
          return contactData;
        });
      }
    });
  }

  setInterval(autoPopulateSearchBarDropDown, 1000);

  // window.addEventListener('load', limitFunc);
  // document.addEventListener('DOMContentLoaded', limitFunc);
  window.addEventListener('resize', limitFunc);
  // ^^^ End coding here for SidePanel Module ^^^
}

/////////////////////////////////////////////////////////////
// vvv This scans if all DOM Elements have been retrieved vvv
const isSidePanelElementLoaded = async () => {
  while (DOMElements === undefined) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};
isSidePanelElementLoaded().then(() => {
  console.log('retrieved module {sidePanel}');
  sidePanelModule();
});
