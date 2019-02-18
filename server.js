const express = require('express');
// const people = require('./people.json');
const app = express();
var ejs = require('ejs');

//airtable
const airtable = require("airtable");
const base = airtable.base("applhVSojCvSFtpSz");
const news = base("News");
const all = news.select({view: "All view"})

// ...
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'));
// ...

app.get('/', (req, res) => {
  //var namesList = [];
  all.firstPage((error, records)=>{

    if(error){
      console.log('error');
    }

  const names = records.map(record => record.get("Title"));
  const desc = records.map(record => record.get("Description"));
  const attachment = records.map(record => record.get("Attachments"));
  //namesList.push(names)
  console.log(attachment['url'])

    res.render('index', {
    title: 'Homepage',
    namelist: names,
    desclist: desc
    // filelist: attachment
  });
})


});

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

// app.get('/profile', (req, res) => {
//   const person = people.profiles.find(p => p.id === req.query.id);
//   res.render('profile', {
//     title: `About ${person.firstname} ${person.lastname}`,
//     person,
//   });
// });

// https://freshman.tech/learn-node/

