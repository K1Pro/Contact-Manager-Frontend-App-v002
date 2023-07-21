console.log('retrieved contact list functions');
///////////////////////////////////////////////

function populateListTable(contactData) {
  allContctKeysCheck = document.querySelectorAll('.contctKeysCheck');
  allContctKeysCheck.forEach((CheckBox) => {
    storedCheckBoxValue = localStorage.getItem(`BundleContactList-${CheckBox.id.slice(0, -5)}`);
    if (storedCheckBoxValue == 'true') document.getElementById(CheckBox.id).checked = true;
  });
  allContctKeysCheckedArray = [...allContctKeysCheck].filter((el) => el.checked == true);

  // If there is nothing checked, these defaults are implemented
  if (allContctKeysCheckedArray.length < 1) {
    document.getElementById('FirstNameCheck').checked = true;
    document.getElementById('LastNameCheck').checked = true;
    document.getElementById('PhoneCheck').checked = true;
    document.getElementById('SourceCheck').checked = true;
    document.getElementById('StatusCheck').checked = true;
    document.getElementById('LastEditDateCheck').checked = true;
    localStorage.setItem(`BundleContactList-FirstName`, `true`);
    localStorage.setItem(`BundleContactList-LastName`, `true`);
    localStorage.setItem(`BundleContactList-Phone`, `true`);
    localStorage.setItem(`BundleContactList-Source`, `true`);
    localStorage.setItem(`BundleContactList-Status`, `true`);
    localStorage.setItem(`BundleContactList-LastEditDate`, `true`);
    localStorage.setItem(`BundleContactList-LastSortFilter`, `-LastEditDate`);
    populateListTable(contactData);
    return;
  }
  checkBoxSlctdArray = [];
  // inputFilledInArray = [];
  checkAndInputObject = {};

  allContctKeysCheckedArray.forEach((element) => {
    if (document.getElementById(`${element.id.slice(0, -5)}Input`).value)
      checkAndInputObject[element.id.slice(0, -5)] = document.getElementById(`${element.id.slice(0, -5)}Input`).value;
    checkBoxSlctdArray.push(element.id.slice(0, -5));
    // if (document.getElementById(`${element.id.slice(0, -5)}Input`).value) {
    //   inputValue = document.getElementById(`${element.id.slice(0, -5)}Input`).value;
    //   // inputFilledInArrayQuery.push(`&${element.id.slice(0, -5)}=${inputValue}`);
    //   inputFilledInArray.push(inputValue);
    // }
  });
  lastSortFilter = localStorage.getItem(`BundleContactList-LastSortFilter`);

  contactListHeaders.innerHTML = '';
  contactList.innerHTML = '';

  // This below getJSON function demonstrates how to use an array to query
  // getJSON(`${srvrURL}?fields=${checkBoxSlctdArray.toString()}${inputFilledInArrayQuery.length ? inputFilledInArrayQuery.join('') : ''}&sort=${lastSortFilter}`).then((data) => {})

  // This populates the main table header based on localstorage
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
        // populateListTable(localStorage.getItem(`BundleContactList-LastSortFilter`));
        populateListTable(contactData);
      });
      contactListHeaders.appendChild(tableHeader);
    }
  });

  // compares two objects, the database and the dynamically populated one by the inputs
  let filteredData = contactData.data.contacts.filter(function (item) {
    for (let key in checkAndInputObject) {
      if (
        !item[key]
          ?.replaceAll(' ', '')
          .replaceAll('-', '')
          .replaceAll('(', '')
          .replaceAll(')', '')
          .toLowerCase()
          .includes(
            checkAndInputObject[key]
              .replaceAll(' ', '')
              .replaceAll('-', '')
              .replaceAll('(', '')
              .replaceAll(')', '')
              .toLowerCase()
          )
      )
        return false;
    }
    return true;
  });

  // This populates the main table body based on stored contacts database
  filteredData.forEach((contact) => {
    tableRow = document.createElement('tr');
    contactList.appendChild(tableRow);
    checkBoxSlctdArray.forEach((value) => {
      tableData = document.createElement('td');
      contact[value] ? (tableData.innerHTML = contact[value]) : (tableData.innerHTML = '');
      tableRow.appendChild(tableData);
    });
  });
}
