function elementsRequired() {
  // vvv Start coding here for Retrieval Module vvv
  contactListHeaders = document.getElementById('contactListHeaders');
  contactList = document.getElementById('contactList');
  allContctKeysCheck = document.querySelectorAll('.contctKeysCheck');
  allContctKeysInput = document.querySelectorAll('.contctKeysInput');
  listAddCntctBtn = document.getElementById('listAddCntctBtn');

  // ^^^ End coding here for Retrieval Module ^^^
  DOMElements = 'Loaded';
}
// vvv All retrieved elements should be declared here vvv
let DOMElements,
  contactListHeaders,
  contactList,
  allContctKeysCheck,
  allContctKeysInput,
  listAddCntctBtn,
  listCheckBox,
  inputArray,
  inputValue,
  valueArray,
  allContctKeysCheckedArray,
  storedCheckBoxValue,
  storedInputValue,
  lastSortFilter;
// ^^^ All retrieved elements should be declared here ^^^

// vvv This scans for all separate HTML Modules vvv
isElementLoaded('#ListSidePanelHTMLModule').then(() => {
  isElementLoaded('#TableHTMLModule').then(() => {
    console.log('retrieved all DOM elements {for elements retrieved module}');
    elementsRequired();
  });
});

// import { ContactsURL } from './date.js';
