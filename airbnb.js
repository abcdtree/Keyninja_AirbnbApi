var airbnb = require('airbnbapijs');
airbnb.setApiKey('d306zoyjsyarp7ifhu67rjxn52tv0t20');
airbnb.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36');
airbnb.setCurrency('AUD');

var info = {
  //here
  username: 'hello@roomerang.com.au',
  password: '************'
};
(async() => {
  var t = await airbnb.newAccessToken(info);
  console.log(t);
  var airlock_id = t.client_error_info.airlock.id ;
  var user_id = t.client_error_info.airlock.id ;
  console.log("The airlock link to copy:");
  console.log("https://www.airbnb.com/airlock?al_id=" + airlock_id);
})();
