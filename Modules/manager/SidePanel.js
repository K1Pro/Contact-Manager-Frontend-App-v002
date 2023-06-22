function sidePanelModule() {
  // vvv Start coding here for SidePanel Module vvv
  populateSlctWObj(LastEditedByObj, LastEditedBy);
  populateSlctWObj(StatusObj, Status);
  populateSlctWObj(SourceObj, Source);
  loadSidePanel(`${srvrURL}${lastEdittedContactPath}`);

  // Populates a dataset into the main search bar
  getJSON(`${srvrURL}${sortedContactsPath}`).then((data) => {
    populateSearchBar(data);
  });

  // Retrieves the last created contact once page is loaded
  getJSON(`${srvrURL}${lastCreatedContactPath}`).then((data) => {
    lastCreatedContact = data.data.contacts[0].CreateDate;
    return lastCreatedContact;
  });

  // Detects the last created contact in an interval and repopulates the search bar upon detection, there is a very weird bug here
  setInterval(function () {
    getJSON(`${srvrURL}${lastCreatedContactPath}`).then((data) => {
      if (lastCreatedContact == data.data.contacts[0].CreateDate) {
        // console.log(`Last created: ${data.data.contacts[0].LastName}`);
      } else {
        console.log(`Last created: ${data.data.contacts[0].LastName}`);
        lastCreatedContact = data.data.contacts[0].CreateDate;

        // contactSearch.removeEventListener('change', function (e) {
        //   contactSearchChange(e);
        // });
        // contactSearch.removeEventListener('keyup', function (e) {
        //   contactSearchKeyUp(e);
        // });
        // This removes existing Search datalist and populates a new one if newly created contact is detected
        contactsList.remove();
        contactsList = document.createElement('datalist');
        contactsList.id = 'contactsList';
        contactSearch.appendChild(contactsList);
        getJSON(`${srvrURL}${sortedContactsPath}`).then((newData) => {
          populateSearchBar(newData);
        });
        // contactSearch.addEventListener('change', function (e) {
        //   contactSearchChange(e);
        // });
        // contactSearch.addEventListener('keyup', function (e) {
        //   contactSearchKeyUp(e);
        // });

        return lastCreatedContact;
      }
    });
  }, 1000);

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
