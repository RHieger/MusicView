// app.js
//
// API Code for MusicView v1.1.01
//
// Robert Hieger
//
// July 25, 2017

// Wrap API code in jQuery  that assures the DOM is ready.

$(document).ready(function()  {

  // Variable for YouTube topicId:

  var topicId;

  // Extract topicId from #genres:

  $('#genres').on('change', function()  {

    topicId = $(this).val();

  }); // end $('#genres').on()

  /* FUNCTIONS SUPPORTING CREATION OF YouTube QUERY */

  function buildQuery(topicId)  {

    var request = gapi.client.youtube.search.list({

      part:       'snippet',
      type:       'video',
      maxResults: 24,
      order:      'relevance',
      topicId:    topicId,
      q:          encodeURIComponent($('#userQuery').val()).replace(/%20/g, '+')

    }); // end request

    return request;

  } // end buildQuery(topicId)

  function sendQuery()  {

    // Prepare YouTube API request:

    var request = buildQuery(topicId);

    // Execute the request:

    request.execute(function(response)  {

      // Resize div#conent to 2100px.

      $('#content').height('2100');

      // Empty any pre-existing content from
      // div#searchResults.

      $('#searchResults').empty();

      // 2-Second Fade in of Search Results Heading:

      $('#searchHead').fadeIn(2000);

      // Store search results:

      var results = response.result;

      /* Loop over each item in results and create
         a div in which each embedded video iframe
         may live.
      */

      $.each(results.items, function(index, item) {

        // NOTE: Standard width and height for embedded HD YouTube
        //       videos is 640 x 360.

        $('#searchResults').append('<div>' + '<iframe width="425" height ="239"' +
          'src="//www.youtube.com/embed/' + item.id.videoId + '"' +
          'border="0" allowfullscreen>' + '</iframe>' + '</div>');

      }); // end each(results.items)

      // Display Creative Commons License.

      $('#license').show();

      // Display attribution for Jeremy Besols.

      $('#attribution').show();

    }); // end request.execute()

    // Empty User Query Text.

    $('#userQuery').val('');

  } // end sendQuery()

  /* END FUNCTIONS SUPPORTING CREATION OF YouTube QUERY */

  // Send Query to YouTube API:

  // Event Listener for Enter Key:

  $('#userQuery').on('keyup', function(event)  {

    if (event.which === 13 || event.keyCode === 13) {

      sendQuery();

    } // end if

  });

  // Event Listener for Search Button:

  $('#videoSearch').on('click', function(event) {

    // Prevent default behavior of button:

    event.preventDefault();

    // Send Query to YouTube.

    sendQuery();

  });

}); // end $(document).ready()

// Initialize the YouTube API:

function init() {

  // Specify the API Developer Key:

  gapi.client.setApiKey('AIzaSyA9HOMNKiV3K5ZiGDVZlOTFovYyu8MgHYg');

  // Load the YouTube API

  gapi.client.load('youtube', 'v3', function()  {

    // YouTube API is ready. No other functionality has
    // been added to this callback function. Any TODO
    // items may be added here.

  }); // end gapi.client.load()

}   // end init()
