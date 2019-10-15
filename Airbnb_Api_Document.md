# Airbnb Api Document


## Official and Unofficial Api
### 1. Official API

Airbnb has published their offical api. However, it does not open to the public. What's more, they don't accept online request of the partnership.

The official Q&A as:

[Airbnb Partner](https://www.airbnb.com.au/partner)

How can I get access to Airbnb’s API?
At this time, we are not accepting new access requests for our API. Our global team of partner managers will reach out to prospective partners based on the supply opportunity your business represents, strength of your technology, and ability to support our shared customers.

### 2. Unofficial API
although, Airbnb does not provide public document for their APIs. There are open source developers making unofficial APIs which using http requests to Airbnb server.
The open tool I chose is [airbnbapiJs](https://github.com/zxol/airbnbapi) which is based on Node.js.
This api tool provides functions to:
- get authorization from airbnb using username and password
- get user profile (both public without token and private with token)
- get listing information
  - public information such as location, availibility, condition
  - private information such as price
  - calendar of a listing
- get reservation information (authorization request)

These functions provide us enough data to replace ical link as long as the user provides their airbnb **token** to us.
# Authorization
This is the most important and complex part to use the airbnb api.
## 1. Api_Key
Api key is a **32-character-string** which is used to guide all api calls. A valid api key is the foundation of all api calls.
To get a valid api key, we need to use **google chrome** or other browser with **develop tool**.
#### Step 1
- Open airbnb.com website and right click to inspect the source of the page
- Go to network tab which is on top of the inspection tool (devTool)
#### step 2
- Clean up all the current record of the network watcher
- click refresh on the airbnb page
- Stop the watching of the devTool after about it recorded the site for 30 seconds
#### Step 3
-  On the filter menu, click XHR to show only XHR and Fetch, then enter explore_tab to find a Url Name with explore_tab?*** .
-  Copy the url (The URL, not the content of the js) to a text editor. The api key is contained in the url with a format as “key=xxxxx”
#### Key Example
Api_key = d306zoyjsyarp7ifhu67rjxn52tv0t20
## 2.airbnbapijs package
#### install
    npm install airbnbapijs
#### import
    var airbnb = require('airbnbapijs')
## 3.Get Access Token
Access Token is a **24-character-string** which is used to authorize the user when to call api. Without Access Token, we only could get public information.
#### 1. Regular Call
- **new Access Toekn Method (preferred):**
  ~~~
    airbnb.newAccessToken({ username: 'foo@bar.com', password: 'hunter2' })
    // returns {token: 'faketoken3sDdfvtF9if5398j0v5nui'} or {error: {error obj}}
  ~~~ 
- **login:**
  ~~~
    airbnb.login({ username: 'foo@bar.com', password: 'hunter2' })
    // returns a user info object (includes token) or {error: {error obj}}
  ~~~
#### 2. Error Code 420 Type A --- Robot Check
When you try to get access token by **post** a request to Airbnb server, there is a chance the server denies your request and response you a request to verify yourself. You will have **Error Code 420**.
However, when you send regular request, the response message will only contain a short message said _unknown reason_.
##### Get more feedback from the server
- find the local location of the airbnbapijs package cade, which always like  _project/node_modules/airbnbapijs/build/config.js_
- add a new attribute "x-airbnb-decice-id" into the headers:
       config.js
       
        const config = {
            ***
            default_headers: {

                'Content-Type': 'application/json; charset=UTF-8',
                ***
                'x-airbnb-device-id': '1234567890ABCDEF'
            },
            ***
        };
        
- After you added this attribute into header, the response from the airbnb service will content an json style message.
        response.error.client_error_info.airlock
  ~~~
        {
            ***,
            header_text: 'Please verify yourself',
            id: 5155508264,//airlock_id
            ***,
            user_id: 230342702,//User_id
            ***,
        }
  ~~~
  
    Then we could get **airlock_id** and **user_id**.
##### Go to browser and go to the link:

    https://www.airbnb.com/airlock?al_id=<airlock_id> (replace <airlock_id> with the one you get from last step)
    you can click the robot check button and pass it

Use the **Get access token** method again
#### 3. Error Code 420 Type B --- Email Verification Code
When you try to **get access token too many times** or you **change your device** or **ip address** to get the token, airbnb server will request to verify yourself using **phone number** or **email**.
- In this case, the Error code 420 message will be different from the previous one. In the message, it will contain several new attributes and one of it is:

    {
      flow: 'account_ownership_verification_for_login'
    }

- add email verification code to _project/node_modules/airbnbapijs/build/main.js_

    ~~~
    async emailVerifyRequest({airlock_id, user_id}){
      const options = this.buildOptions({
        method: 'PUT',
        uri: 'https://api.airbnb.com/v2/airlocks/'+airlock_id+'?',
        _format: 'v1',
        body:{
          action_name: "account_login",
          attempt: true,
          friction: 'email_code_verification',
          id: airlock_id,
          user_id: user_id
        },
        timeout: 10000
      });
      try {
        const response = await (0, _requestPromise2.default)(options);
        return response;
      } catch (e) {
        console.error("Airbnbapi: Could not request an verification code for " + user_id);
        console.error(e);
      }
    }

    async emailVerifyCodeSend({airlock_id, user_id, verify_code}){
      const options = this.buildOptions({
        method: 'PUT',
        uri: 'https://api.airbnb.com/v2/airlocks/'+airlock_id+'?',
        _format: 'v1',
        body:{
          action_name: "account_login",
          friction: 'email_code_verification',
          friction_data: {
            response: {
              code: verify_code
            }
          },
          id: airlock_id,
          user_id: user_id
        },
        timeout: 10000
      });
      try {
        const response = await (0, _requestPromise2.default)(options);
        return response;
      } catch (e) {
        console.error("Airbnbapi: Your verification Code is Wrong, Please check it and do it again !");
        console.error(e);
      }
    }
    ~~~
    
- Use two functions to pass the email verification step:
    > airbnb.emailVerifyRequest(airlock_id, user_id)

    Airbnb will send you a verification code to your email which linked to your airbnb account
    > airbnb.emailVerifyCodeSend(airlock_id, user_id, verify_code)

    In this way you passed the verification
- Use the **Get access token** method again
#### 4. Conclusion on Get Access Token
The main blocking system on airbnb website is the **AirLock** system. This is why we communicate the server with airlock_id.
When we build our own login in UI, we need to build good logic on these possbile situations.
## 4. Call Useful APIs
~~### getOwnActiveListings~~
~~Gets an array containing a host's active listings~~
~~airbnb.getOwnActiveListings('faketoken3sDdfvtF9if5398j0v5nui')~~
~~// returns listing array for your account (JSON)~~
~~return example: [UserOwnActiveListingsExample.json](https://github.com/abcdtree/Keyninja_AirbnbApi/blob/master/UserOwnActiveListingsExample.json)~~  
_I could not find out what attribute is deciding whether a listing is active or not.So we just give up on this function and use getOwnListings instead._

### getOwnListings
Gets an array containing a host's listings

~~~
airbnb.getOwnListings({
    token: 'faketoken3sDdfvtF9if5398j0v5nui',
    userId: '2344594'
})
// returns listing array for your account (JSON)
~~~

return example: [UserOwnListingsExample.json](https://github.com/abcdtree/Keyninja_AirbnbApi/blob/master/UserOwnListingsExample.json)

> **How to differ primary_hosted and co-hosted listings:**      
> If the user_id we used to call this api is different from the **user_id** attribute in the response, we could know this listing is co-hosted by the authorized user we used to call the api.    
> In the api response of getOwnListings, there will be an attribute named as **hosts**. If the listing is hosted by multiple hosts, all hosts will be listed in this attribute. What's more, another attribute names as **primary_host** will list the unique primary host. 

### getReservations
Returns a list of reservations

~~~
airbnb.getReservations({
    token: 'faketoken3sDdfvtF9if5398j0v5nui',
    offset: 0, //*how many records to skip*
    limit: 10  //*how many records to return*
})
// returns an array of reservations in the mobile app format, ordered by latest update (JSON)
~~~

return example: [reservationExample.json](https://github.com/abcdtree/Keyninja_AirbnbApi/blob/master/reservationExample.json)
### getListingInfoHost
Gets private data on one of your listings

~~~
airbnb.getListingInfoHost({
    token: 'faketoken3sDdfvtF9if5398j0v5nui',
    id: 109834757 //**listing id**
})
// returns extended listing info for your listing (JSON)
~~~

return example: [ListingInfoHostExample.json](https://github.com/abcdtree/Keyninja_AirbnbApi/blob/master/ListingInfoHostExample.json)
### getCalendar
**Private** Calendar data regarding your listings including Reservations, cancellations, prices and blocked days
~~~
airbnb.getCalendar({
    token: 'faketoken3sDdfvtF9if5398j0v5nui',
    id: 109834757, //**listing id**
    startDate: '2018-01-01',
    endDate: '2018-02-28'
})
// returns array of calendar days with extended info, for your listings
~~~
return example: [ListingCalendarExample.json](https://github.com/abcdtree/Keyninja_AirbnbApi/blob/master/ListingCalendarExample.json)
