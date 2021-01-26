import Discord from 'discord.js';
import axios from 'axios';
import fs from 'fs';
const json = JSON.parse(fs.readFileSync("./core/config.json"));
const APIAuth = json.APIKEY;
const token = json.token;
const prefix = json.prefix;
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Updated ${client.user.tag}!`);
    client.user.setPresence({ activity: { name: ".Weather for info" }, status: "dnd" }).catch(console.error)
});

function commands() {

    // .Weather Main Embed
    const weatherEmbedMain = new Discord.MessageEmbed()
        .setColor('#00fbff')
        .setTitle('Weather Live GitHub Repository')
        .setURL('https://github.com/JordonGarcia/WeatherBotDiscord')
        .setAuthor('Weather Live Feed', 'https://i.ibb.co/m8TV12q/1b288150d11827190f310b435b922cae.jpg', 'https://weather.com')
        .setDescription('This Weather Bot is open source and available for anyone to use.')
        .setThumbnail('https://i.ibb.co/pPPCdH2/e17f10789238e8bcfc9533c38ddb8b22.png')
        .addFields({ name: '\u200B', value: '\u200B' },)
        .addField('Lists all the available commands:', '.WeatherHelp', true)
        .setImage('https://i.ibb.co/RDdKHL5/084535da2c893fda5d998d5ae4ce01f5.png')
        .setTimestamp()
        .setFooter('Weather Live');

    // Commands
    client.on("message", async (message) => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        let args = message.content.slice(prefix.length).trim().split(' ');
        let command = args.shift().toLowerCase();

        switch (command) {
            case 'weatherhelp': {
                message.channel.send("Coming soon!");
                break;
            }
            case 'weather': {
                let getWeatherData = async () => {
                    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&appid=${APIAuth}&units=imperial`);
                    let weather = response.data;
                    return weather;
                };
                let weatherData = await getWeatherData();
                // TODO: Logging here
                message.channel.send(`The current weather for ${weatherData.name}, ${weatherData.sys.country} is ${weatherData.main.temp} degrees Fahrenheit, and feels like ${weatherData.main.feels_like} degrees Fahrenheit.`);
            }
        }
    });

} // Exported function ends here
client.login(token);
export default commands

// TODO:

  // Add API request cool down to prevent overuse and spam.
  // Remove Imperial on link and make default Fahrenheit, but allow users to request Celsius as well.
  // Require users to specify country/state/province, to make sure they are getting the right location.
  // Add weatherHelp command that contains a key of all commands.
  // Add more information such as .weather exampleCity sunset", or .weather exampleCity All" which display all weather information.
  // Add ability to selectively choose cities and save them to "you" for example, .weatherAdd New York adds new york to your profile,
  // Only you have access to see your cities for privacy reasons, and only works via DM. So you can do .weather myCities and it displays all your cities weather.
  // Add weather maps and live radar and updated satellite imagery.