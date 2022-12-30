function contactTasksModule() {
  // vvv Start coding here for Contact Tasks Module vvv
  createEventTime.value = TodaysDate.toJSON().slice(0, 16);

  let testelement = document.createElement('select');
  // testelement.value = `test`;
  // testelement.setAttribute(
  //   'class',
  //   'form-control eventDescriptions border-top-0'
  // );
  testDIV.appendChild(testelement);
  // testDIV.innerHTML = 'hi';
  staffMembers.forEach((element, index) => {
    console.log(element);
    console.log(index + 1);
    let optbartek = document.createElement('option');
    optbartek.value = `${element}`;
    optbartek.innerHTML = `${element}`;
    // if (value.EventAuthor == 'Bartosz') {
    //   opt1.selected = true;
    // }
    testelement.appendChild(optbartek);
    // let `optBart${index + 1}` = document.createElement('option');
  });

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
