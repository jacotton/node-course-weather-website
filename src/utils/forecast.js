
var request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/a33df0de1d78c392ce402ba3d9e8f3e7/'+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=uk2&lang=en'
    request( { url , json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather service',undefined)
        } else if (body.error) {
            callback('unable to find location',undefined)
        } else {
            callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees outside. There is a '+body.currently.precipProbability*100+'% chance of rain')
        }
    } )
}

module.exports = forecast



// request( { url: url , json: true }, (error, response) => {
//   //  console.log(response.body.currently)
//   //  console.log(error)
//   if (error) {
//     console.log("unable to connect to weather service") 
//   } else if (response.body.error) {
//     console.log("unable to find location")
//   } else {
//     console.log(response.body.daily.data[0].summary+' It is currently '+response.body.currently.temperature+' degrees outside. There is a '+response.body.currently.precipProbability*100+'% chance of rain')
//   }
// })

