import Discord from 'discord.js';
import axios from 'axios';
import fs from 'fs';

async function sendWeather(client, message, args, APIAuth) {

    let getWeatherData = async () => {
        let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args.join(' ')}&appid=${APIAuth}&units=imperial`);
        let weather = response.data;
        return weather;
    };

    let weatherData = await getWeatherData();

    const weatherEmbedCity = {
        color: 0x0099ff,
        author: {
            name: `Weather for ${weatherData.name}, ${weatherData.sys.country}`,
        },
        description: 'Current Conditions:',
        thumbnail: {
            url: 'https://i.ibb.co/nP4nbR6/Weather-Icon5.png',
        },
        fields: [
            {
                name: '`Current Temperature:`',
                value: `${weatherData.main.temp} Fahrenheit`,
            },
            {
                name: '`Current Wind Speed`',
                value: `${weatherData.wind.speed} MPH`,
            },
            {
                name: '`Current Conditions`',
                value: `${weatherData.weather[0].description}`,
            },
        ],
        timestamp: new Date(),
        footer: {
            text: 'Weather Live',
        },
    };


    message.channel.send({ embed: weatherEmbedCity });
    fs.appendFileSync('logs.txt', `[Weather City Request] ${message.member.user.tag} Requested Weather data from "${args.join(' ')}" - Discord ID [${message.member.id}]` + '\n');

}

export default sendWeather;