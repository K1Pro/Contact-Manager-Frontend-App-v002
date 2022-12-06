function dailyTasksModule() {
  // vvv Start coding here for Daily Tasks Module vvv
  //   getJSON(`${RenewalURL}${RenewalDates.toJSON().slice(5, 10)}`).then(
  //     (data) => {
  //   getJSON(ContactsURL).then((data) => {
  //     // Populates a dataset into the main search bar
  //     for (const [key, value] of Object.entries(data.data.contacts)) {
  //       let FullName = `${value.FirstName} ${value.LastName}`;
  //       let searchDataSet = document.createElement('option');
  //       searchDataSet.label = FullName;
  //       searchDataSet.innerHTML = value.Phone;
  //       TaskList.appendChild(searchDataSet);
  //     }
  //     return data;
  //   });
  // ^^^ End coding here for Daily Tasks Module ^^^
}

/////////////////////////////////////////////////////////////
// vvv This scans if all DOM Elements have been retrieved vvv
const isDailyTasksElementLoaded = async () => {
  while (DOMElements === undefined) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};
isDailyTasksElementLoaded().then(() => {
  console.log('retrieved module {dailyTasks}');
  dailyTasksModule();
});
