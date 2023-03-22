function contactListModule() {
  // vvv Start coding here for Calendar Module vvv
  testList.innerHTML = 'Nothing';
  getJSON(`${srvrURL}`).then((data) => {
    console.log(data.data.contacts);
  });
  // ^^^ End coding here for Calendar Module ^^^
}

/////////////////////////////////////////////////////////////
// vvv This scans if all DOM Elements have been retrieved vvv
const isContactListElementLoaded = async () => {
  while (DOMElements === undefined) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};
isContactListElementLoaded().then(() => {
  console.log('retrieved module {contact list}');
  contactListModule();
});
