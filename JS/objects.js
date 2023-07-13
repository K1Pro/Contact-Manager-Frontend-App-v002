const PolicyTypeObj = {
  Auto: 'Auto',
  Home: 'Home',
  Cond: 'Condo',
  Rent: 'Renters',
  Life: 'Life',
  Lord: 'Landlord',
  Moto: 'Motorcycle',
  Comm: 'Commercial',
  Umbr: 'Umbrella',
};

const TasksObj = {
  renewal: 'All Renewals',
  // rCmpltd: 'Completed Renewals',
  // rNotCmpltd: 'Not Completed Renewals',
  event: 'All Contact Tasks',
  // eCmpltd: 'Completed Tasks',
  // eNotCmpltd: 'Not Completed Tasks',
  recurring: 'All Recurring Tasks',
  Cmpltd: 'All Completed',
  NotCmpltd: 'All Not Completed',
};

const StatusObj = {
  Customer: 'Customer',
  Former_customer: 'Former Customer',
  Prospect: 'Prospect',
  Hot_Lead: 'Hot Lead',
  Online_Lead: 'Online Lead',
  Cold_Lead: 'Cold Lead',
  Do_Not_Call: 'Do Not Call',
  Do_Not_Renew: 'Do Not Renew',
};

const SourceObj = {
  Erie: 'Erie',
  Allstate: 'Allstate',
  Assurance: 'Assurance',
  Live_Transfer_Lead: 'Live Transfer Lead',
  Online_Lead: 'Online Lead',
  Referral: 'Referral',
};

const LastEditedByObj = {
  Hanna: 'Hanna',
  Bartosz: 'Bartosz',
  Kamilla: 'Kamilla',
  Piotr: 'Piotr',
  Aneta: 'Aneta',
  Yuliya: 'Yuliya',
  Eliza: 'Eliza',
};

const DaysObj = {
  number28: 'Days (28)',
  number21: 'Days (21)',
  number14: 'Days (14)',
  number7: 'Days (7)',
  number3: 'Days (3)',
  number1: 'Day (1)',
};

const eventTemplatesObj = {
  Called_to_prospect: `Called ${new Date(Date.now() + 1000 /*sec*/ * -300 /*min*/ * 60 /*hour*/)
    .toJSON()
    .slice(5, 7)}/${new Date(Date.now() + 1000 /*sec*/ * -300 /*min*/ * 60 /*hour*/)
    .toJSON()
    .slice(8, 10)}, left a message, sent text and email `,
  Zadzwonilem_do_potencjalnego_klienta: `Zadzwonilem ${new Date(Date.now() + 1000 /*sec*/ * -300 /*min*/ * 60 /*hour*/)
    .toJSON()
    .slice(5, 7)}/${new Date(Date.now() + 1000 /*sec*/ * -300 /*min*/ * 60 /*hour*/)
    .toJSON()
    .slice(8, 10)}, zostawilem wiadomosc, wyslalem SMSa i email `,
  Made_a_payment: 'Made a payment ',
  Endorsement_created: 'Endorsement created ',
  Request_a_quote: 'Request a quote ',
};
