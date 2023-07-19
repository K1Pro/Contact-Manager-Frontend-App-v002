const LastEditedByS = ['Bartosz', 'Hanna', 'Kamilla', 'Piotr', 'Aneta', 'Yuliya', 'Eliza'];

const renewDateKeysArray = ['Policy1RenewDate', 'Policy2RenewDate', 'Policy3RenewDate', 'Policy4RenewDate'];

let calEvntsArray = [
  {
    evntType: ['event'],
    shrtCut: 'e',
    apiPath: contactsWithCalEventsPath,
    param: function (calDates, rnwlDates) {
      return calDates.toJSON().slice(0, 10);
    },
  },
  {
    evntType: ['recurring', 'MonthlyEvent1'],
    shrtCut: 'm',
    apiPath: '?MonthlyEvent1DD=',
    param: function (calDates, rnwlDates) {
      return calDates.toJSON().slice(8, 10);
    },
  },
  {
    evntType: ['recurring', 'MonthlyEvent2'],
    shrtCut: 'm',
    apiPath: '?MonthlyEvent2DD=',
    param: function (calDates, rnwlDates) {
      return calDates.toJSON().slice(8, 10);
    },
  },
  {
    evntType: ['recurring', 'YearlyEvent1'],
    shrtCut: 'a',
    apiPath: '?YearlyEvent1MMDD=',
    param: function (calDates, rnwlDates) {
      return calDates.toJSON().slice(5, 10);
    },
  },
  {
    evntType: ['recurring', 'YearlyEvent2'],
    shrtCut: 'a',
    apiPath: '?YearlyEvent2MMDD=',
    param: function (calDates, rnwlDates) {
      return calDates.toJSON().slice(5, 10);
    },
  },
  {
    evntType: ['renewal'],
    shrtCut: 'r',
    apiPath: rnwlPath,
    param: function (calDates, rnwlDates) {
      return rnwlDates.toJSON().slice(5, 10);
    },
  },
];

let cntctTasksArray = [
  {
    taskType: 'CalendarEvents',
    apiPath: eventsPath,
    CSSstyle: 'event',
    placeHolder: 'ContactTaskList',
    dated: true,
    dropDown: true,
    dropDownArray: LastEditedByS,
    checkBoxCMD: true,
  },
];
