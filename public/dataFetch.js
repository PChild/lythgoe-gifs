$.get("https://api.apify.com/v1/RsXxWaYMxHPjuX3q9/crawlers/e8Lg5LqmfPgcY5eDy/lastExec/results?token=qhmGuje8Kp6npxmfs2fQMYAQu", function (baseData) {
  let data = baseData[0].pageFunctionResult;

  let gifPosts = data.filter(item => item.hasGif);
  let textPosts = data.filter(item => !item.hasGif);
  let template = Handlebars.compile($('#gifTemplate').html());

  $('body').append('<audio src="helixAudio.mp3" autoplay loop hidden></audio>');

  $(gifPosts).each(i => {
    let element = template({
      "imgSrc": gifPosts[i].gifAddress,
      "postDate": gifPosts[i].date,
      "threadTitle": gifPosts[i].threadTitle,
      "threadLink": gifPosts[i].threadLink
    });

    $('#gifList').append(element);
  });

  $('#statList').append("<h4><li>In his last 200 posts Matt has posted " + gifPosts.length + " GIFs and " + textPosts.length + " text posts.</li></h4>");
  $('#statList').append("<h4><li>Matt's last text post was: <i>\"" + textPosts[0].text + "\"</i> - " + textPosts[0].date + ".</li></h4>");
})