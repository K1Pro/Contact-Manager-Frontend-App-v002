console.log('retrieved database successfully');
async function getJSON(url, errorMsg = 'Something went wrong') {
  try {
    const response = await fetch(url);
    const contactData = await response.json();

    return contactData;
  } catch (error) {
    console.log(errorMsg);
  }
}
getJSON(ContactsURL).then((data) => {
  // Try to find unique phone numbers
  dbArray = Object.entries(data.data.contacts);
  return dbArray;
});
