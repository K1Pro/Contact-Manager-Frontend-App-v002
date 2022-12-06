console.log('retrieved all global variables');
///////////////////////////////////////////////
let dbArray;
let usertwo;
let TodaysDate = new Date();
let daysInWeek = 7;
let ContactsURL = `http://192.168.64.9:8000/api/v2/contacts/sorted`;
let ContactsPatchURL = `http://192.168.64.9:8000/api/v2/contacts`;
let RenewalURL = `http://192.168.64.9:8000/api/v2/contacts/Policy1RenewMMDD/`;

// we assume this code runs at top level, inside a module
// (async () => {
// let responsetwo = await fetch(ContactsURL);
// usertwo = await responsetwo.json();
// return usertwo;
// })();
