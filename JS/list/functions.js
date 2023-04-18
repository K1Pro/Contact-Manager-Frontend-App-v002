console.log('retrieved contact list functions');
///////////////////////////////////////////////

function populateListTable(sortFilter) {
  rep = 0;
  contactListHeaders.innerHTML = '';
  contactList.innerHTML = '';
  lastSortFilter = localStorage.getItem(`BundleContactList-LastSortFilter`);
  console.log(lastSortFilter);
  allContctKeysCheck.forEach((CheckBox) => {
    storedCheckBoxValue = localStorage.getItem(`BundleContactList-${CheckBox.id.slice(0, -5)}`);
    rep++;

    if (storedCheckBoxValue == 'true') {
      document.getElementById(CheckBox.id).checked = true;
      tableHeader = document.createElement('th');
      tableHeader.scope = 'row';
      tableHeader.innerHTML = CheckBox.id.slice(0, -5);
      tableHeader.addEventListener('click', () => {
        if (CheckBox.id.slice(0, -5) == lastSortFilter) {
          localStorage.setItem(`BundleContactList-LastSortFilter`, `-${CheckBox.id.slice(0, -5)}`);
        } else if (`-${CheckBox.id.slice(0, -5)}` == `${lastSortFilter}`) {
          localStorage.setItem(`BundleContactList-LastSortFilter`, `${CheckBox.id.slice(0, -5)}`);
        } else {
          localStorage.setItem(`BundleContactList-LastSortFilter`, `${CheckBox.id.slice(0, -5)}`);
        }
        populateListTable(localStorage.getItem(`BundleContactList-LastSortFilter`));
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

      getJSON(`${srvrURL}?fields=${valueArray.toString()}&sort=${lastSortFilter}`).then((data) => {
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
