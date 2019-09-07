const path = require('path');
const express = require('express');

const { geoCode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');

const app = express();
let port = process.env.PORT || 8080;

//Define Path FOr Express config!
const pathToPublic = path.join(__dirname, '../public');

//set up EJS and dir for views in them.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../templates'));

//static directory to serve.
app.use(express.static(pathToPublic));


app.get('/', (req, res)=>{
    res.render('index', {
        title: 'From a EJS template!!',
        name: 'Sumeet'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About the Weather app',
        name: 'Sumeet'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        help: 'Do you need more help to understand help -->',
        title: 'I am the help page',
        name: 'Sumeet'
    });
});

app.get('/products', (req, res)=>{
    res.send({
        products:[req.query.search]
    });
});

app.get('/weather', (req, res)=>{

    if(!req.query.address || req.query.address.length === 0){
        return res.send({
            message: 'No address in the query bro!!'
        });
    }
    geoCode(req.query.address, function(err, response = {}){
        if(err){
            return res.send({
                message: err
            });
        }
        forecast(response, function(error, resp){
            if(error){
                return res.render({
                    message: error
                });
            }
            resp.place = response.place_name;
            resp.address = req.query.address;
            res.send(resp);
        })
    });
});

app.get('/help/*', (req, res)=>{
    res.render('notFound', {
        title: 'Page not found 404!!',
        name: 'My name is Sumeet Author!!',
        message: 'For help related stuff you need more access!!'
    });
});

app.get('*', (req, res)=>{
    res.render('notFound', {
        title: 'Page not found 404!!',
        name: 'My name is Sumeet Author!!',
        message: 'Let me tell you right now i do not support this!!'
    });
});

app.listen(port, ()=>{
    console.log(`Started port ${port}!!`);
});