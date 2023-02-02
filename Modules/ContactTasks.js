function contactTasksModule() {
  // vvv Start coding here for Contact Tasks Module vvv
  createEventTime.value = TodaysDate.toJSON().slice(0, 16);
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
