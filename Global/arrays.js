const recurEvntsArray = ['WeeklyEvents', 'MonthlyEvents', 'SemiAnnualEvents', 'AnnualEvents'];
const LastEditedByS = ['Bartosz', 'Hanna', 'Kamilla', 'Piotr', 'Aneta', 'Yuliya', 'Eliza'];
const recrrngEvntsArray = ['Weekly', 'Monthly', 'SemiAnnual', 'Annual'];
const StatusS = ['Customer', 'Former-customer', 'Prospect', 'Hot-Lead', 'Cold-Lead', 'Do-Not-Call', 'Do-Not-Renew'];
const SourceS = ['Erie', 'Allstate', 'Assurance', 'Live-Transfer-Lead', 'Online-Lead', 'Referral'];
const DaysS = ['Days (28)', 'Days (21)', 'Days (14)', 'Days (07)', 'Days (01)'];

const renewDateKeys = ['Policy1RenewDate', 'Policy2RenewDate', 'Policy3RenewDate', 'Policy4RenewDate'];

let calEvntsArray = [
  {
    evntType: 'renewal',
    shrtCut: 'r',
    apiPath: rnwlPath,
    param: function (calDates, rnwlDates) {
      return rnwlDates.toJSON().slice(5, 10);
    },
  },
  {
    evntType: 'event',
    shrtCut: 'e',
    apiPath: contactsWithCalEventsPath,
    param: function (calDates, rnwlDates) {
      return calDates.toJSON().slice(0, 10);
    },
  },
  {
    evntType: 'recurring', // weekly
    shrtCut: 'w',
    apiPath: '/WeeklyEvents/',
    param: function (calDates, rnwlDates) {
      return `${new Date(calDates.toJSON().slice(0, 10)).getDay()}`;
    },
  },
  {
    evntType: 'recurring', //monthly
    shrtCut: 'm',
    apiPath: MonthlyEventsPath,
    param: function (calDates, rnwlDates) {
      return calDates.toJSON().slice(8, 10);
    },
  },
  {
    evntType: 'recurring', //semiannual
    shrtCut: 'sa',
    apiPath: /SemiAnnualEvents/,
    param: function (calDates, rnwlDates) {
      return calDates.toJSON().slice(5, 10);
    },
  },
  {
    evntType: 'recurring', //annual
    shrtCut: 'a',
    apiPath: /AnnualEvents/,
    param: function (calDates, rnwlDates) {
      return calDates.toJSON().slice(5, 10);
    },
  },
];

let cntctTasksArray = [
  {
    taskType: 'CalendarEvents',
    apiPath: eventsPath,
    CSSstyle: 'event',
    placeHolder: 'ContactTaskList',
    DropDown: LastEditedByS,
    checkBox: true,
  },
  {
    taskType: 'RecurEvents',
    apiPath: recurPath,
    CSSstyle: 'recur',
    placeHolder: 'RecurringTaskList',
    DropDown: recrrngEvntsArray,
    checkBox: true,
  },
];

// Probably delete this
// let dynamic = {
//   Status: StatusS,
//   SourceS: SourceS,
//   LastEditedByS: LastEditedByS,
// };
