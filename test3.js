var airbnb = require('airbnbapijs');
var fs = require('fs');
airbnb.setApiKey('d306zoyjsyarp7ifhu67rjxn52tv0t20');
airbnb.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36');
airbnb.setCurrency('AUD');

/*(async() => {
  var t = await airbnb.getGuestInfo(230342702);
  console.log(t);
})();

(async() => {
  var t = await airbnb.getOwnUserInfo('1heooh03rcxwg1vthm47pza6k');
  console.log(t);
})();*/

(async() => {
  var t = await airbnb.testAuth('3jqnlulwq45dzie8cdj8fgsdi');
  console.log(t);
})();

/*(async() => {
  var t = await airbnb.getHostSummary('1heooh03rcxwg1vthm47pza6k');
  console.log(t);
})();*/

/*(async() => {
  var t = await airbnb.getThreadsFull({
    token: '1heooh03rcxwg1vthm47pza6k',
    offset: 0,
    limit: 10
  });
  console.log(t);
})();*/
/*(async() => {
  var t = await airbnb.getListingInfo(29398047);
  console.log(t);
})();*/
/*(async() => {
  var t = await airbnb.getListingInfoHost({
    token: '3jqnlulwq45dzie8cdj8fgsdi',
    id: 17737043
  });
  var obj = {table: []};
  obj.table.push(t);
  var json = JSON.stringify(obj);
  fs.writeFile("./ListingInfoHostExample.json", json, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
    });
  //console.log(t);
})();*/

(async() => {
  var t = await airbnb.getCalendar({
    token: '3jqnlulwq45dzie8cdj8fgsdi',
    id: 17737043,
    startDate: '2019-10-10',
    endDate: '2019-10-30'
  });
  var obj = {table: []};
  obj.table.push(t);
  var json = JSON.stringify(obj);
  fs.writeFile("./ListingCalendarExample.json", json, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
    });
  //console.log(t);
})();

/*(async() => {
  var t = await airbnb.getOwnActiveListings('3jqnlulwq45dzie8cdj8fgsdi');
  //console.log(t);
  var obj = {table: []};
  obj.table.push(t);
  var json = JSON.stringify(obj);
  fs.writeFile("./UserOwnActiveListingsExample.json", json, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
    });
})();*/

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
