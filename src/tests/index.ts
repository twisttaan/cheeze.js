import { Client } from 'discord.js';
import { CheezeClient } from '../structs/CheezeClient';
(async () => {
	const discordClient = new Client({
		intents: ['Guilds', 'GuildMembers', 'DirectMessages']
	});

	discordClient.on('ready', () => {
		console.log('Ready!');
	});

	await discordClient.login();

	const client = new CheezeClient({
		transportMethod: discordClient
	});

	console.log('reqqing 2+2');

	try {
		const res = await client.math.solve('2+2');
		console.log(res);
	} catch (e) {
		console.log(e);
	}
})();
