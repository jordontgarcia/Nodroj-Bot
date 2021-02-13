import axios from 'axios';
import fs from 'fs';
import Canvas from 'canvas';
import Discord from 'discord.js';
import { KToF, KToC, metersToKPH, metersToMPH } from '../functions/conversions.js';

async function sendWeather(message, args, APIAuth) {
    // Fetch API weather data
    let getWeatherData = async () => {
        let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args.join(' ')}&appid=${APIAuth}`);
        let weather = response.data;
        return weather;
    };

    let weatherData = await getWeatherData();
    let canvas = Canvas.createCanvas(2100, 1500);
    let ctx = canvas.getContext('2d');
    let background = await Canvas.loadImage('./media/canvasBackground.jpg')
    let x = canvas.width / 2;
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.textBaseline = "top";
    ctx.font = "92px Verdana";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    // Display City
    ctx.fillText(`Weather conditions for ${weatherData.name}, ${weatherData.sys.country}`, x, 150);
    ctx.font = "75px Verdana";
    // Display Temperatures
    ctx.fillText(`${Math.round(KToF(weatherData.main.temp))}\xB0 Fahrenheit, ${Math.round(KToC(weatherData.main.temp))}\xB0 Celsius`, x, 580);
    ctx.font = "75px Verdana";
    // Display wind conditions
    ctx.fillText(` Wind conditions: ${Math.round(metersToMPH(weatherData.wind.speed))} MPH, ${Math.round(metersToKPH(weatherData.wind.speed))} KPH`, x, 710);
    var attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ExampleImage.jpg');
    ctx.font = "75px Verdana";
    // Display description
    ctx.fillText(`Current Conditions: ${weatherData.weather[0].description}`, x, 830);
    var attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${weatherData.name}.jpeg`);
    // Send the weather result
    message.channel.send(attachment);
    // Log discord command API requests to logs.txt
    fs.appendFileSync('logs.txt', `[Weather City Request] ${message.member.user.tag} Requested Weather data from "${args.join(' ')}" - Discord ID [${message.member.id}]` + '\n');

}

export default sendWeather;