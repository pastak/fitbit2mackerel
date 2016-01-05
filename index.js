'use strict'
const FitbitClient = require('fitbit-client-oauth2')
const request = require('request')
const config = require('./config')
const clientId = config.CLIENT_ID
const clientSecret = config.CONSUMER_SECRET
const client = new FitbitClient(clientId, clientSecret)
const token = client.createToken({
    access_token: config.ACCESS_TOKEN,
    refresh_token: config.REFRESH_TOKEN
})
client.refreshAccessToken(token, {forceRefresh: true}).then((newToken) => {
  client.getTimeSeries(newToken, {resourcePath: 'activities/heart', period: '1d/1sec'}).then((res) => {
    const _config = `module.exports = ${JSON.stringify(Object.assign(config, {
      ACCESS_TOKEN: newToken.token.access_token,
      REFRESH_TOKEN: newToken.token.refresh_token
    }))}`
    require('fs').writeFile('./config.js', _config)
    const dataset = res['activities-heart-intraday'].dataset
    const d = new Date()
    const today = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    const metrics = dataset.map((item) => {return {
      name: 'heartbeat',
      time: Date.parse(`${today} ${item.time}`)/1000,
      value: item.value
    }})
    request.post({
      url: 'https://mackerel.io/api/v0/services/vital/tsdb',
      body: JSON.stringify(metrics),
      headers: {
        'X-Api-Key': config.MACKEREL_API_TOKEN,
        'Content-Type': 'application/json'
      }
    }, function (err, res, body) {
      if (err) return console.error(err)
      console.log(body)
    })
  }).catch((err) => console.log(err.error))
}).catch((e) => console.log(e))
