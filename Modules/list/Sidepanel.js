function listSidePanelModule() {
  // vvv Start coding here for Calendar Module vvv

  populateSlctWObj(LastEditedByObj, LastEditedByInput);
  populateSlctWObj(LastEditedByObj, CreatedByInput);
  populateSlctWObj(StatusObj, StatusInput);
  populateSlctWObj(SourceObj, SourceInput);

  document.querySelectorAll('.contctKeysCheck').forEach((cntctCheckBox) => {
    cntctCheckBox.addEventListener('click', function (e) {
      localStorage.setItem(`BundleContactList-${e.target.id.slice(0, -5)}`, e.target.checked);
      allContctKeysCheckedArray = [...allContctKeysCheck].filter((el) => el.checked == true);
      valueArray = allContctKeysCheckedArray.map((element) => {
        return element.id.slice(0, -5);
      });
      allContctKeysInputArray = [...allContctKeysInput].filter((el) => el.value != '');
      inputArray = allContctKeysInputArray.map((element) => {
        return `&${element.id.slice(0, -5)}=${element.value}`;
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

      getJSON(`${srvrURL}?fields=${valueArray.toString()}${inputArray.join('')}`).then((data) => {
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

  // document.querySelectorAll('.contctKeysInput').forEach((cntctCheckBox) => {
  //   cntctCheckBox.addEventListener('change', function (e) {
  //     // console.log(e.target.value);
  //     listCheckBox = document.getElementById(`${e.target.id.slice(0, -5)}Check`);
  //     if (listCheckBox.checked == true) {
  //       allContctKeysCheckedArray = [...allContctKeysCheck].filter((el) => el.checked == true);
  //       valueArray = allContctKeysCheckedArray.map((element) => {
  //         return element.id.slice(0, -5);
  //       });
  //       allContctKeysInputArray = [...allContctKeysInput].filter((el) => el.value != '');
  //       inputArray = allContctKeysInputArray.map((element) => {
  //         return `&${element.id.slice(0, -5)}=${element.value}`;
  //       });
  //       // console.log(inputArray);
  //       contactListHeaders.innerHTML = '';
  //       contactList.innerHTML = '';
  //       for (key in allContctKeysCheck) {
  //         if (allContctKeysCheck[key].className) {
  //           if (allContctKeysCheck[key].checked == true) {
  //             tableHeader = document.createElement('th');
  //             tableHeader.scope = 'row';
  //             tableHeader.innerHTML = allContctKeysCheck[key].id.slice(0, -5);
  //             contactListHeaders.appendChild(tableHeader);
  //           }
  //         }
  //       }

  //       getJSON(`${srvrURL}?fields=${valueArray.toString()}${inputArray.join('')}`).then((data) => {
  //         data.data.contacts.forEach((contact) => {
  //           tableRow = document.createElement('tr');
  //           contactList.appendChild(tableRow);
  //           valueArray.forEach((value) => {
  //             tableData = document.createElement('td');
  //             contact[value] ? (tableData.innerHTML = contact[value]) : (tableData.innerHTML = '');
  //             tableRow.appendChild(tableData);
  //           });
  //         });
  //       });
  //     }
  //   });
  // });

  listAddCntctBtn.addEventListener('click', function (e) {
    document.getElementById('CreateDateInput').value = TodaysDate.toISOString().slice(0, 10);
    allContctKeysInputArray = [...allContctKeysInput].filter((el) => el.value != '');
    inputArray = allContctKeysInputArray.map((element) => {
      return [element.id.slice(0, -5), element.value];
    });
    fetch(`${srvrURL}`, {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(inputArray)),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then(() => {
        snackbar(`Successfully added new contact!`);
        [...allContctKeysInput].forEach((element) => {
          document.getElementById(element.id).value = '';
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
  console.log('retrieved module {list side panel}');
  listSidePanelModule();
});
