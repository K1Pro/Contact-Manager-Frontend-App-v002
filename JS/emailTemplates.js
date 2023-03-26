function emailTemplateHandler() {
  // vvv Start coding here for Calendar Module vvv

  emailTemplates = {
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
Your ${Policy1Type.value.toLowerCase()} policy renewal is coming up on: ${
      Policy1RenewDate.value
    }<br>
Your ${Policy2Type.value.toLowerCase()} policy renewal is coming up on: ${
      Policy2RenewDate.value
    }<br>
Your ${Policy3Type.value.toLowerCase()} policy renewal is coming up on: ${
      Policy3RenewDate.value
    }<br>
Your ${Policy4Type.value.toLowerCase()} policy renewal is coming up on: ${
      Policy4RenewDate.value
    }<br><br>


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
