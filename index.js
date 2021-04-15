if (Number(process.version.slice(1).split(".")[0]) < 14)
	throw Error("Node v14 or higher is required. Please update Node on your machine. Refer to the reference below: \nhttps://nodejs.org/en/",);

import Discord from "discord.js";
import fs from "fs";
import weatherData from "./src/commands/weather.js";
const config = JSON.parse(fs.readFileSync("./config/config.json"));
const APIAuth = config.APIKEY;
const token = config.token;
const prefix = config.prefix;
const client = new Discord.Client();

client.on("ready", () => {
	console.log(`Updated ${client.user.tag}!`);
	client.user.setPresence({ activity: { name: ".WeatherHelp for info" }, status: "online" }).catch(console.error);
});

// .WeatherHelp Embed
const weatherHelpEmbed = {
	color: 0x0099ff,
	author: {
		name: "View a given cities current weather conditions:",
	},
	fields: [
		{
			name: "Example use:",
			value: "*.Weather Miami* \n Will return Miami Florida's weather",
		},
		{
			name: "Github open Source:",
			value: "https://github.com/JordonGarcia/WeatherBotDiscord",
		},
		{
			name: "Data API Provider:",
			value: "https://openweathermap.org",
		},
	],
	timestamp: new Date(),
	footer: {
		text: "Weather Live",
	},
};

// Basic Commands
client.on("message", async (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	let args = message.content.toLowerCase().substring(prefix.length).slice().split(/ /);
	let command = args.shift();

	switch (command) {
		case "weatherhelp":
			message.channel.send({ embed: weatherHelpEmbed });
			break;

		case "weather":
			weatherData(message, args, APIAuth);
			break;
	}
});

client.login(token);