import Discord from 'discord.js';
import fs from 'fs';
const json = JSON.parse(fs.readFileSync("./core/config.json").toString());
const token = json.token;
const prefix = json.prefix;
const client = new Discord.Client();
client.on('ready', () => {
    console.log(`Updated ${client.user.tag}!`);
    client.user.setPresence({ activity: { name: ".weather for info" }, status: "dnd" })
});

function commands() {

    // Embed example one //
    const embedOne = new Discord.MessageEmbed()
        .setColor('#00fbff')
        .setTitle('Weather Live GitHub Repository')
        .setURL('https://github.com/LinkSoonTM')
        .setAuthor('Weather Live Feed', 'https://i.ibb.co/m8TV12q/1b288150d11827190f310b435b922cae.jpg', 'https://weather.com')
        .setDescription('This Weather Bot is open source and available for anyone to use.')
        .setThumbnail('https://i.ibb.co/pPPCdH2/e17f10789238e8bcfc9533c38ddb8b22.png')
        .addFields({ name: '\u200B', value: '\u200B' },)
        .addField('Lists all available commands', '.WeatherHelp', true)
        .setImage('https://i.ibb.co/RDdKHL5/084535da2c893fda5d998d5ae4ce01f5.png')
        .setTimestamp()
        .setFooter('Weather Live');

    // Basic Temporary Commands //
    client.on("message", (message) => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        if (message.content.toLowerCase() === `${prefix}weather`) {
            message.channel.send(embedOne);

        } else if (message.content.toLowerCase() === `${prefix}weatherhelp`) {
            message.channel.send('Coming soon!');
        }
    });

} // End of export function

client.login(process.env.DJS_TOKEN);
export default commands;