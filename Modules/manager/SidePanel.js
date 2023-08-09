function sidePanelModule() {
  // vvv Start coding here for SidePanel Module vvv
  populateSlctWObj(LastEditedByObj, LastEditedBy);
  populateSlctWObj(StatusObj, Status);
  populateSlctWObj(SourceObj, Source);

  // Saves the current database to be used in populating the search bar primarily
  getJSON(`${srvrURL}${searchBarPath}`).then((data) => {
    contactData = data;
    return contactData;
  });

  // Populates an unordered list into the main search bar dropdown upon page load
  getJSON(`${srvrURL}${lastEditted10ContactsPath}${loggedInUser}`).then((data) => {
    contactData = data;
    localStorage.setItem('BundleContactManager-MostRecentContactID', data.data.contacts[0]._id);
    localStorage.setItem('BundleContactManager-MostRecentContactLastName', data.data.contacts[0].LastName);
    localStorage.setItem('BundleContactManager-MostRecentContactEditDate', data.data.contacts[0].LastEditDate);
    console.log(`===============`);
    console.log(`Last Editted: ${localStorage.getItem('BundleContactManager-MostRecentContactID')}`);
    console.log(`Last Editted: ${localStorage.getItem('BundleContactManager-MostRecentContactLastName')}`);
    console.log(`Last Editted: ${localStorage.getItem('BundleContactManager-MostRecentContactEditDate')}`);
    console.log(`===============`);
    populateSearchBarDropDownFunction(contactData, '');
    loadSidePanel(`${srvrURL}/${localStorage.getItem('BundleContactManager-MostRecentContactID')}`);
  });

  // Detects the last created contact in an interval and repopulates the search bar upon detection, there is a very weird bug here
  // This actually was refactored and calendardatesfillin was placed here
  function autoPopulateSearchBarDropDown() {
    // Retrieves the last editted contact once page is loaded
    getJSON(`${srvrURL}${lastEdittedContactPath}`).then((data) => {
      if (data) {
        console.log(
          `No changes, local: ${localStorage.getItem(
            'BundleContactManager-MostRecentContactLastName'
          )} & ${localStorage.getItem('BundleContactManager-MostRecentContactEditDate')} & ${localStorage.getItem(
            'BundleContactManager-MostRecentContactID'
          )}. Retrieved: ${data?.data.contacts[0].LastName} & ${data?.data.contacts[0].LastEditDate} &  ${
            data?.data.contacts[0]._id
          }`
        );
        if (
          localStorage.getItem('BundleContactManager-MostRecentContactEditDate') !=
            data?.data.contacts[0].LastEditDate ||
          localStorage.getItem('BundleContactManager-MostRecentContactID') != data?.data.contacts[0]._id
        ) {
          localStorage.setItem('BundleContactManager-MostRecentContactID', data.data.contacts[0]._id);
          localStorage.setItem('BundleContactManager-MostRecentContactLastName', data.data.contacts[0].LastName);
          localStorage.setItem('BundleContactManager-MostRecentContactEditDate', data.data.contacts[0].LastEditDate);
          console.log(`===============`);
          console.log(`Last Editted: ${localStorage.getItem('BundleContactManager-MostRecentContactID')}`);
          console.log(`Last Editted: ${localStorage.getItem('BundleContactManager-MostRecentContactLastName')}`);
          console.log(`Last Editted: ${localStorage.getItem('BundleContactManager-MostRecentContactEditDate')}`);
          console.log(`===============`);
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
