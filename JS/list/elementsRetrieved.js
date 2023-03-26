function elementsRequired() {
  // vvv Start coding here for Retrieval Module vvv
  contactListHeaders = document.getElementById('contactListHeaders');
  contactList = document.getElementById('contactList');
  // ^^^ End coding here for Retrieval Module ^^^
  DOMElements = 'Loaded';
}
// vvv All retrieved elements should be declared here vvv
let DOMElements, testList, retrievedValue, valueArray;
// ^^^ All retrieved elements should be declared here ^^^

// vvv This scans for all separate HTML Modules vvv
isElementLoaded('#ContactListHTMLModule').then(() => {
  console.log('retrieved all DOM elements {for elements retrieved module}');
  elementsRequired();
});

// import { ContactsURL } from './date.js';
