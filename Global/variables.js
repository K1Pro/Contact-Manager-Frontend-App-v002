console.log('retrieved all global variables');
///////////////////////////////////////////////
let TodaysDate = new Date();
let TodaysDateJSON = new Date();
let daysInWeek = 7;
const serverURL = `http://192.168.64.9:8000/api/v2/contacts`;
const sortedContactsPath = `/sorted`;
const renewalPath = `/PolicyRenewDate/`;
const eventsPath = `/events/`;
const phonePath = `?Phone=`;
const contactsWithCalEventsPath = `/ContactsWithEvents/`;
const updateEventPath = `/UpdateEvent/`;
const deleteEmptyFieldPath = `/deleteEmptyField/`;
const lastEdittedContactPath = `/MostRecentEdittedContact?limit=1&sort=-LastEditDate`;
let randomNumber = `${Math.floor(Math.random() * 100)}${Date.now()}`;
let tempNo;
let weekTracker = 0;
const staffMembers = [
  'Bartosz',
  'Hanna',
  'Kamilla',
  'Piotr',
  'Aneta',
  'Yuliya',
];
