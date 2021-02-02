// express server to deploy
// server.js file in root of your frontend
const express = require('express')
const axios = require('axios')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 8001
app.use(express.json())
app.use(express.static('build'))
// api stuff here
app.get('/tweets/getTweets', async (req, res) => {
  try {
    const tweets = await axios({
      url: `https://api.twitter.com/1.1/search/tweets.json?q=covid&result_type=popular&count=4&lang=en`,
      method: 'GET',
      headers: {
        Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAPw1MQEAAAAA%2BnKaVgyRfG4TfnfvC6Ss8boCUow%3Dj9CVdyRgXy52MbBgLW47gdxRtlF875buXqTHIiGBsq7FFMVRrb`,
        'Content-Type': 'application/json',
      },
    })
    res.status(200).json(tweets.data)
  } catch (error) {
    res.status(400).json(error)
  }
})
// api stuff ends
// for react router
app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/build/index.html`));
});
app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT)
});
