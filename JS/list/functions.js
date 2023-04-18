console.log('retrieved contact list functions');
///////////////////////////////////////////////

function populateListTable(sortFilter) {
  rep = 0;
  contactListHeaders.innerHTML = '';
  contactList.innerHTML = '';
  allContctKeysCheck.forEach((CheckBox) => {
    storedCheckBoxValue = localStorage.getItem(`BundleContactList-${CheckBox.id.slice(0, -5)}`);
    rep++;
    if (storedCheckBoxValue == 'true') {
      document.getElementById(CheckBox.id).checked = true;
      tableHeader = document.createElement('th');
      tableHeader.scope = 'row';
      tableHeader.innerHTML = CheckBox.id.slice(0, -5);
      tableHeader.addEventListener('click', () => {
        populateListTable(CheckBox.id.slice(0, -5));
        console.log('check');
      });
      contactListHeaders.appendChild(tableHeader);
    }
    if (rep == allContctKeysCheck.length) {
      allContctKeysCheck = document.querySelectorAll('.contctKeysCheck');
      allContctKeysCheckedArray = [...allContctKeysCheck].filter((el) => el.checked == true);
      valueArray = [];
      allContctKeysCheckedArray.forEach((element) => {
        valueArray.push(element.id.slice(0, -5));
      });

      getJSON(`${srvrURL}?fields=${valueArray.toString()}&sort=${sortFilter}`).then((data) => {
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
}
