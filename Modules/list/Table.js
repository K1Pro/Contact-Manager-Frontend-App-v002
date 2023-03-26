function contactListModule() {
  // vvv Start coding here for Calendar Module vvv

  document.querySelectorAll('.contctKeysCheck').forEach((cntctCheckBox) => {
    cntctCheckBox.addEventListener('click', function (e) {
      let allContctKeysCheck = document.querySelectorAll('.contctKeysCheck');
      let allContctKeysCheckedArray = [...allContctKeysCheck].filter((el) => el.checked == true);
      let allContctKeysNameArray = [...allContctKeysCheck].map((el) => el.id);
      // console.log(allContctKeysCheckedArray);
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
            retrievedValue = allContctKeysCheck[key].id.slice(0, -5);
          }
        }
      }

      getJSON(`${srvrURL}?fields=${valueArray.toString()}`).then((data) => {
        data.data.contacts.forEach((contact) => {
          tableRow = document.createElement('tr');
          contactList.appendChild(tableRow);
          valueArray.forEach((value) => {
            tableData = document.createElement('td');
            // th2.scope = 'row';
            contact[value] ? (tableData.innerHTML = contact[value]) : (tableData.innerHTML = '');
            tableRow.appendChild(tableData);
          });
        });
      });
    });
  });

  //populates the table with the data from the database
  function populateTable(contactInfo) {
    tr = document.createElement('tr');
    contactList.appendChild(tr);
    th = document.createElement('th');
    th.scope = 'row';
    th.innerHTML = contactInfo.id;
    tr.appendChild(th);

    for (let rep = 0; rep < contactListHeaders.length; rep++) {
      let contactListHeadersIDs = contactListHeaders[rep].id;
      buttonCheck = document.getElementById(`${contactListHeadersIDs}`);
      if (contactListHeadersIDs) {
        if (buttonCheck.tagName == 'BUTTON') {
          column = buttonCheck.id;

          window['td' + column] = document.createElement('td');
          window['td' + column].innerHTML = contactInfo[column] ? contactInfo[column] : '';
          tr.appendChild(window['td' + column]);
        }
      }
    }
  }
  // ^^^ End coding here for Calendar Module ^^^
}

/////////////////////////////////////////////////////////////
// vvv This scans if all DOM Elements have been retrieved vvv
const isContactListElementLoaded = async () => {
  while (DOMElements === undefined) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};
isContactListElementLoaded().then(() => {
  console.log('retrieved module {contact list}');
  contactListModule();
});
