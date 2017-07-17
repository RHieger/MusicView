// app.js

$(document).ready(function()    {

    console.log('The DOM is ready.');

    $('#videoSearch').on('click', function(event)    {

        event.preventDefault();

        console.log('Button clicked!');

        // Prepare YouTube API request:

        var request = gapi.client.youtube.search.list({

            part: 'snippet',
            type: 'video',
            maxResults: 24,
            order: 'viewCount',
            publishedAfter: '2015-01-01T00:00:00Z',
            q: encodeURIComponent($('#userQuery').val()).replace(/%20/g, '+')
            //maxResults: 3,
            //order: 'viewCount',
            //publishedAfter: '2015-01-01T00:00Z'

        }); // end request

        // Execute the request:

        request.execute(function(response)  {

            console.log(response);

            $('div#searchResults').html('');

            var results = response.result;

            $.each(results.items, function(index, item)   {

                console.log(item);

                // NOTE: Standard width and height for embedded HD YouTube
                //       videos is 640 x 360.

                // $('div#searchResults').append('<div>' + '<iframe width="480" height="270"' +
                //  'src="//www.youtube.com/embed/' + item.id.videoId + '"' +
                //  'frameborder="0" allowfullscreen>' + '</iframe>' + '</div>');

                $('div#searchResults').append('<div>' + '<iframe width="450" height="253"' +
                 'src="//www.youtube.com/embed/' + item.id.videoId + '"' +
                 'frameborder="0" allowfullscreen>' + '</iframe>' + '</div>');

            });     // end $.each(results.items)

        }); // end request.execute()

        $('#userQuery').val('');

    });    // end $('#searchBtn').on()

}); 

function init() {

    gapi.client.setApiKey('AIzaSyA9HOMNKiV3K5ZiGDVZlOTFovYyu8MgHYg');

    gapi.client.load('youtube', 'v3', function()    {

        // YouTube API is ready.

    });

}   // end $(document).ready()
