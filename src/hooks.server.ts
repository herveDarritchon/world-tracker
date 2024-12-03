import { sequence } from '@sveltejs/kit/hooks';
import { i18n } from '$lib/i18n';
import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth.js';

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);
	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};

const handleCors: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		filterSerializedResponseHeaders: (name) => name === 'content-type'
	});

	// Ajoutez les en-têtes CORS
	response.headers.set('Access-Control-Allow-Origin', '*'); // Remplacez '*' par des DNS spécifiques si nécessaire
	response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	// Gérer les pré-requêtes OPTIONS
	if (event.request.method === 'OPTIONS') {
		return new Response(null, {
			status: 204,
			headers: response.headers
		});
	}

	return response;
};

const handleParaglide: Handle = i18n.handle();

export const handle: Handle = sequence(handleCors, handleAuth, handleParaglide);
