/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.


$(document).ready(() => {

  $( ".fancy-error" ).hide();
  $( ".fancy-error2" ).hide();
  $( ".fancy-footer" ).hide();



  $('.tweetAnchor').click(function() {
    $('.new-tweet').stop().slideToggle('slow', function() {
    })
  })

  
  
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET'})
    .then(function(array) {
      $('.tweetBox').empty();
      renderTweets(array);
    })
  }

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // loadTweets to loop over the database and append

  const createTweetElement = tweetData => {
    return `
    <div class=tweets-container>
    <header>
      <img class='avatar' src='${tweetData.user.avatars}' />
      <span class='name'>${tweetData.user.name}</span>
      <span class='handle'>${tweetData.user.handle}</span>
    </header>
    <div class='tweet-message'>
    
      <p>${escape(tweetData.content.text)}</p>
    </div>
  
    <footer>
      <span class='tweet-date'>${moment(tweetData.created_at).fromNow()}</span>
      <div class='tweet-buttons'>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
    </div>
    `
  }

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweetBox').prepend($tweet);
    }
  }

  const $tweetSend = $('.tweetFunction');
  $tweetSend.on('submit', function(event) {
    $( ".fancy-error" ).hide();
    $( ".fancy-error2" ).hide();
    event.preventDefault();
    const textLength = $tweetSend.find('#tweet-placeholder').val().length;
    if (textLength < 140 && textLength > 0) {
      $.ajax('/tweets', { method: 'POST', data: $tweetSend.serialize()})
      .then(() => {
        loadTweets();
        $tweetSend.trigger('reset');
        $('.counter').text('140');
        $('.counter').css('color', '#555149');
      })
    } else if (textLength > 140) {
      $( ".fancy-error2" ).fadeIn( "slow", function() {
      });
    } else if (textLength <= 0) {
      $( ".fancy-error" ).fadeIn( "slow", function() {
      });
    }
  })


  

  loadTweets();
  
  $( ".fancy-footer" ).on('click', function(event) {
    event.preventDefault();
    window.scrollTo(0, 0); 
  })

  $(window).scroll(function() {     
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
      $( ".fancy-footer" ).fadeIn();  
    } else {
      $( ".fancy-footer" ).fadeOut();
    }
});

});

