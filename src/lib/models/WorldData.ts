export  class WorldData {
		language: string;
		foundryVersion: string;
		systemName: string;
		systemVersion: string;
		timezone: string;
		createdAt: Date;
		since: number;
		
	constructor(foundryVersion: string, systemName: string, systemVersion: string, timezone: string, language: string, createdAt: Date) {
		this.foundryVersion = foundryVersion;
		this.systemName = systemName;
		this.systemVersion = systemVersion;
		this.timezone = timezone.toLowerCase();
		this.language = language.toLowerCase();
		this.createdAt = createdAt;
		this.since = Math.floor((new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
	}
}