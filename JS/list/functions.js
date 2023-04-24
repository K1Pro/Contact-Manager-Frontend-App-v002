console.log('retrieved contact list functions');
///////////////////////////////////////////////

function populateListTable() {
  allContctKeysCheck = document.querySelectorAll('.contctKeysCheck');
  allContctKeysCheck.forEach((CheckBox) => {
    storedCheckBoxValue = localStorage.getItem(`BundleContactList-${CheckBox.id.slice(0, -5)}`);
    if (storedCheckBoxValue == 'true') {
      document.getElementById(CheckBox.id).checked = true;
    }
  });
  allContctKeysCheckedArray = [...allContctKeysCheck].filter((el) => el.checked == true);
  valueArray = [];
  inputArray = [];
  allContctKeysCheckedArray.forEach((element) => {
    valueArray.push(element.id.slice(0, -5));
    if (document.getElementById(`${element.id.slice(0, -5)}Input`).value) {
      inputValue = document.getElementById(`${element.id.slice(0, -5)}Input`).value;
      inputArray.push(`&${element.id.slice(0, -5)}=${inputValue}`);
    }
  });
  console.log(inputArray.join(''));
  lastSortFilter = localStorage.getItem(`BundleContactList-LastSortFilter`);

  getJSON(
    `${srvrURL}?fields=${valueArray.toString()}${inputArray.length ? inputArray.join('') : ''}&sort=${lastSortFilter}`
  ).then((data) => {
    contactListHeaders.innerHTML = '';
    contactList.innerHTML = '';

    allContctKeysCheck.forEach((CheckBox) => {
      storedCheckBoxValue = localStorage.getItem(`BundleContactList-${CheckBox.id.slice(0, -5)}`);
      if (storedCheckBoxValue == 'true') {
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
    });

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
