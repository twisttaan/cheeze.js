import type { ReqFunc } from './ReqFunc';

export class MathResolver {
	constructor(private readonly req: ReqFunc) {}

	intersect(res: string): number {
		const tokens = res.split(' ');
		const numTokens: number[] = [];

		for (const token of tokens) {
			const num = Number(token);
			if (!isNaN(num)) {
				numTokens.push(num);
			}
		}

		if (numTokens.length === 0) {
			throw new Error('No numbers found in response');
		} else {
			return numTokens[numTokens.length - 1];
		}
	}

	async solve(query: string): Promise<number> {
		const res = await this.req(query);

		return this.intersect(res);
	}
}
