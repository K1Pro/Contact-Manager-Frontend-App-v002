function contactTasksModule() {
  // vvv Start coding here for Contact Tasks Module vvv
  createEventTime.value = TodaysDate.toJSON().slice(0, 16);
  setInterval(function () {
    // if (contactTasksTextArea.value == '') {
    console.log(new Date().toJSON().slice(0, 19));
    if (document.activeElement.id != 'contactTasksTextArea' && contactTasksTextArea.value == '') {
      createEventTime.value = new Date().toJSON().slice(0, 19);
      // console.log(document.activeElement.id);
    }
  }, 60000);

  populateSlctWObj(LastEditedByObj, EventAuthor);
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
