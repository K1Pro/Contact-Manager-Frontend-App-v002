function sidePanelModule() {
  // vvv Start coding here for SidePanel Module vvv
  getJSON(ContactsURL).then((data) => {
    // Populates a dataset into the main search bar
    for (const [key, value] of Object.entries(data.data.contacts)) {
      let FullName = `${value.FirstName} ${value.LastName}`;
      let searchDataSet = document.createElement('option');
      searchDataSet.label = FullName;
      searchDataSet.innerHTML = value.Phone;
      contactsList.appendChild(searchDataSet);
    }
    return data;
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
