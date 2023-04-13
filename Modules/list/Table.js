function tableModule() {
  // vvv Start coding here for Calendar Module vvv

  rep = 0;
  allContctKeysCheck.forEach((CheckBox) => {
    storedCheckBoxValue = localStorage.getItem(`BundleContactList-${CheckBox.id.slice(0, -5)}`);
    rep++;
    if (storedCheckBoxValue == 'true') {
      document.getElementById(CheckBox.id).checked = true;
      tableHeader = document.createElement('th');
      tableHeader.scope = 'row';
      tableHeader.innerHTML = CheckBox.id.slice(0, -5);
      contactListHeaders.appendChild(tableHeader);
    }
    if (rep == allContctKeysCheck.length) {
      allContctKeysCheck = document.querySelectorAll('.contctKeysCheck');
      allContctKeysCheckedArray = [...allContctKeysCheck].filter((el) => el.checked == true);
      valueArray = [];
      allContctKeysCheckedArray.forEach((element) => {
        valueArray.push(element.id.slice(0, -5));
      });

      getJSON(`${srvrURL}?fields=${valueArray.toString()}&sort=LastName`).then((data) => {
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
    }
  });

  [...contactListHeaders.querySelectorAll('*')].forEach((header) =>
    header.addEventListener('click', () => {
      console.log(header.innerHTML);
    })
  );
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
  console.log('retrieved module {contact list}');
  tableModule();
});
