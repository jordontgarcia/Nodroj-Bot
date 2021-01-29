import Discord from 'discord.js';
import fs from 'fs';
import weatherData from './commands/weather.js';
const json = JSON.parse(fs.readFileSync("./config/config.json"));
const APIAuth = json.APIKEY;
const token = json.token;
const prefix = json.prefix;
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Updated ${client.user.tag}!`);
    client.user.setPresence({ activity: { name: ".WeatherHelp for info" }, status: "online" }).catch(console.error)
});

// General help Weather embed
const weatherEmbedMain = new Discord.MessageEmbed()
    .setColor('#00fbff')
    .setTitle('Weather Live GitHub Repository')
    .setURL('https://github.com/JordonGarcia/WeatherBotDiscord')
    .setDescription('To view a given cities general weather, use the command .Weather "CityName". For example, you can do ".Weather Miami" for Miami Florida\'s current general weather conditions.')
    .setImage('https://cdn.dribbble.com/users/823181/screenshots/14958600/media/3b0cf90e738110f6def69aadacc4fc4b.png?compress=1&resize=1000x750')
    .setTimestamp()
    .setFooter('Weather Live.');

// Commands
client.on("message", async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let args = message.content.toLowerCase().substring(prefix.length).slice().split(/ /);
    let command = args.shift();

    switch (command) {
        case 'weatherhelp':
            message.channel.send(weatherEmbedMain);
            break;

        case 'weather':
            sendWeather(client, message, args, APIAuth);
            break;
    }
});

client.login(token);

// TODO:

  // Add API request cool down to prevent overuse and spam.
  // Remove Imperial on link and make default Fahrenheit, but allow users to request Celsius as well.
  // Require users to specify country/state/province, to make sure they are getting the right location.
  // Add weatherHelp command that contains a key of all commands.
  // Add more information such as .weather exampleCity sunset", or .weather exampleCity All" which display all weather information.
  // Add ability to selectively choose cities and save them to "you" for example, .weatherAdd New York adds new york to your profile,
  // Only you have access to see your cities for privacy reasons, and only works via DM. So you can do .weather myCities and it displays all your cities weather.
  // Add weather maps and live radar and updated satellite imagery.