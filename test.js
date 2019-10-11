var airbnb = require('airbnbapijs');
//console.log(airbnb);
//let authUser = (data) => {
  //return airbnb.newAccessToken(data.username, data.password).then(token => {return token})
//}
//var data = {username: 'zjs0317@gmail.com', password: 'Tree1234@'};
//let usertoken = authUser(data);

//usertoken.then(result => console.log(result));
try{
  //var mytoken = airbnb.testAuth('faketoken3sDdfvtF9if5398j0v5nui');
  //var info = airbnb.getGuestInfo(2348485493);
  //info.then(token => {console.log(token)});
  airbnb.setCurrency('AUD');
  airbnb.setApiKey('1570526788_MDc4ZGQzYWI1NWIy');
  var user = airbnb.getGuestInfo(230342702);
  user.then(data => {console.log(data)});
  /*var list = airbnb.getListingInfo(9143458);

  //list.then(data => {console.log(data)});
  var listcalender = airbnb.getPublicListingCalendar({
    id: 9143458,
    month: "10",
    year: "2019",
    count: "1"
  })*/
  //listcalender.then(data => {console.log(data)});
  /*var days = listcalender.then(data => {return data.calendar_months})
  .then(data => {return data[0].days})
  .then(data => {return data.filter(d => {return d.available === true})})
  .then(data => {console.log(data)});*/
  //.then(data => {return data[0].available})
  //var fdays = days.filter(d => {return d.available === true});
  //console.log(fdays);

}
catch(e){
  console.error(e.message);
}
