/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.


$(document).ready(() => {

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
      <span class='tweet-date'>${tweetData.created_at}</span>
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
    for (const tweet in tweets) {
      const $tweet = createTweetElement(tweets[tweet]);
      $('.tweetBox').prepend($tweet);
    }
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

  const $tweetSend = $('.tweetFunction');
  $tweetSend.on('submit', function(event) {
    event.preventDefault();
    const textLength = $tweetSend.serialize().length - 5;
    if (textLength < 140 && textLength > 0) {
      $.ajax('/tweets', { method: 'POST', data: $tweetSend.serialize()})
      .then(() => {
        loadTweets();
        $tweetSend.trigger('reset');
      })
    } else if (textLength > 140) {
      alert('Your tweet cannot be beyond 140 characters');
    } else if (textLength <= 0) {
      alert('Please enter your tweet');
    }
  })


  

  loadTweets();

});

