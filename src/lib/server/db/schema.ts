import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const worldTable = pgTable("world", {
	id: text("id").primaryKey(),
	registerKey: text("register_key").notNull(),
	worldKey: text("world_key").unique().notNull(),
	foundryVersion: text("foundry_version").notNull(),
	systemName: text("system_name").notNull(),
	systemVersion: text("system_version").notNull(),
	timezone: text("time_zone").notNull(),
	language: text("language").notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type World = typeof worldTable.$inferSelect;
