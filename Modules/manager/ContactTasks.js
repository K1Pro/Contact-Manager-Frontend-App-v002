function contactTasksModule() {
  // vvv Start coding here for Contact Tasks Module vvv
  // Accomodates for timezone difference below:
  // new Date(Date.now() + 1000 /*sec*/ * -new Date().getTimezoneOffset() /*min*/ * 60 /*hour*/)
  // Bases timezone off Chicago time
  createEventTime.value = new Date(Date.now() + 1000 /*sec*/ * -300 /*min*/ * 60 /*hour*/).toJSON().slice(0, 16);

  setInterval(function () {
    // if (contactTasksTextArea.value == '') {
    if (
      document.activeElement.id != 'contactTasksTextArea' &&
      document.activeElement.id != 'createEventTime' &&
      document.activeElement.id != 'EventAuthor' &&
      contactTasksTextArea.value == ''
    ) {
      createEventTime.value = new Date(Date.now() + 1000 /*sec*/ * -300 /*min*/ * 60 /*hour*/).toJSON().slice(0, 16);
    }
  }, 60000);

  populateSlctWObj(LastEditedByObj, EventAuthor);
  EventAuthor.value = loggedInUser;

  // ^^^ End coding here for Contact Tasks Module ^^^
}

/////////////////////////////////////////////////////////////
// vvv This scans if all DOM Elements have been retrieved vvv
const isContactTasksElementLoaded = async () => {
  while (DOMElements === undefined) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};
isContactTasksElementLoaded().then(() => {
  console.log('retrieved module {contactTasks}');
  contactTasksModule();
});
