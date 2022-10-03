import type * as Discord from 'discord.js';
import { CHEEZE_USER_ID } from '../Constants';
import { MathResolver } from './MathResolver';

export type Configuration = {
	transportMethod: Discord.Client;
};

export class CheezeClient {
	constructor(private readonly configuration: Configuration) {}

	private async _askCheezeDiscord(query: string) {
		const client = this.configuration.transportMethod as Discord.Client;

		const u = await client.users.fetch(CHEEZE_USER_ID);
		await u.send(query);
		const c = u.dmChannel!;

		return await c
			.awaitMessages({ max: 1, time: 60000, errors: ['time'] })
			.then((collected) => {
				return collected.first()!.content;
			})
			.catch(() => {
				throw new Error('Cheeze did not respond in time');
			});
	}

	private async askCheeze(query: string) {
		switch (this.configuration.transportMethod.constructor.name) {
			case 'Client':
				return await this._askCheezeDiscord(query);
			default:
				throw new Error('Unsupported transport method');
		}
	}

	public math = new MathResolver(this.askCheeze.bind(this));
}
