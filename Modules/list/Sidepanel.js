function listSidePanelModule() {
  // vvv Start coding here for Calendar Module vvv

  populateSlctWObj(LastEditedByObj, LastEditedByInput);
  populateSlctWObj(LastEditedByObj, CreatedByInput);
  populateSlctWObj(StatusObj, StatusInput);
  populateSlctWObj(SourceObj, SourceInput);

  document.querySelectorAll('.contctKeysCheck').forEach((cntctCheckBox) => {
    cntctCheckBox.addEventListener('click', function (e) {
      localStorage.setItem(`BundleContactList-${e.target.id.slice(0, -5)}`, e.target.checked);
      populateListTable();
    });
  });

  document.querySelectorAll('.contctKeysInput').forEach((cntctCheckBox) => {
    storedInputValue = localStorage.getItem(`BundleContactList-${cntctCheckBox.id}`);
    cntctCheckBox.value = storedInputValue;
    cntctCheckBox.addEventListener('change', function (e) {
      localStorage.setItem(`BundleContactList-${e.target.id}`, e.target.value);
      populateListTable();
    });
  });

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

  resetCntctInptBtn.addEventListener('click', function (e) {
    document.querySelectorAll('.contctKeysInput').forEach((cntctCheckBox) => {
      cntctCheckBox.value = '';
    });
    populateListTable();
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
