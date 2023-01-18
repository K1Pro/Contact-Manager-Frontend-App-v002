console.log('retrieved database successfully');
async function getJSON(url, errorMsg = 'Something went wrong') {
  try {
    const response = await fetch(url, { signal });
    const contactData = await response.json();
    return contactData;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch was aborted');
    }
    console.log(errorMsg);
  }
}
