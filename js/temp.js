$(document).ready(function()  {

  console.log('DOM is ready.');

  // Set the topicId for video search:

  var topicId;    // topicId for API request

  $('#genres').on('change', function() {

    // Extract topicId from #genres:

    topicId = $(this).val();

    console.log('Topic ID for this Search: ' + topicId);

  }); // end $('#genres').on()

  /* FUNCTIONS SUPPORTING CREATION OF QUERY TO BE SENT */

  function buildQuery(topicId)   {

    var request = gapi.client.youtube.search.list({

      part: 'snippet',
      type: 'video',
      maxResults: 24,
      order: 'relevance',
      topicId: topicId,
      q: encodeURIComponent($('#userQuery').val()).replace(/%20/g, '+')

    });

    return request;

  }   // end buildQuery()

  /* END FUNCTIONS SUPPORTING CREATION OF QUERY TO BE SENT */

  // Send Query to YouTube API:

  $('#videoSearch').on('click', function(event)    {

    event.preventDefault();

    console.log('Button clicked!');

    // Prepare YouTube API request:

    var request = buildQuery(topicId);

    console.log('Request Sent to YouTube API: ' + request);

    // Execute the request:

    request.execute(function(response)  {

      console.log(response);

      $('#content').height('2100');

      $('div#searchResults').html('');

      $('#searchHead').fadeIn(2000);

      var results = response.result;

      $.each(results.items, function(index, item)   {

        console.log(item);

        // NOTE: Standard width and height for embedded HD YouTube
        //       videos is 640 x 360.

        $('div#searchResults').append('<div>' + '<iframe width="425" height="239"' +
        'src="//www.youtube.com/embed/' + item.id.videoId + '"' +
        'frameborder="0" allowfullscreen>' + '</iframe>' + '</div>');

      });   // end $.each(results.items)

      $('#license').show();

      $('#attribution').show();

    }); // end request.execute()

    $('#userQuery').val('');

  });    // end $('#searchBtn').on()

});   // end $(document).ready()


// Initialize the YouTube API:

function init() {

  // Set the API Developer Key:

  gapi.client.setApiKey('AIzaSyA9HOMNKiV3K5ZiGDVZlOTFovYyu8MgHYg');

  // Load the YouTube API

  gapi.client.load('youtube', 'v3', function()  {

    // YouTube API is ready. No other functionality has been added
    // to this callback function, at least as yet.

    console.log('YouTube API ready.');

  }); // end gapi.client.load()

}; // end init()
