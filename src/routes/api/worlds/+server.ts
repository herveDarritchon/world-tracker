import { json, type RequestEvent } from '@sveltejs/kit';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { drizzle } from 'drizzle-orm/node-postgres';
import { worldTable } from '$lib/server/db/schema';
import pkg from 'pg';
import { eq } from 'drizzle-orm';
import 'dotenv/config';

const { Pool } = pkg;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});
const db = drizzle(pool);

export async function POST(requestEvent: RequestEvent) {
	try {
		const { request } = requestEvent;
		const data = await request.json();

		const { register_key, world_key, foundry_version, system_name, system_version, time_zone, language } =
			data;

		const world: typeof worldTable.$inferInsert = {
			id: generateWorldId(),
			registerKey: register_key,
			worldKey: world_key,
			foundryVersion: foundry_version,
			systemName: system_name,
			systemVersion: system_version,
			timezone: time_zone,
			language: language
		};

		const existingWorld = await db
			.select()
			.from(worldTable)
			.where(eq(worldTable.worldKey, world.worldKey));

		if (existingWorld.length > 0) {
			await db
				.update(worldTable)
				.set({
					foundryVersion: world.foundryVersion,
					systemName: world.systemName,
					systemVersion: world.systemVersion,
					createdAt: new Date()
				})
				.where(eq(worldTable.worldKey, world.worldKey));
		} else {
			await db.insert(worldTable).values(world);
		}
	} catch (e) {
		console.error(e);
		const error = e as Error;
		return json({ message: 'Error', error: error.message }, { status: 500 });
	}
	return json({ success: true });
}

export async function GET() {
	try {
		const allWorlds = await db.select().from(worldTable);
		return json(allWorlds);
	} catch (error) {
		console.error(error);
		return json({ success: false, error: 'Internal Server Error' }, { status: 500 });
	}
}

function generateWorldId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	return encodeBase32LowerCase(bytes);
}
