function tableModule() {
  // vvv Start coding here for Calendar Module vvv

  populateListTable('LastName');

  [...contactListHeaders.querySelectorAll('*')].forEach((header) =>
    header.addEventListener('click', () => {
      console.log(header.innerHTML);
      populateListTable(header.innerHTML);
    })
  );
  // ^^^ End coding here for Calendar Module ^^^
}

/////////////////////////////////////////////////////////////
// vvv This scans if all DOM Elements have been retrieved vvv
const isTableElementLoaded = async () => {
  while (DOMElements === undefined) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};
isTableElementLoaded().then(() => {
  console.log('retrieved module {list table}');
  tableModule();
});
