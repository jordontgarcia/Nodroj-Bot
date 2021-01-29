import Discord from 'discord.js';
import axios from 'axios';
import fs from 'fs';

async function weatherData(client, message, args, APIAuth) { //WHAT

    let getWeatherData = async () => {
        let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args.join(' ')}&appid=${APIAuth}&units=imperial`);
        let weather = response.data;
        return weather;
    };

    let weatherData = await getWeatherData();

    // Displaying specific city general weather
    const weatherEmbedCity = new Discord.MessageEmbed()
        .setColor('#00fbff')
        .setTitle(`${weatherData.name}, ${weatherData.sys.country} Current Weather:`)
        .addField('Current Temperature:', `${weatherData.main.temp} Fahrenheit`, true)
        .addField('Current Wind Speed:', `${weatherData.wind.speed} MPH`, true)
        .addField('Current Conditions:', `${weatherData.weather[0].description}`)
        .setFooter("Weather Live. ")
        .setTimestamp();

    message.channel.send(weatherEmbedCity)

    fs.appendFileSync('logs.txt', `[Weather City Request] ${message.member.user.tag} Requested Weather data from "${args.join(' ')}" - Discord ID [${message.member.id}]` + '\n');

}

export default weatherData;