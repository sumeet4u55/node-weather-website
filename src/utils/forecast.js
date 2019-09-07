let request = require('request');
let chalk = require('chalk');

let forecast = ({ lattitude, longitude }, callback) => {
    let url = `https://api.darksky.net/forecast/ae83257ac53c12121a842679bcb8f988/${lattitude},${longitude}?units=si`
    request({
        url,
        json: true
    }, function(error, response, body){
        if(error || response.body.error){
            console.log(chalk`Unable to connect to Weather service!`);
            callback(error)
        } else {
            console.log(chalk`The temperature today from currently is {bold.green ${body.currently.temperature}} and chances of rain {bold.green ${body.currently.precipProbability}}%`);
            callback(null, {
                forecast: `${body.currently.summary} The temperature today from currently is ${body.currently.temperature} and chances of rain ${`${body.currently.precipProbability}`*100}%`
            })
        }
    });
}

module.exports.forecast = forecast;