$.get("https://api.apify.com/v1/RsXxWaYMxHPjuX3q9/crawlers/e8Lg5LqmfPgcY5eDy/lastExec/results?token=qhmGuje8Kp6npxmfs2fQMYAQu", function (baseData) {
  console.log(baseData[0]);
  let data = baseData[0].pageFunctionResult;

  let gifPosts = data.filter(item => item.hasGif);
  let textPosts = data.filter(item => !item.hasGif);

  $(gifPosts).each(i => {
    $('#gifList').append('<div class="card" style="width: 18rem;"><img class="card-img-top" src="' + gifPosts[i].gifAddress + '" alt="Card image cap"><div class="card-body"><h5 class="card-title">' + gifPosts[i].date + '</h5></div></div><br>')
  });

  $('#statList').append("<h3><li>In his last 200 posts Matt has posted " + gifPosts.length + " gifs and " + textPosts.length + " text posts.</li></h3>");
  $('#statList').append("<h3><li>Matt's last text post was: <i>\"" + textPosts[0].text + "\"</i> It was posted: " + textPosts[0].date + ".</li></h3>");
})