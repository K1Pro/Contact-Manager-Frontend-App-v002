const recurEvntsArray = ['WeeklyEvents', 'MonthlyEvents', 'SemiAnnualEvents', 'AnnualEvents'];

const LastEditedByS = ['Bartosz', 'Hanna', 'Kamilla', 'Piotr', 'Aneta', 'Yuliya', 'Eliza'];
const StatusS = ['Customer', 'Former-customer', 'Prospect', 'Hot-Lead', 'Cold-Lead', 'Do-Not-Call', 'Do-Not-Renew'];

const SourceS = ['Erie', 'Allstate', 'Assurance', 'Live-Transfer-Lead', 'Online-Lead', 'Referral'];

const DaysS = ['Days (28)', 'Days (21)', 'Days (14)', 'Days (07)', 'Days (01)'];

// let dynamic = {
//   Status: StatusS,
//   SourceS: SourceS,
//   LastEditedByS: LastEditedByS,
// };

const renewDateKeys = ['Policy1RenewDate', 'Policy2RenewDate', 'Policy3RenewDate', 'Policy4RenewDate'];

let calEvntsArray = [
  {
    evntType: 'renewal',
    shrtCut: 'r',
    apiPath: rnwlPath,
    cmpltd: lastReviewDateNoDash >= calDateNoDash,
    evntAthr: rnwlCntct ? rnwlCntct.LastEditedBy : false,
  },
  {
    evntType: 'event',
    shrtCut: 'e',
    apiPath: contactsWithCalEventsPath,
    cmpltd: sortedCalEvents ? sortedCalEvents[0].Completed : false,
    evntAthr: sortedCalEvents ? sortedCalEvents[0].EventAuthor : false,
  },
  { evntType: 'recur', shrtCut: 'r', apiPath: MonthlyEventsPath },
];

let trialbart = calEvntsArray.forEach((element) => {
  console.log(element);
});
console.log(trialbart);
