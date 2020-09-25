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
 