var airbnb = require('airbnbapijs');
var fs = require('fs');
airbnb.setApiKey('d306zoyjsyarp7ifhu67rjxn52tv0t20');
airbnb.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36');
airbnb.setCurrency('AUD');
//get guest information based on user_id only
/*(async() => {
  var t = await airbnb.getGuestInfo(230342702);
  console.log(t);
})();*/

//get own user information
(async() => {
  var t = await airbnb.getOwnUserInfo('3jqnlulwq45dzie8cdj8fgsdi');
  //console.log(t);
  var obj = {table: []};
  obj.table.push(t);
  var json = JSON.stringify(obj);
  fs.writeFile("./UserOwnInformation.json", json, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
  });
})();

//auth test
/*var token = '3jqnlulwq45dzie8cdj8fgsdi';
(async() => {
  var t = await airbnb.testAuth('3jqnlulwq45dzie8cdj8fgsdi');
  console.log(t);
})();*/

//getHostSummary
/*(async() => {
  var t = await airbnb.getHostSummary('3jqnlulwq45dzie8cdj8fgsdi');
  var obj = {table: []};
  obj.table.push(t);
  var json = JSON.stringify(obj);
  fs.writeFile("./HostSummary.json", json, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
  });
  //console.log(t);
})();*/

//get Threads Full information
/*(async() => {
  var t = await airbnb.getThreadsFull({
    token: '1heooh03rcxwg1vthm47pza6k',
    offset: 0,
    limit: 10
  });
  console.log(t);
})();*/

//get public lisitng information with one listing id
/*(async() => {
  var t = await airbnb.getListingInfo(29398047);
  console.log(t);
})();*/

//get private listing information with token and listing id
/*(async() => {
  var t = await airbnb.getListingInfoHost({
    token: '3jqnlulwq45dzie8cdj8fgsdi',
    id: 38831044
  });
  var obj = {table: []};
  obj.table.push(t);
  var json = JSON.stringify(obj);
  fs.writeFile("./ListingInfoHostExample2.json", json, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
  });
  //console.log(t);
})();*/

//get private calenaar of a listing
/*(async() => {
  var t = await airbnb.getCalendar({
    token: '3jqnlulwq45dzie8cdj8fgsdi',
    id: 17737043,
    startDate: '2019-10-10',
    endDate: '2019-10-30'
  });
  /*
  var obj = {table: []};
  obj.table.push(t);
  var json = JSON.stringify(obj);
  fs.writeFile("./ListingCalendarExample.json", json, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
  });
  //console.log(t);
})();*/

//get all active listings information under one user
/*(async() => {
  var t = await airbnb.getOwnActiveListings('3jqnlulwq45dzie8cdj8fgsdi');
  //console.log(t);
  console.log(t.length);
  var obj = {table: []};
  obj.table.push(t);
  var json = JSON.stringify(obj);
  fs.writeFile("./UserOwnActiveListingsExample2.json", json, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
  });
})();*/

//get all listings information under one users
/*(async() => {
  var t = await airbnb.getOwnListings({
    token: '3jqnlulwq45dzie8cdj8fgsdi',
    userId: '104431444'
});
  //console.log(t);
  var obj = {table: []};
  obj.table.push(t);
  var json = JSON.stringify(obj);
  fs.writeFile("./UserOwnListingsExample2.json", json, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
  });
  console.log(t.length);
})();*/

//get reservations under the authorized user
/*(async() => {
  var t = await airbnb.getReservations({
    token: '3jqnlulwq45dzie8cdj8fgsdi',
    offset: 0,
    limit: 1
  });
  //console.log(t);
  var obj = {table: []};
  obj.table.push(t);
  var json = JSON.stringify(obj);
  fs.writeFile("./reservationExample.json", json, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
  });
})();*/

//get the public listing calendar
/*(async() => {
  var t = await airbnb.getPublicListingCalendar({
    id: 29398047,
    month: 10,
    year: 2019,
    count: 1
  });
  //console.log(t);
  console.log(t.calendar_months[0].days);
})();*/
