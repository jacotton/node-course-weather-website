const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)

const app = express()
//access environment variable set by Heroku
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath = path.join(__dirname,'..','public')
const viewsPath = path.join(__dirname,'..','templates','views')
const partialsPath = path.join(__dirname,'..','templates','partials')

//Setup handlebars engine and views
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory for server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'James Cotton'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        help_message: 'help me you fool!',
        name: 'James Cotton'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'James Cotton'
    })
})

app.get('/weather',(req,res)=>{
    if (! req.query.address) {
        return res.send({error: 'you must provide an address'})
    }
    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        if (error) { return res.send({error: 'geocoding error: '+error}) } 
        forecast(latitude,longitude, (error, weather_data) => {
          if (error) {
            return res.send({error: 'forecasting error: '+error})
          }
          res.send({address: req.query.address,location, latitude, longitude,forecast: weather_data})
        })
        
    })
    //res.send({address: req.query.address, location: 'Basildon', forecast: '50 degrees'})
    // res.send('<h1>weather</h1>')
   // res.send([{name: 'cotton',age: 93, where: 'globtown'},{name: 'dot',age: 9, where: 'globtown'}])
})

app.get('/products',(req,res) => {
    if (! req.query.search) {
        return res.send({error: 'you must provide a search term'})
    }  
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: 'Help',
        error_message: 'help article not found',
        name: 'James Cotton'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        error_message: 'page not found',
        name: 'James Cotton'
    })
})

app.listen(port,() => {
    console.log('express listening on port '+port)
})