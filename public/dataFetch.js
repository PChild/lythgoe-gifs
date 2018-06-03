$.get("https://api.apify.com/v1/RsXxWaYMxHPjuX3q9/crawlers/e8Lg5LqmfPgcY5eDy/lastExec/results?token=qhmGuje8Kp6npxmfs2fQMYAQu", function (baseData) {
  let data = baseData[0].pageFunctionResult;

  let gifPosts = data.filter(item => item.hasGif);
  let textPosts = data.filter(item => !item.hasGif);
  let gifTemplate = Handlebars.compile($('#gifTemplate').html());
  let postTemplate = Handlebars.compile($('#postTemplate').html());

  let element = postTemplate({
    postText: textPosts[0].text,
    postDate: textPosts[0].date,
    threadLink: textPosts[0].threadLink,
    threadTitle: textPosts[0].threadTitle
  })

  $('#statList').append("<h4><li>In his last 200 posts Matt has posted " + gifPosts.length + " GIFs and " + textPosts.length + " text posts.</li></h4>");
  $('#statList').append(element);

  $(gifPosts).each(i => {
    let element = gifTemplate({
      "imgSrc": gifPosts[i].gifAddress,
      "postDate": gifPosts[i].date,
      "threadTitle": gifPosts[i].threadTitle,
      "threadLink": gifPosts[i].threadLink
    });

    $('#gifList').append(element);
  });

  $(function () {
    $('.lazy').lazy({
      effect: "fadeIn",
      effectTime: 500,
      threshold: 0,
      onError: function (element) {
        element[0].setAttribute('src', 'lythNo.png');
        console.log(element);
      }
    });
  });
})