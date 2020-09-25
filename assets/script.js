// Assign Variables
var resturantsIds = [];
var restaurantReviewsObj = {};
var restaurantsReviewsArray = [];


// Getting and validating the input fields on a click of the search buttom

$("#searchButton").on ("click", function(){

    console.log("got clicked");
    var write = $("#locationInput").val().trim();
    var int = parseInt(write);
    console.log(write.length);
    console.log(int);
})





// Get current location lat lon so we get the weather info
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        console.log("we not permitted to get the location");;
    }
}
function showPosition(position) {
    var locationLat = position.coords.latitude;
    var locationLon = position.coords.longitude;
    console.log("Your coordinates are Latitude: " + locationLat + " Longitude " + locationLon);
    getCityName(locationLat, locationLon);
    getNearByRetaurant(locationLat, locationLon);

}
// get city name from Weahter API using lon and lat
function getCityName(la, lo) {

    var queryLonLat =
        "https://api.openweathermap.org/data/2.5/weather?lat=" + la + "&lon=" + lo + "&APPID=2b07208e40c4f732c8daffed5bf88d24";
    console.log(queryLonLat);

    $.ajax({
        url: queryLonLat,
        method: "GET",
    }).then(function (rr) {
        console.log(rr);
    });
}

//Get near by resturants, also to get ret ids 
function getNearByRetaurant(la, lo) {

    var queryRestaurants =
        "https://developers.zomato.com/api/v2.1/geocode?lat=" + la + "&lon=" + lo;
    console.log(queryRestaurants);

    $.ajax({
        url: queryRestaurants,
        method: "GET",
        headers: {
            "user-key": "9e141855e8de25a334b351ddf9e705d8"
        }
    }).then(function (x) {
        console.log(x);
        // we will add the condition to limit the options to the cusine selected
        console.log(x.nearby_restaurants);
        getRestaurantsReviews(x.nearby_restaurants);
    });
}

// Getting return if throug ids 
function getRestaurantsReviews(d) {
    for (var i = 0; i < d.length; i++) {
        resturantsIds.push((d[i].restaurant.id));
        var queryReviews =
            "https://developers.zomato.com/api/v2.1/reviews?res_id=" + resturantsIds;
        console.log(queryReviews);

        $.ajax({
            url: queryReviews,
            method: "GET",
            headers: {
                "user-key": "9e141855e8de25a334b351ddf9e705d8"
            }
        }).then(function (r) {
            console.log(r);
        });
    }

}

//  Getting City name and lat lon from Zip code 

function getCityFromZipCode(z) {

    var queryZip =
    "https://www.zipcodeapi.com/rest/UcROKGLFeLnue77m4SgRuUHlrNYpgDl8UvOfdIWO0BTSNfoqz19zpK3w6HlLTTGC/info.json/22030/degrees";
    // "https://www.zipcodeapi.com/rest/T2FVoIDOIkc3gIlel9Ob2JkmXZ9Z3y4LZbKeaQkcSuObj11IasF9xDM1B5QQtFUj/info.json/"+ z + "/degrees";
    console.log(queryZip);

    $.ajax({
        url: queryZip,
        method: "GET",
    }).then(function (rr) {
        console.log(rr);
        // we will add the condition to limit the options to the cusine selected
    });
}

getCityFromZipCode();
function callApi() {
    var queryForcast =
    "https://developers.zomato.com/api/v2.1/geocode?lat=38.8372&lon=-77.340711"
    console.log(queryForcast);
    $.ajax({
      url: queryForcast,
      method: "GET",
      headers: {
          "user-key": "9e141855e8de25a334b351ddf9e705d8"
      }
    }).then(function (x) {
      console.log(x);
    });
  }
  callApi();
 
