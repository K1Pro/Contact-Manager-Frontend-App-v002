console.log('retrieved all global variables');
///////////////////////////////////////////////
let TodaysDate = new Date();
let daysInWeek = 7;
const serverURL = `http://192.168.64.9:8000/api/v2/`;
const allContactsPath = `contacts`;
const sortedContactsPath = `contacts/sorted`;
const contactsPatchPath = `contacts/`;
const renewalPath = `contacts/PolicyRenewDate/`;
const eventsPath = `contacts/events/`;
const phonePath = `contacts?Phone=`;
const contactsWithCalEventsPath = `contacts/ContactsWithEvents/`;
const updateEventPath = `contacts/UpdateEvent/`;
const deleteEmptyFieldPath = `contacts/deleteEmptyField/`;
const lastEdittedContactPath = `contacts?limit=1&sort=-LastEditDate`;
let randomNumber = `${Math.floor(Math.random() * 100)}${Date.now()}`;
