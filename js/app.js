// app.js

$(document).ready(function()    {

    console.log('The DOM is ready.');

    var topicId;    // topicId for API request

    $('#genres').on('change', function() {

        // Extract topicId from #genres:

        topicId = $(this).val();

    });

    $('#videoSearch').on('click', function(event)    {

        event.preventDefault();

        console.log('Button clicked!');

        // Prepare YouTube API request:
        
        var request = buildQuery(topicId);

        console.log(request);

        // Execute the request:

        request.execute(function(response)  {

            console.log(response);

            $('#content').height('2115');

            $('div#searchResults').html('');

            $('#searchHead').show();

            var results = response.result;

            $.each(results.items, function(index, item)   {

                console.log(item);

                // NOTE: Standard width and height for embedded HD YouTube
                //       videos is 640 x 360.

                $('div#searchResults').append('<div>' + '<iframe width="425" height="239"' +
                 'src="//www.youtube.com/embed/' + item.id.videoId + '"' +
                 'frameborder="0" allowfullscreen>' + '</iframe>' + '</div>');

            });     // end $.each(results.items)

            $('#license').show();

            }); // end request.execute()

            $('#userQuery').val('');

        });    // end $('#searchBtn').on()


    });

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

    function init() {

        gapi.client.setApiKey('AIzaSyA9HOMNKiV3K5ZiGDVZlOTFovYyu8MgHYg');

        gapi.client.load('youtube', 'v3', function()    {

            // YouTube API is ready.

    });

}   // end $(document).ready()
