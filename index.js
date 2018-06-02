const express = require('express')
const path = require('path')
const request = require('request')
const PORT = process.env.PORT || 5000

function fetchData() {
  request.get("https://api.apify.com/v1/RsXxWaYMxHPjuX3q9/crawlers/e8Lg5LqmfPgcY5eDy/lastExec/results?token=qhmGuje8Kp6npxmfs2fQMYAQu", (error, response, body) => {
    if (error) {
      return;
    }

    return JSON.parse(body).pageFunctionResult;
  })
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))