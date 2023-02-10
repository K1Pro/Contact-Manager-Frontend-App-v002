const recurEvntsArray = ['WeeklyEvents', 'MonthlyEvents', 'SemiAnnualEvents', 'AnnualEvents'];
const LastEditedByS = ['Bartosz', 'Hanna', 'Kamilla', 'Piotr', 'Aneta', 'Yuliya', 'Eliza'];
const StatusS = ['Customer', 'Former-customer', 'Prospect', 'Hot-Lead', 'Cold-Lead', 'Do-Not-Call', 'Do-Not-Renew'];
const SourceS = ['Erie', 'Allstate', 'Assurance', 'Live-Transfer-Lead', 'Online-Lead', 'Referral'];
const DaysS = ['Days (28)', 'Days (21)', 'Days (14)', 'Days (07)', 'Days (01)'];

const renewDateKeys = ['Policy1RenewDate', 'Policy2RenewDate', 'Policy3RenewDate', 'Policy4RenewDate'];

let calEvntsArray = [
  {
    evntType: 'renewal',
    shrtCut: 'r',
    apiPath: rnwlPath,
    idTag: function () {
      return `${rnwlTag}${this.rnwlCntct}${this.rep + 1}`;
    },
    param: function (calDates, rnwlDates) {
      return rnwlDates.toJSON().slice(5, 10);
    },
  },
  {
    evntType: 'event',
    shrtCut: 'e',
    apiPath: contactsWithCalEventsPath,
    idTag: function () {
      return `Event${this.sortedCalEvents}`;
    },
    param: function (calDates, rnwlDates) {
      return calDates.toJSON().slice(0, 10);
    },
  },
  {
    evntType: 'monthly',
    shrtCut: 'm',
    apiPath: MonthlyEventsPath,
    idTag: function () {
      return `monthly${this.monthlyCalEvents}`;
    },
    param: function (calDates, rnwlDates) {
      return calDates.toJSON().slice(8, 10);
    },
  },
];

// Probably delete this
// let dynamic = {
//   Status: StatusS,
//   SourceS: SourceS,
//   LastEditedByS: LastEditedByS,
// };
