Introduction on the Json files:
1. UserOwnActiveListingsExample.Json
    -- function: getOwnActiveListings(token)
    -- return all the active listings under the token authorized user
    -- information: a list of all the listings(properties), their listing_id and some brief information on

2. reservationExample.Json
    -- function: getReservations(
    {
        token: <token>,
        offset: <number>, // how many records to skip before output
        limit: <number> // how many records to show
    }
    )
    -- return an array of reservations ordered by latest update
    -- information: reservation information in a reservation level, each record will have;
        check-in, check-out date,
        guest firstname, lastname, phonenumber and number of guests, and more
        others

3. ListingInfoHostExample.Json
    -- function: getListingInfoHost(
    {
        token: <token>,
        id: <listing_id>
    }
    )
    -- return all details of a listing
    -- information: secret price setting of a listing, may not be what we need

4. ListingCalendarExample.JSON
    -- function: getCalendar(
    {
        token: <token>,
        id: <listing_id>,
        startDate: <year-month-day>,
        endDate: <year-month-day>
    }
    )
    -- return the booking information of a listing in a selected time period
    -- information: reservation information in each day in the time period, including:
        guest firstname, lastname, phonenumber and number of guests, and more
        also listing's status information
