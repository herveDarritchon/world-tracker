CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"age" integer,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "world" (
	"id" serial PRIMARY KEY NOT NULL,
	"register_key" text NOT NULL,
	"world_key" text NOT NULL,
	"foundry_version" text NOT NULL,
	"system_name" text NOT NULL,
	"system_version" text NOT NULL,
	"time_zone" text NOT NULL,
	"language" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "world_world_key_unique" UNIQUE("world_key")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
