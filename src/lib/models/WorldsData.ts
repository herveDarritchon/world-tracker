import type { WorldData } from '$lib/models/WorldData';

export class WorldsData {
	count: number;
	worlds: WorldData[];

	constructor(count: number, worlds: WorldData[]) {
		this.count = count;
		this.worlds = worlds;
	}
}
