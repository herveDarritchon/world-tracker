import type { PageServerLoad } from './$types';
import * as table from '$lib/server/db/schema';
import pkg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import 'dotenv/config';

const { Pool } = pkg;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});
const db = drizzle(pool);

export const load: PageServerLoad = async ({ params }) => {
	console.log('Params:', params);
	const worlds = await db.select().from(table.worldTable);
	console.log('Worlds:', worlds);
	return {
		count: worlds.length
	};
};
