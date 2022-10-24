const myInterval = setInterval(myTimer, 50);
function myTimer() {
  let pageElements = document.getElementsByTagName('*');
  if ('CalendarDate' in pageElements) {
    console.log('CalendarDate found');
    clearInterval(myInterval);
    let BartDate = new Date();
    // prettier-ignore
    const bartsMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',];
    // prettier-ignore
    const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',];
    const CalendarHTML_Date = document.getElementById('CalendarDate');
    console.log(CalendarHTML_Date.innerHTML);
    CalendarHTML_Date.innerText = BartDate.toJSON().slice(0, 10);
  }
}
