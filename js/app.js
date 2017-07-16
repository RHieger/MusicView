// app.js

// 1: Assess Status of DOM Readiness.

$(document).ready(function()  {

  console.log('The DOM is now loaded.');

  $('#videoSearch').on('click', function(event) {

    event.preventDefault();   // Prevent button default behavior.

    console.log('Button clicked!');

  })

  function init() {

    gapi.client.setApiKey('AIzaSyBb3dDwwcSlFrZUE19WdMrBp2CiZnSSfFY');

    gapi.client.load('youtube', 'v3', function()  {

      // YouTube API is ready.

      console.log('YouTube API is Ready.');

    });

  }   // end function init()

});
