const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\.css"/g, '.css?v=2"');
html = html.replace(/\.js"/g, '.js?v=2"');
fs.writeFileSync('index.html', html);
console.log('Success');
