function elementsRequired() {
  // vvv Start coding here for Retrieval Module vvv
  testList = document.getElementById('testList');
  // ^^^ End coding here for Retrieval Module ^^^
  DOMElements = 'Loaded';
}
// vvv All retrieved elements should be declared here vvv
let DOMElements, testList;
// ^^^ All retrieved elements should be declared here ^^^

// vvv This scans for all separate HTML Modules vvv
isElementLoaded('#ContactListHTMLModule').then(() => {
  console.log('retrieved all DOM elements {for elements retrieved module}');
  elementsRequired();
});

// import { ContactsURL } from './date.js';
