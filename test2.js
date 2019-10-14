var airbnb = require('airbnbapijs');
airbnb.setApiKey('d306zoyjsyarp7ifhu67rjxn52tv0t20');
airbnb.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36');
airbnb.setCurrency('AUD');

var airlock_id = null;
var user_id = null;

(async() => {
  var t = await airbnb.newAccessToken({username:'zjs0317@gmail.com', password: 'Tree1234@'});
  var k = await airbnb.login({email:'zjs0317@gmail.com', password: 'Tree1234@'});
  /*if(t.token){
    console.log(t.token);
  }else{
    console.log(t.error.client_error_info.airlock);
    airlock_id = t.error.client_error_info.airlock.id;
    user_id = t.error.client_error_info.airlock.user_id;
    console.log(airlock_id);
    console.log(user_id);
    console.log("https://www.airbnb.com/airlock?al_id=" + airlock_id)
  }*/
    /*var lockinfo = {
      airlock_id: 5155508264,
      user_id: 230342702,
      verify_code: 5261
    };
    var t = await airbnb.emailVerifyCodeSend(lockinfo);
    //var t = await airbnb.emailVerifyRequest(lockinfo);
    console.log(t);*/
  //}
})();
