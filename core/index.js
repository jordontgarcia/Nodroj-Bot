import Discord from 'discord.js';
import Weather from './weather.js';
import fs from 'fs';
const json = JSON.parse(fs.readFileSync("./core/config.json"));
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
        .addField('List all the available commands with:', '.WeatherHelp', true)
        .setImage('https://i.ibb.co/RDdKHL5/084535da2c893fda5d998d5ae4ce01f5.png')
        .setTimestamp()
        .setFooter('Weather Live');

    // Commands
    client.on("message", (message) => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        let args = message.content.slice(prefix.length).trim().split(' ');
        let command = args.shift().toLowerCase();

        switch (command) {
            case 'weather': {
                message.channel.send(weatherEmbedMain);
                break;
            }
            case 'weatherhelp': {
                message.channel.send("Coming soon!");
                break;
            }
            case 'kansas': {
                message.channel.send(Weather("test69"));
            }
        }
    });

} // Export function end

client.login(token);
export default commands;