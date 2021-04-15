import axios from 'axios';
import fs from 'fs';
import Canvas from 'canvas';
import country from '../../data/countries.js';
import weatherConditions from '../functions/conditions.js';
import Discord from 'discord.js';
import { KToF, KToC, metersToKPH, metersToMPH } from '../functions/conversions.js';

async function sendWeather(message, args, APIAuth) {
    // Fetch API weather data
    let getWeatherData = async () => {
        let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args.join(' ' + "")}&appid=${APIAuth}`);
        let weather = response.data;
        return weather;
    };

    let weatherData = await getWeatherData();
    let canvas = Canvas.createCanvas(2100, 1500);
    let ctx = canvas.getContext('2d');
    let x = canvas.width / 2;
    ctx.lineWidth = 50;
    ctx.strokeStyle = "#cfcfcf";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.textBaseline = "top";
    ctx.font = "90px Verdana";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    // Display City
    ctx.fillText('Weather Conditions For:', x, 160);
    ctx.fillText(`${weatherData.name}, ${(country[weatherData.sys.country])}`, x, 290);
    ctx.fillText(`${weatherData.name}, ${(country[weatherData.sys.country])}`, x, 290);
    ctx.font = "75px Verdana";
    // Display description
    ctx.fillText(`Conditions: ${(weatherConditions[weatherData.weather[0].description])}`, x, 670); // 130 Y axis spacing
    // Display Temperatures
    ctx.fillText(`${Math.round(KToF(weatherData.main.temp))}\xB0 Fahrenheit, ${Math.round(KToC(weatherData.main.temp))}\xB0 Celsius`, x, 800);  // 130 Y axis spacing
    // Display wind conditions
    ctx.fillText(` Wind Conditions: ${Math.round(metersToMPH(weatherData.wind.speed))} MPH, ${Math.round(metersToKPH(weatherData.wind.speed))} KPH`, x, 920);  // 130 Y axis spacing
    var attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ExampleImage.jpg');
    var attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${weatherData.name}.jpeg`);
    // Send the weather result
    message.channel.send(attachment);
    // Log discord command API requests to logs.txt
    fs.appendFileSync('logs.txt', `[Weather City Request] ${message.member.user.tag} Requested Weather data from "${args.join(' ')}" - Discord ID [${message.member.id}]` + '\n');
}

export default sendWeather;