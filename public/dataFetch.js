function findDuplicates(gifPosts) {

}

$.get("https://api.apify.com/v1/RsXxWaYMxHPjuX3q9/crawlers/e8Lg5LqmfPgcY5eDy/lastExec/results?token=qhmGuje8Kp6npxmfs2fQMYAQu", function (baseData) {
  let data = [...baseData[0].pageFunctionResult, ...baseData[1].pageFunctionResult, ...baseData[2].pageFunctionResult]


  console.log(data);

  let gifPosts = data.filter(item => item.hasGif);
  let textPosts = data.filter(item => !item.hasGif);
  let gifTemplate = Handlebars.compile($('#gifTemplate').html());
  let postTemplate = Handlebars.compile($('#postTemplate').html());

  let lastPostElement = postTemplate({
    leaderText: "Matt's latest text post was: ",
    postText: textPosts[0].text,
    postDate: textPosts[0].date,
    threadLink: textPosts[0].threadLink,
    threadTitle: textPosts[0].threadTitle
  });

  let last = textPosts.length - 1;
  let earlyPostElement = postTemplate({
    leaderText: "Matt's earliest captured post was: ",
    postText: textPosts[last].text,
    postDate: textPosts[last].date,
    threadLink: textPosts[last].threadLink,
    threadTitle: textPosts[last].threadTitle
  });

  let uniqueGifs = [...new Set(gifPosts.map(item => item.gifAddress.substr(14)))].length

  $('#statList').append("<h4><li>In his last " + data.length + " posts Matt has posted " + gifPosts.length + " GIFs and " + textPosts.length + " text posts.</li></h4>");
  $('#statList').append("<h4><li>" + uniqueGifs + " out of " + gifPosts.length + " of Matt's GIFs have been unique.</li></h4>");
  $('#statList').append(lastPostElement);
  $('#statList').append(earlyPostElement)

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