if (Number(process.version.slice(1).split(".")[0]) < 14)
	throw Error("Node v14 or higher is required. Please update Node on your machine. Refer to the reference below: \nhttps://nodejs.org/en/",);

import Discord from 'discord.js';
import fs from "fs";
import weatherData from './weather/src/main/weather.js';
// import weatherCommands from './weather/src/commands/'
const config = JSON.parse(fs.readFileSync("./config/config.json"));
const APIAuth = config.APIKEY;
const token = config.token;
const prefix = config.prefix;
const client = new Discord.Client();

client.on("ready", () => {
	console.log(`Updated ${client.user.tag}!`);
	client.user.setPresence({ activity: { name: ".Nodroj for help" }, status: "idle" }).catch(console.error);
});

// .Nodroj Help Embed
const NodrojEmbed = {
	"title": "Thanks for trying out Nodroj Bot!",
	"description": "\n[Nodroj Bot Source Code](https://github.com/JordonGarcia/Nodroj-Bot) ```\nIncludes:\nWeather Features \nCrypto Features \n```",
	"url": "https://discordapp.com",
	"color": 579300,
	"timestamp": "2021-04-20T05:20:50.134Z",
	"footer": {
		"icon_url": "https://i.ibb.co/nj9z0B2/Nodroj.webp",
		"text": "Nodroj Bot"
	},
	"thumbnail": {
		"url": "https://i.ibb.co/nj9z0B2/Nodroj.webp"
	},
	"author": {
		"name": "Nodroj Bot Overview",
		"url": "https://discordapp.com",
		"icon_url": "https://i.ibb.co/nj9z0B2/Nodroj.webp"
	},
	"fields": [
		{
			"name": "`.weather Miami`",
			"value": "This returns the current weather for Miami"
		},
		{
			"name": "`.weather forecast Miami`",
			"value": "Coming soon!"
		},
		{
			"name": "`Crypto Feature:`",
			"value": ".crypto BTC (Coming soon)"
		},
		{
			"name": "Nodroj Bot Weather",
			"value": "Version 0.1 BETA",
			"inline": true
		},
		{
			"name": "Nodroj Bot Crypto",
			"value": "UNRELEASED",
			"inline": true
		}
	]
}

// Basic Commands
client.on("message", async (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	let args = message.content.toLowerCase().substring(prefix.length).slice().split(/ /);
	let command = args.shift();

	switch (command) {
		case "nodroj":
			message.channel.send({ embed: NodrojEmbed });
			break;

		case "weather":
			weatherData(message, args, APIAuth);
			break;
	}
});

client.login(token);