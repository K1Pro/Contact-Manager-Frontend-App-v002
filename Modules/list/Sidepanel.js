function listSidePanelModule() {
  // vvv Start coding here for Calendar Module vvv

  populateSlctWObj(LastEditedByObj, LastEditedByInput);
  populateSlctWObj(LastEditedByObj, CreatedByInput);
  populateSlctWObj(StatusObj, StatusInput);
  populateSlctWObj(SourceObj, SourceInput);

  document.querySelectorAll('.contctKeysCheck').forEach((cntctCheckBox) => {
    cntctCheckBox.addEventListener('click', function (e) {
      localStorage.setItem(`BundleContactList-${e.target.id.slice(0, -5)}`, e.target.checked);
      abortCalendarDatesFillIn();
      populateListTable();
    });
  });

  document.querySelectorAll('.contctKeysInput').forEach((cntctCheckBox) => {
    storedInputValue = localStorage.getItem(`BundleContactList-${cntctCheckBox.id}`);
    cntctCheckBox.value = storedInputValue;
    cntctCheckBox.addEventListener('change', function (e) {
      localStorage.setItem(`BundleContactList-${e.target.id}`, e.target.value);
      abortCalendarDatesFillIn();
      populateListTable();
    });
  });

  // Custom First Indexes to Side Panel Selects VVVVVVVVVV
  // States Input
  let stateSelect = document.getElementById('StateInput');
  let newFirstOpt = new Option('States (All)', '');
  stateSelect.insertBefore(newFirstOpt, stateSelect.firstChild);
  if (!localStorage.getItem(`BundleContactList-StateInput`)) {
    document.getElementById('StateInput').selectedIndex = 0;
  }
  // Policy 1 Type
  let Policy1TypeInput = document.getElementById('Policy1TypeInput');
  let newFirstOpt1 = new Option('Policy 1 Type', '');
  Policy1TypeInput.insertBefore(newFirstOpt1, Policy1TypeInput.firstChild);
  if (!localStorage.getItem(`BundleContactList-Policy1TypeInput`)) {
    document.getElementById('Policy1TypeInput').selectedIndex = 0;
  }

  // Policy 2 Type
  let Policy2TypeInput = document.getElementById('Policy2TypeInput');
  let newFirstOpt2 = new Option('Policy 2 Type', '');
  Policy2TypeInput.insertBefore(newFirstOpt2, Policy2TypeInput.firstChild);
  if (!localStorage.getItem(`BundleContactList-Policy2TypeInput`)) {
    document.getElementById('Policy2TypeInput').selectedIndex = 0;
  }

  // Policy 3 Type
  let Policy3TypeInput = document.getElementById('Policy3TypeInput');
  let newFirstOpt3 = new Option('Policy 3 Type', '');
  Policy3TypeInput.insertBefore(newFirstOpt3, Policy3TypeInput.firstChild);
  if (!localStorage.getItem(`BundleContactList-Policy3TypeInput`)) {
    document.getElementById('Policy3TypeInput').selectedIndex = 0;
  }

  // Policy 4 Type
  let Policy4TypeInput = document.getElementById('Policy4TypeInput');
  let newFirstOpt4 = new Option('Policy 4 Type', '');
  Policy4TypeInput.insertBefore(newFirstOpt4, Policy4TypeInput.firstChild);
  if (!localStorage.getItem(`BundleContactList-Policy4TypeInput`)) {
    document.getElementById('Policy4TypeInput').selectedIndex = 0;
  }

  // Custom First Indexes to Side Panel Selects ^^^^^^^^

  listAddCntctBtn.addEventListener('click', function (e) {
    document.getElementById('CreateDateInput').value = TodaysDate.toISOString().slice(0, 10);
    document.getElementById('LastEditDateInput').value = TodaysDate.toISOString().slice(0, 10);
    allContctKeysInputArray = [...allContctKeysInput].filter((el) => el.value != '');
    inputArray = allContctKeysInputArray.map((element) => {
      return [element.id.slice(0, -5), element.value];
    });
    inputArray.push(['LastReviewDate', TodaysDate.toISOString().slice(0, 10)]);
    fetch(`${srvrURL}`, {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(inputArray)),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.text();
      snackbar(`Successfully added new contact!`);
      [...allContctKeysInput].forEach((element) => {
        document.getElementById(element.id).value = '';
      });

      document.querySelectorAll('.contctKeysCheck').forEach((cntctCheckBox) => {
        localStorage.setItem(`BundleContactList-${cntctCheckBox.id.slice(0, -5)}`, cntctCheckBox.checked);
      });

      document.querySelectorAll('.contctKeysInput').forEach((cntctCheckBox) => {
        localStorage.setItem(`BundleContactList-${cntctCheckBox.id}`, cntctCheckBox.value);
      });

      populateListTable();
    });
  });

  resetCntctInptBtn.addEventListener('click', function (e) {
    [...allContctKeysInput].forEach((element) => {
      document.getElementById(element.id).value = '';
    });

    document.querySelectorAll('.contctKeysCheck').forEach((cntctCheckBox) => {
      localStorage.setItem(`BundleContactList-${cntctCheckBox.id.slice(0, -5)}`, cntctCheckBox.checked);
    });

    document.querySelectorAll('.contctKeysInput').forEach((cntctCheckBox) => {
      localStorage.setItem(`BundleContactList-${cntctCheckBox.id}`, cntctCheckBox.value);
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
