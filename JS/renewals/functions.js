console.log('retrieved contact list functions');
///////////////////////////////////////////////

function populateListTable(contactData) {
  console.log(contactData.data.contacts);
  let renewalCntcts = contactData.data.contacts;
  let currentTime = new Date();
  let year = currentTime.getFullYear();
  let renewDateSort, reviewDateSort, createDateSort;

  renewalCntcts.forEach((element) => {
    renewDateSort = parseInt(`${year}${element['RenewDate'].replaceAll('-', '')}`);
    reviewDateSort = parseInt(
      `${new Date(element['LastReviewDate']).addDays(28).toISOString().slice(0, 10).replaceAll('-', '')}`
    );
    createDateSort = parseInt(
      `${new Date(element['CreateDate']).addDays(60).toISOString().slice(0, 10).replaceAll('-', '')}`
    );

    tableRow = document.createElement('tr');
    contactList.appendChild(tableRow);

    tableData1 = document.createElement('td');
    element['FirstName'] ? (tableData1.innerHTML = element['FirstName']) : (tableData1.innerHTML = '');
    if (renewDateSort <= reviewDateSort || renewDateSort <= createDateSort) tableData1.classList.add('table-danger');
    tableRow.appendChild(tableData1);

    tableData2 = document.createElement('td');
    element['LastName'] ? (tableData2.innerHTML = element['LastName']) : (tableData2.innerHTML = '');
    if (renewDateSort <= reviewDateSort || renewDateSort <= createDateSort) tableData2.classList.add('table-danger');
    tableRow.appendChild(tableData2);

    // tableData3 = document.createElement('td');
    // element['SpouseName'] ? (tableData3.innerHTML = element['SpouseName']) : (tableData3.innerHTML = '');
    // tableRow.appendChild(tableData3);

    // tableData4 = document.createElement('td');
    // element['SpouseLastName'] ? (tableData4.innerHTML = element['SpouseLastName']) : (tableData4.innerHTML = '');
    // tableRow.appendChild(tableData4);

    // tableData5 = document.createElement('td');
    // element['Address'] ? (tableData5.innerHTML = element['Address']) : (tableData5.innerHTML = '');
    // tableRow.appendChild(tableData5);

    // tableData6 = document.createElement('td');
    // element['Phone'] ? (tableData6.innerHTML = element['Phone']) : (tableData6.innerHTML = '');
    // tableRow.appendChild(tableData6);

    tableData12 = document.createElement('td');
    element['RenewDate']
      ? (tableData12.innerHTML = `${element['RenewDate'].replaceAll('-', '/')}/${year}`)
      : (tableData12.innerHTML = '');
    if (renewDateSort <= reviewDateSort || renewDateSort <= createDateSort) tableData12.classList.add('table-danger');
    tableRow.appendChild(tableData12);

    tableData10 = document.createElement('td');
    element[`Policy${element['RenewNumber']}Type`]
      ? (tableData10.innerHTML = element[`Policy${element['RenewNumber']}Type`])
      : (tableData10.innerHTML = '');
    if (renewDateSort <= reviewDateSort || renewDateSort <= createDateSort) tableData10.classList.add('table-danger');
    tableRow.appendChild(tableData10);

    tableData11 = document.createElement('td');
    element[`Policy${element['RenewNumber']}Number`]
      ? (tableData11.innerHTML = element[`Policy${element['RenewNumber']}Number`])
      : (tableData11.innerHTML = '');
    if (renewDateSort <= reviewDateSort || renewDateSort <= createDateSort) tableData11.classList.add('table-danger');
    tableRow.appendChild(tableData11);

    tableData8 = document.createElement('td');
    element['LastEditedBy'] ? (tableData8.innerHTML = element['LastEditedBy']) : (tableData8.innerHTML = '');
    if (renewDateSort <= reviewDateSort || renewDateSort <= createDateSort) tableData8.classList.add('table-danger');
    tableRow.appendChild(tableData8);

    tableData9 = document.createElement('td');
    element['LastReviewDate']
      ? (tableData9.innerHTML = `${element['LastReviewDate'].slice(5, 10).replaceAll('-', '/')}/${element[
          'LastReviewDate'
        ].slice(0, 4)}`)
      : (tableData9.innerHTML = '');
    if (renewDateSort <= reviewDateSort || renewDateSort <= createDateSort) tableData9.classList.add('table-danger');
    tableRow.appendChild(tableData9);

    tableData7 = document.createElement('td');
    element['Source'] ? (tableData7.innerHTML = element['Source']) : (tableData7.innerHTML = '');
    if (renewDateSort <= reviewDateSort || renewDateSort <= createDateSort) tableData7.classList.add('table-danger');
    tableRow.appendChild(tableData7);

    // tableData13 = document.createElement('td');
    // element['RenewDate']
    //   ? (tableData13.innerHTML = `Renew: ${renewDateSort} - Review: ${reviewDateSort} - Created: ${createDateSort}`)
    //   : (tableData13.innerHTML = '');
    // if (renewDateSort <= reviewDateSort || renewDateSort <= createDateSort) tableData13.classList.add('table-danger');
    // tableRow.appendChild(tableData13);

    // });
  });
  // allContctKeysCheck = document.querySelectorAll('.contctKeysCheck');
  // allContctKeysCheck.forEach((CheckBox) => {
  //   storedCheckBoxValue = localStorage.getItem(`BundleContactList-${CheckBox.id.slice(0, -5)}`);
  //   if (storedCheckBoxValue == 'true') document.getElementById(CheckBox.id).checked = true;
  // });
  // allContctKeysCheckedArray = [...allContctKeysCheck].filter((el) => el.checked == true);

  // // If there is nothing checked, these defaults are implemented
  // if (allContctKeysCheckedArray.length < 1) {
  //   document.getElementById('FirstNameCheck').checked = true;
  //   document.getElementById('LastNameCheck').checked = true;
  //   document.getElementById('PhoneCheck').checked = true;
  //   document.getElementById('SourceCheck').checked = true;
  //   document.getElementById('StatusCheck').checked = true;
  //   document.getElementById('LastEditDateCheck').checked = true;
  //   document.getElementById('LastEditedByCheck').checked = true;
  //   localStorage.setItem(`BundleContactList-FirstName`, `true`);
  //   localStorage.setItem(`BundleContactList-LastName`, `true`);
  //   localStorage.setItem(`BundleContactList-Phone`, `true`);
  //   localStorage.setItem(`BundleContactList-Source`, `true`);
  //   localStorage.setItem(`BundleContactList-Status`, `true`);
  //   localStorage.setItem(`BundleContactList-LastEditDate`, `true`);
  //   localStorage.setItem(`BundleContactList-LastEditedBy`, `true`);
  //   localStorage.setItem(`BundleContactList-LastSortFilter`, `LastEditDate`);
  //   localStorage.setItem(`BundleContactList-LastSortType`, 1);
  //   populateListTable(contactData);
  //   return;
  // }
  // checkBoxSlctdArray = [];
  // // inputFilledInArray = [];
  // checkAndInputObject = {};

  // allContctKeysCheckedArray.forEach((element) => {
  //   if (document.getElementById(`${element.id.slice(0, -5)}Input`).value)
  //     checkAndInputObject[element.id.slice(0, -5)] = document.getElementById(`${element.id.slice(0, -5)}Input`).value;
  //   checkBoxSlctdArray.push(element.id.slice(0, -5));
  //   // if (document.getElementById(`${element.id.slice(0, -5)}Input`).value) {
  //   //   inputValue = document.getElementById(`${element.id.slice(0, -5)}Input`).value;
  //   //   // inputFilledInArrayQuery.push(`&${element.id.slice(0, -5)}=${inputValue}`);
  //   //   inputFilledInArray.push(inputValue);
  //   // }
  // });

  // contactListHeaders.innerHTML = '';
  // contactList.innerHTML = '';

  // // This below getJSON function demonstrates how to use an array to query
  // // getJSON(`${srvrURL}?fields=${checkBoxSlctdArray.toString()}${inputFilledInArrayQuery.length ? inputFilledInArrayQuery.join('') : ''}&sort=${sortKey}`).then((data) => {})

  // // This populates the main table header based on localstorage
  // allContctKeysCheck.forEach((CheckBox) => {
  //   storedCheckBoxValue = localStorage.getItem(`BundleContactList-${CheckBox.id.slice(0, -5)}`);
  //   if (storedCheckBoxValue == 'true') {
  //     tableHeader = document.createElement('th');
  //     tableHeader.scope = 'row';
  //     tableHeader.innerHTML = CheckBox.id.slice(0, -5);
  //     tableHeader.addEventListener('click', () => {
  //       if (
  //         CheckBox.id.slice(0, -5) == localStorage.getItem(`BundleContactList-LastSortFilter`) &&
  //         localStorage.getItem(`BundleContactList-LastSortType`) == '1'
  //       ) {
  //         localStorage.setItem(`BundleContactList-LastSortFilter`, `${CheckBox.id.slice(0, -5)}`);
  //         localStorage.setItem(`BundleContactList-LastSortType`, '-1');
  //       } else if (
  //         CheckBox.id.slice(0, -5) == localStorage.getItem(`BundleContactList-LastSortFilter`) &&
  //         localStorage.getItem(`BundleContactList-LastSortType`) == '-1'
  //       ) {
  //         localStorage.setItem(`BundleContactList-LastSortFilter`, `${CheckBox.id.slice(0, -5)}`);
  //         localStorage.setItem(`BundleContactList-LastSortType`, '1');
  //       } else {
  //         localStorage.setItem(`BundleContactList-LastSortFilter`, `${CheckBox.id.slice(0, -5)}`);
  //         localStorage.setItem(`BundleContactList-LastSortType`, '-1');
  //       }
  //       // populateListTable(localStorage.getItem(`BundleContactList-LastSortFilter`));
  //       populateListTable(contactData);
  //     });
  //     contactListHeaders.appendChild(tableHeader);
  //   }
  // });

  // sortKey = localStorage.getItem(`BundleContactList-LastSortFilter`);
  // sortAscDesc = localStorage.getItem(`BundleContactList-LastSortType`);

  // // compares two objects, the database and the dynamically populated one by the inputs
  // let filteredData = contactData?.data.contacts
  //   .filter(function (item) {
  //     for (let key in checkAndInputObject) {
  //       if (
  //         !item[key]
  //           ?.replaceAll(' ', '')
  //           .replaceAll('-', '')
  //           .replaceAll('(', '')
  //           .replaceAll(')', '')
  //           .toLowerCase()
  //           .includes(
  //             checkAndInputObject[key]
  //               .replaceAll(' ', '')
  //               .replaceAll('-', '')
  //               .replaceAll('(', '')
  //               .replaceAll(')', '')
  //               .toLowerCase()
  //           )
  //       )
  //         return false;
  //     }
  //     return true;
  //   })
  //   .sort(compare);

  // // This populates the main table body based on stored contacts database
  // filteredData?.forEach((contact) => {
  //   tableRow = document.createElement('tr');
  //   contactList.appendChild(tableRow);
  //   checkBoxSlctdArray.forEach((value) => {
  //     tableData = document.createElement('td');
  //     contact[value] ? (tableData.innerHTML = contact[value]) : (tableData.innerHTML = '');
  //     tableRow.appendChild(tableData);
  //   });
  // });
}
