function dailyTasksModule() {
  // vvv Start coding here for Daily Tasks Module vvv
  // const initialDailyTask = new Date(Date.now() + 1000 * 60 * 60 * 24 * 28);
  // loadDailyTasks(initialDailyTask.toJSON().slice(5, 10));
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
