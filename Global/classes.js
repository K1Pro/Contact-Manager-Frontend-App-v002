function classesRequired() {
  // vvv Start coding here for Retrieval Module vvv
  class ContactTask {
    constructor(Date, Description, CheckBox, Author) {
      this.Date = Date;
      this.Description = Description;
      this.CheckBox = CheckBox;
      this.Author = Author;
    }
  }
  // ^^^ End coding here for Retrieval Module ^^^
}
// vvv All retrieved elements should be declared here vvv

// ^^^ All retrieved elements should be declared here ^^^

// vvv This scans for all separate HTML Modules vvv
isElementLoaded('#CalendarHTMLModule').then(() => {
  isElementLoaded('#ContactTasksHTMLModule').then(() => {
    isElementLoaded('#EmailHTMLModule').then(() => {
      isElementLoaded('#SidePanelHTMLModule').then(() => {
        console.log('retrieved all DOM elements {for classes module}');
        classesRequired();
      });
    });
  });
});
