function listSidePanelModule() {
  // vvv Start coding here for Calendar Module vvv

  document.querySelectorAll('.contctKeysCheck').forEach((cntctCheckBox) => {
    cntctCheckBox.addEventListener('click', function (e) {
      localStorage.setItem(`BundleContactList-${e.target.id.slice(0, -5)}`, e.target.checked);
      allContctKeysCheck = document.querySelectorAll('.contctKeysCheck');
      allContctKeysCheckedArray = [...allContctKeysCheck].filter((el) => el.checked == true);
      let allContctKeysNameArray = [...allContctKeysCheck].map((el) => el.id);
      valueArray = [];
      allContctKeysCheckedArray.forEach((element) => {
        valueArray.push(element.id.slice(0, -5));
      });

      contactListHeaders.innerHTML = '';
      contactList.innerHTML = '';
      for (key in allContctKeysCheck) {
        if (allContctKeysCheck[key].className) {
          if (allContctKeysCheck[key].checked == true) {
            tableHeader = document.createElement('th');
            tableHeader.scope = 'row';
            tableHeader.innerHTML = allContctKeysCheck[key].id.slice(0, -5);
            contactListHeaders.appendChild(tableHeader);
          }
        }
      }

      getJSON(`${srvrURL}?fields=${valueArray.toString()}`).then((data) => {
        data.data.contacts.forEach((contact) => {
          tableRow = document.createElement('tr');
          contactList.appendChild(tableRow);
          valueArray.forEach((value) => {
            tableData = document.createElement('td');
            contact[value] ? (tableData.innerHTML = contact[value]) : (tableData.innerHTML = '');
            tableRow.appendChild(tableData);
          });
        });
      });
    });
  });

  // ^^^ End coding here for Calendar Module ^^^
}

/////////////////////////////////////////////////////////////
// vvv This scans if all DOM Elements have been retrieved vvv
const isListSidePanelElementLoaded = async () => {
  while (DOMElements === undefined) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};
isListSidePanelElementLoaded().then(() => {
  console.log('retrieved module {contact list}');
  listSidePanelModule();
});
