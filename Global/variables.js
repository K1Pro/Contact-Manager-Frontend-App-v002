console.log('retrieved all global variables');
///////////////////////////////////////////////
let TodaysDate = new Date();
let daysInWeek = 7;
let ContactsURL = `http://192.168.64.9:8000/api/v2/contacts/sorted`;
let ContactsPatchURL = `http://192.168.64.9:8000/api/v2/contacts`;
let RenewalURL = `http://192.168.64.9:8000/api/v2/contacts/PolicyRenewDate/`;
let EventsURL = `http://192.168.64.9:8000/api/v2/contacts/events/`;
let PhoneURL = `http://192.168.64.9:8000/api/v2/contacts?Phone=`;
let ContactsWithCalEvents = `http://192.168.64.9:8000/api/v2/contacts/ContactsWithEvents/`;
let UpdateEvent = `http://192.168.64.9:8000/api/v2/contacts/UpdateEvent/`;
let deleteEmptyField = `http://192.168.64.9:8000/api/v2/contacts/deleteEmptyField/`;
let lastEdittedContact = `http://192.168.64.9:8000/api/v2/contacts?page=1&LastEditDate=`;
let randomNumber = `${Math.floor(Math.random() * 100)}${Date.now()}`;
