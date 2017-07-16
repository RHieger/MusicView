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
            maxResults: 3,
            order: 'viewCount',
            publishedAfter: '2015-01-01T00:00:00Z',
            q: encodeURIComponent($('#userQuery').val()).replace(/%20/g, '+')
            //maxResults: 3,
            //order: 'viewCount',
            //publishedAfter: '2015-01-01T00:00Z'

        });

        // Execute the request:

        request.execute(function(response)  {

            console.log(response);

            $('#results').html('');

            var results = response.result;

            $.each(results.items, function(index, item)   {

                console.log(item);

                //$('#results').append(item.id.videoId + ' ' +
                    //item.snippet.title + '<br />');

                $('#searchResults').append('<h2>' + item.snippet.title + '</h2>' +
                 '<iframe class="video w100" width="640" height="360"' +
                 'src="//www.youtube.com/embed/' + item.id.videoId + '"' +
                 'frameborder="0" allowfullscreen>' +        
                 '</iframe>');

                // $.get('tpl/item.html', function(data)   {

                //     $('#results').append(data);

                // });

            });

        }); // end request.execute()

        $('#search').val('');

    });    // end $('#searchBtn').on()

}); 

function init() {

    gapi.client.setApiKey('AIzaSyBb3dDwwcSlFrZUE19WdMrBp2CiZnSSfFY');

    gapi.client.load('youtube', 'v3', function()    {

        // YouTube API is ready.

    });

}