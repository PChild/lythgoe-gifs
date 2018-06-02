$.get("https://api.apify.com/v1/RsXxWaYMxHPjuX3q9/crawlers/e8Lg5LqmfPgcY5eDy/lastExec/results?token=qhmGuje8Kp6npxmfs2fQMYAQu", function (baseData) {
  console.log(baseData[0]);
  let data = baseData[0].pageFunctionResult;

  let gifPosts = data.filter(item => item.hasGif);
  let textPosts = data.filter(item => !item.hasGif);
  let template = Handlebars.compile($('#gifTemplate').html());

  $(gifPosts).each(i => {
    let element = template({
      "imgSrc": gifPosts[i].gifAddress,
      "postDate": gifPosts[i].date
    });

    $('#gifList').append(element);
  });

  $('#statList').append("<h4><li>In his last 200 posts Matt has posted " + gifPosts.length + " gifs and " + textPosts.length + " text posts.</li></h4>");
  $('#statList').append("<h4><li>Matt's last text post was: <i>\"" + textPosts[0].text + "\"</i> Posted: " + textPosts[0].date + ".</li></h4>");
})