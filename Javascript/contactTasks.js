function contactTasksModule() {
    // vvv Start coding here for Calendar Module vvv
    console.log(TodaysDate.toJSON().slice(0, 16))
    createEventTime.value = TodaysDate.toJSON().slice(0, 16)
    // ^^^ End coding here for Calendar Module ^^^
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
  