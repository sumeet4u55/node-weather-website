let request = require('request');
let chalk = require('chalk');

let geoCode = (search, cb) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(search)}.json?access_token=pk.eyJ1Ijoic3VtZWV0NHU1NSIsImEiOiJjazA1cXRmNG4zdDE5M2VtajFiYXM0ZGpsIn0.Cqhc9VOI-HHFojFQrJDT-g&limit=1`;
    request({
        url,
        json: true
    }, function (error, response, body) {
        
        if(error || response.body.message || response.body.features.length === 0){
            console.log(chalk`Unable to connect to Weather service!`);
            cb('Service Unavailable');
        } else {
            let data = body.features[0];
            console.log(chalk`You are in {bold.blue ${data.place_name}} and lattitude: {bold.green ${data.center[1]}} longitude: {bold.green ${data.center[0]}}`);
            
            cb(null, {
                longitude: data.center[0],
                lattitude: data.center[1],
                place_name: data.place_name
            });
        }
    });
};

module.exports.geoCode = geoCode;