import type { PageServerLoad } from './$types';
import * as table from '$lib/server/db/schema';
import pkg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import 'dotenv/config';
import { WorldData } from '$lib/models/WorldData';

const { Pool } = pkg;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});
const db = drizzle(pool);

export const load: PageServerLoad = async ({ params }) => {
	const worldData = await db.select().from(table.worldTable);
	const worlds: WorldData[] = worldData.map((world) => {
		return new WorldData(
			world.foundryVersion,
			world.systemName,
			world.systemVersion,
			world.timezone,
			world.language,
			world?.createdAt ?? new Date()
		);
	});

	return {
		count: worlds.length,
		worlds: worlds.map((world: WorldData) => ({
			foundryVersion: world.foundryVersion,
			systemName: world.systemName,
			systemVersion: world.systemVersion,
			timezone: world.timezone,
			language: world.language,
			createdAt: world.createdAt,
			since: world.since,
		}))
	};
};
