console.log('retrieved all global variables');
///////////////////////////////////////////////
let TodaysDate = new Date();
let TodaysDateJSON = new Date();
let lastEditDate, calEvnts;
let daysInWeek = 7;
const srvrURL = `http://192.168.64.9:8000/api/v2/contacts`;
const sortedContactsPath = `/sorted`;
const rnwlPath = `/PolicyRenewDate/`;
const eventsPath = `/events/`;
const phonePath = `?Phone=`;
const contactsWithCalEventsPath = `/ContactsWithEvents/`;
const updateEventPath = `/UpdateEvent/`;
const deleteEmptyFieldPath = `/deleteEmptyField/`;
const lastEdittedContactPath = `/MostRecentEdittedContact?limit=1&sort=-LastEditDate`;
// let randomNumber = `${Math.floor(Math.random() * 100)}${Date.now()}`;
let weekTracker = 0;
const staffMembers = [
  'Bartosz',
  'Hanna',
  'Kamilla',
  'Piotr',
  'Aneta',
  'Yuliya',
  'Eliza',
];
const Statuses = [
  'Customer',
  'Former-Customer',
  'Prospect',
  'Hot-Lead',
  'Cold-Lead',
];
const Sources = [
  'Erie',
  'Allstate',
  'Assurance',
  'Live-Transfer-Lead',
  'Online-Lead',
  'Referral',
];
const renewDateKeys = [
  'Policy1RenewDate',
  'Policy2RenewDate',
  'Policy3RenewDate',
  'Policy4RenewDate',
];
const phoneKey = 'Phone';
