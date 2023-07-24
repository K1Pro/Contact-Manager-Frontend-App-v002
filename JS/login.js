///////////////////////////////////////////////////////////
///////////// vvv Temporary Login vvv ////////////////////
while (
  localStorage.getItem('BundleContactList-LoginName') == null ||
  localStorage.getItem('BundleContactList-LoginName') == ''
) {
  let loginPrompt = prompt('Please enter your name', '');
  if (loginPrompt) {
    if (
      Object.values(LastEditedByObj).includes(`${loginPrompt[0].toUpperCase()}${loginPrompt.slice(1).toLowerCase()}`)
    ) {
      localStorage.setItem(
        'BundleContactList-LoginName',
        `${loginPrompt[0].toUpperCase()}${loginPrompt.slice(1).toLowerCase()}`
      );
      localStorage.setItem(
        'BundleContactList-LoginTime',
        new Date(new Date().getTime() + 1000 * -new Date().getTimezoneOffset() * 60).toISOString()
      );
    } else {
      alert('Incorrect name');
    }
  } else {
    alert('Name cannot be blank');
  }
}
let loggedInUser = localStorage.getItem('BundleContactList-LoginName');
console.log(`${loggedInUser} is logged in`);
