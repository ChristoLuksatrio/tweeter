/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]



$(document).ready(() => {
  
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET'})
    .then(function(array) {
      renderTweets(array)
    })
  }

  const createTweetElement = tweetData => {
    return `
    <div class=tweets-container>
    <header>
      <img class='avatar' src='${tweetData.user.avatars}' />
      <span class='name'>${tweetData.user.name}</span>
      <span class='handle'>${tweetData.user.handle}</span>
    </header>
    <div class='tweet-message'>
      <p>${tweetData.content.text}</p>
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
    console.log(tweets);
    for (const tweet in tweets) {
      const $tweet = createTweetElement(tweets[tweet]);
      $('.tweetBox').append($tweet);
    }
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }
  
  // renderTweets(loadTweets());

  const $tweetFunction = $('.tweetFunction');
  $tweetFunction.submit((event) => {
    console.log('it worked!')
    event.preventDefault();
  })

  loadTweets();

});