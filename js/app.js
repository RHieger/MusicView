// app.js

$(document).ready(function()    {

  function start() {

    // 2. Initialize the JavaScript client library.

    gapi.client.init({

      'apiKey': 'AIzaSyA9HOMNKiV3K5ZiGDVZlOTFovYyu8MgHYg',

      // clientId and scope are optional if auth is not required.

      //'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
      //'scope': 'profile',

    }).then(function() {

      // 3. Initialize and make the API request.

      return gapi.client.request({

      'path': 'https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyA9HOMNKiV3K5ZiGDVZlOTFovYyu8MgHYg&part=snippet,contentDetails,statistics,status'

      });

    }).then(function(response) {

      console.log(response.result);

    }, function(reason) {

      console.log('Error: ' + reason.result.error.message);

    });

  };
  
  // 1. Load the JavaScript client library.

  gapi.load('client', start);

});     // end $(document).ready()
