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
    tag: function () {
      return `${rnwlTag}${this.rnwlCntct}${this.rep + 1}`;
    },
    param: function (calDates, rnwlDates) {
      return rnwlDates.toJSON().slice(5, 10);
    },
    srtMthd: false,
    cmpltd: lastReviewDateNoDash >= calDateNoDash,
    // cmpltd: function (type) {
    //   if (type == this.evntType) {
    //     lastReviewDateNoDash >= calDateNoDash
    //       ? calCntct.classList.add(rCmpltdTag)
    //       : calCntct.classList.add(rNotCmpltdTag);
    //   }
    // },
    evntAthr: rnwlCntct ? rnwlCntct.LastEditedBy : false,
  },
  {
    evntType: 'event',
    shrtCut: 'e',
    apiPath: contactsWithCalEventsPath,
    tag: function () {
      return `Event${this.sortedCalEvents}`;
    },
    param: function (calDates, rnwlDates) {
      return calDates.toJSON().slice(0, 10);
    },
    srtMthd: rnwlCntct
      ? (sortedCalEvents = rnwlCntct.CalendarEvents.filter((obj) => {
          return obj.DateYYYYMMDD === `${calDates.toJSON().slice(0, 10)}`;
        }))
      : false,
    cmpltd: sortedCalEvents ? sortedCalEvents[0].Completed : false,
    // cmpltd: function (type) {
    //   sortedCalEvents[0].Completed ? calCntct.classList.add(eCmpltdTag) : calCntct.classList.add(eNotCmpltdTag);
    // },
    evntAthr: sortedCalEvents ? sortedCalEvents[0].EventAuthor : false,
  },
  // { evntType: 'recur', shrtCut: 'r', apiPath: MonthlyEventsPath },
];

let trialbart = calEvntsArray.forEach((element) => {
  // console.log(element);
});
