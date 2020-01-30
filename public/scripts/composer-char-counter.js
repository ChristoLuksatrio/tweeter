$(document).ready((e) => {
  console.log('Document is ready baby!');

  $('#tweet-placeholder').on('input', function(e) {
    const counter = $('.counter');
    const charLength = $(this).val().length;
    const count = 140 - charLength;

    if (count < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '#555149');
    }
     
    counter.text(140 - charLength);

  });

});
