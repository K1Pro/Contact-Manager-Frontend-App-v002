function emailTemplateHandler() {
  // vvv Start coding here for Calendar Module vvv

  emailTemplates = {
    ProspectEmail: `
The Bundle Insurance Agency (Hanna Kwasniewska, CEO) is an independent agency in Lisle, Illinois that allows you to choose the best carrier for your insurance needs. Furthermore, we directly work with very reputable carriers such as Erie Insurance in order to service your policies. We work on your side when you have a loss and follow through to see that you get fair, prompt payment and service. Bundle Insurance Agency represents a carefully selected group of financially strong, reputable insurance companies. Therefore, we are able to offer you the best coverage at the most competitive price.<br><br>

More than likely Hanna has already been your agent previously, so we can provide you with an accurate quote in a short amount of time. Please simply confirm the following information by replying via email or calling:<br><br>

<u>Your address:</u><br> 
${Address.value}<br>
${City.value}, ${State.value} ${Zip.value}<br><br>
<u>Your phone:</u><br>
${Phone.value}<br><br>

${Car1.value || Car2.value || Car3.value || Car4.value ? '<u>Your autos:</u><br>' : ``}
${Car1.value ? Car1.value + '<br>' : ``}
${Car2.value ? Car2.value + '<br>' : ``}
${Car3.value ? Car3.value + '<br>' : ``}
${Car4.value ? Car4.value + '<br>' : ``}
<br>
We look forward to working with you and offering you outstanding customer service, lower prices and excellent coverages.<br>
Our office hours are 9am-6pm Monday-Friday, Saturday by appointment.<br>
Please do not hesitate to call us at any time. Thank you.<br><br><br>

${SMTP[LastEditedBy.value][2] ? SMTP[LastEditedBy.value][2] : 'Hanna Kwasniewska'}<br>
${SMTP[LastEditedBy.value][1] ? SMTP[LastEditedBy.value][1] : 'Hanna@Bundle-Insurance.com'}<br>
PH: (331) 330-8430<br>
FAX: (773) 853-2980<br>
`,
    ProspectEmailPolski: `
Agencja Ubezpieczeniowa Bundle (Hanna Kwasniewska, CEO) jest niezalezna agencja zlokalizowana w Lisle, Illinois ktora oferuje szeroki wybor produktow z roznych ubezpieczycieli. Ponadto, wspolpracujemy bezposrednio z ubezpieczycielami z bardzo dobra reputacja jak Erie Insurance aby moc serwisowac polisy i nadzorowac procedury do roszczen. W skladzie Agencji Bundle znajduja sie agenci z bardzo dobra reputacja z mozliwoscia porade finansowa. Takze jestesmy w stanie zaoferowac bardzo dobre pokrycia za niskie ceny.<br><br>

Jest duze prawdopodobienstwo ze panstwo juz wspolpracowaliscie z pania Hanna jako wasz agent. W rezultacie mozemy przeslac wycene ubezpieczeniowa z nastepujacymi informacjami ponizej ktore prosimy potwierdzic:<br><br>

<u>Adres:</u><br> 
${Address.value}<br>
${City.value}, ${State.value} ${Zip.value}<br><br>
<u>Telefon:</u><br>
${Phone.value}<br><br>

${Car1.value || Car2.value || Car3.value || Car4.value ? '<u>Auta:</u><br>' : ``}
${Car1.value ? Car1.value + '<br>' : ``}
${Car2.value ? Car2.value + '<br>' : ``}
${Car3.value ? Car3.value + '<br>' : ``}
${Car4.value ? Car4.value + '<br>' : ``}
<br>
Cieszymy sie ze bedziemy mogli wspolpracowac z Panstwem i zaoferowac wyjatkowa obsluge klienta, nizsze ceny i doskonale pokrycie.<br>
Nasze godziny pracy to 9:00-18:00 od poniedzialku do piatku, sobota po wczesniejszym umowieniu.<br>
Mozna zadzwonic do nas w kazdej chwili. Dziekujemy i serdecznie pozdrawiamy.<br><br><br>

${SMTP[LastEditedBy.value][2] ? SMTP[LastEditedBy.value][2] : 'Hanna Kwasniewska'}<br>
${SMTP[LastEditedBy.value][1] ? SMTP[LastEditedBy.value][1] : 'Hanna@Bundle-Insurance.com'}<br>
PH: (331) 330-8430<br>
FAX: (773) 853-2980<br>
    `,
    WelcomeEmail: `
It was a pleasure speaking with you and we appreciate you giving Erie the opportunity to improve your financial wellness! Now that your policy is issued, there are a few housekeeping items to remind you of:<br><br>


E-Signature - you will receive instructions through the email you provided. This will come directly from the carrier and outlines how to complete the e-signing process. Please complete this process within five (5) days of policy issuance to avoid changes in premium or cancellation of policy.<br><br>


Referrals - The greatest compliment I could ever receive is a referral to help your friends and/or family. Please provide them my contact information and I will do my absolute best to provide them a great experience!<br><br>


Hanna Kwasniewska<br>
Hanna@Bundle-Insurance.com<br>
PH: (331) 330-8430<br>
FAX: (773) 853-2980<br>
`,
    ThankYouEmail: `
It was a pleasure speaking with you today and we appreciate you calling the Bundle Insurance Agency.<br><br>


Feel free to provide our contact information to any of your friends, family, and/or co-workers that may be interested in obtaining auto and home insurance. We would be happy to work with them to find the right policies to protect them and their assets. They can email me directly or call me at (331) 330-8430.<br><br>


Please reach out to the service department if you have any questions or if any updates need to be made on your policy.
Let me know if you have any additional questions. Thank you for your business.<br><br>


Hanna Kwasniewska<br>
Hanna@Bundle-Insurance.com<br>
PH: (331) 330-8430<br>
FAX: (773) 853-2980<br>
`,
    RenewalEmail: `
Your ${Policy1Type.value.toLowerCase()} policy renewal is coming up on: ${Policy1RenewDate.value}<br>
Your ${Policy2Type.value.toLowerCase()} policy renewal is coming up on: ${Policy2RenewDate.value}<br>
Your ${Policy3Type.value.toLowerCase()} policy renewal is coming up on: ${Policy3RenewDate.value}<br>
Your ${Policy4Type.value.toLowerCase()} policy renewal is coming up on: ${Policy4RenewDate.value}<br><br>


Please reach out to the service department if you have any questions or if any updates need to be made on your policy.
Let me know if you have any additional questions. Thank you for your business.<br><br>


Hanna Kwasniewska<br>
Hanna@Bundle-Insurance.com<br>
PH: (331) 330-8430<br>
FAX: (773) 853-2980<br>
`,
  };
  // ^^^ End coding here for Calendar Module ^^^
}

// vvv This scans if all DOM Elements have been retrieved vvv
const isEmailTemplateHandlerElementLoaded = async () => {
  while (DOMElements === undefined) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};
isEmailTemplateHandlerElementLoaded().then(() => {
  console.log('retrieved all email templates');
  emailTemplateHandler();
});
