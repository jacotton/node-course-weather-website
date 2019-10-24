var request = require('request');


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamFtZXNhY290dG9uIiwiYSI6ImNqdGxld25wbjA3OXU0YXFxeGVsOWhyeWsifQ.UUEfKGPFtZIk77bP6b5Wkw&limit=1&language=en'
    request( { url, json: true}, (error,{body}) => {
      if (error) {
        callback('unable to connect to location services',undefined)
      } else if (body.features.length == 0 ) {
        callback('unable to find location, try another search',undefined)
      } else {
        const latitude=body.features[0].center[1]
        const longitude=body.features[0].center[0]
        callback(undefined,{latitude: latitude,longitude: longitude,location: body.features[0].place_name})
      }
    })
  }

  module.exports = geocode