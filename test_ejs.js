const fs = require('fs');
const ejs = require('ejs');

const files = [
  'views/en/forgot-password.ejs',
  'views/pt/forgot-password.ejs',
  'views/es/forgot-password.ejs',
  'views/partials/head.ejs',
  'views/partials/navbar.ejs',
  'views/partials/footer.ejs'
];

files.forEach(f => {
  try {
    const template = fs.readFileSync(f, 'utf8');
    const fn = ejs.compile(template, { filename: f });
    console.log(f + ': COMPILE SUCCESS');
  } catch(e) {
    console.log(f + ': ERROR - ' + e.message);
  }
});
