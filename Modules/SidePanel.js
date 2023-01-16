function sidePanelModule() {
  // vvv Start coding here for SidePanel Module vvv
  populateSelect(LastEditedByS, LastEditedBy);
  populateSelect(StatusS, Status);
  populateSelect(SourceS, Source);
  loadSidePanel(`${srvrURL}${lastEdittedContactPath}`);
  getJSON(`${srvrURL}${sortedContactsPath}`).then((data) => {
    // Populates a dataset into the main search bar
    for (const [key, value] of Object.entries(data.data.contacts)) {
      let FullName = `${value.FirstName} ${value.LastName}`;
      let searchDataSet = document.createElement('option');
      searchDataSet.label = FullName;
      searchDataSet.innerHTML = value.Phone;
      contactsList.appendChild(searchDataSet);
      if (value.SpouseName && value.SpouseLastName) {
        // console.log(`${value.SpouseName} ${value.SpouseLastName}`);
        let SpouseFullName = `${value.SpouseName} ${value.SpouseLastName}`;
        let spouseSearchDataSet = document.createElement('option');
        spouseSearchDataSet.label = SpouseFullName;
        spouseSearchDataSet.innerHTML = value.Phone;
        contactsList.appendChild(spouseSearchDataSet);
      }
    }
    // return data;
  });
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
