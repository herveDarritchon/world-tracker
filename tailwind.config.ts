import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import * as themes from '@skeletonlabs/skeleton/themes';
import { contentPath, skeleton } from '@skeletonlabs/skeleton/plugin';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', contentPath(import.meta.url, 'svelte')],
	theme: {
		extend: {}
	},
	plugins: [
		skeleton({
			// NOTE: each theme included will be added to your CSS bundle
			themes: [themes.cerberus, themes.rose]
		}),
		typography,
		forms,
		containerQueries
	]
} satisfies Config;
