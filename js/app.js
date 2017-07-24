// app.js
//
// API Code for MusicView v1.1
//
// Robert Hieger
//
// July 31, 2017

// Wrap API code in jQuery  that assures the DOM is ready.

$(document).ready(function()  {

  // Log confirmation to console.

  console.log('DOM is ready.');

  // Variable for YouTube topicId:

  var topicId;

  // Extract topicId from #genres:

  $('#genres').on('change', function()  {

    topicId = $(this).val();

    console.log('Topic ID: ' + topicId);

  }); // end $('#genres').on()

}); // end $('#generes')
