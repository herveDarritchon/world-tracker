<script lang="ts">
	import Datatable from './Datatable.svelte';
	import type { WorldsData } from '$lib/models/WorldsData';
	import type { WorldData } from '$lib/models/WorldData';

	class ContinentData {
		name: string;
		count: number;

		constructor(name: string, count: number) {
			if (name == 'etc') {
				this.name = 'other';
			} else {
				this.name = name;
			}
			this.count = count;
		}
	}

	class LanguageData {
		name: string;
		count: number;
		flag: string;

		constructor(name: string, count: number, flag: string) {
			const flagURLMapping: { [key: string]: string } = {
				'fr': 'https://www.worldometers.info//img/flags/small/tn_fr-flag.gif',
				'en': 'https://www.worldometers.info//img/flags/small/tn_uk-flag.gif',
				'de': 'https://www.worldometers.info//img/flags/small/tn_gm-flag.gif',
				'pt-br': 'https://www.worldometers.info//img/flags/small/tn_br-flag.gif',
				'pt': 'https://www.worldometers.info//img/flags/small/tn_po-flag.gif',
				'ru': 'https://www.worldometers.info//img/flags/small/tn_rs-flag.gif',
				'es': 'https://www.worldometers.info//img/flags/small/tn_sp-flag.gif',
				'la': '/Flag_of_NATO.png'
			};

			this.name = name;
			this.count = count;
			this.flag = flagURLMapping[name] || flag;
		}
	}

	let { data }: { data: WorldsData } = $props();

	let languages: LanguageData[] = Object.entries(data.worlds.reduce((acc: {
		[key: string]: number
	}, world: WorldData) => {
		acc[world.language] = (acc[world.language] || 0) + 1;
		return acc;
	}, {}))
		.map(([language, count]) => new LanguageData(language, count, 'https://www.worldometers.info//img/flags/small/tn_' + language + '-flag.gif'))
		.sort((a, b) => b.count - a.count);

	let continents: ContinentData[] = Object.entries(data.worlds.reduce((acc: {
		[key: string]: number
	}, world: WorldData) => {
		const continent = world.timezone.split('/')[0];
		acc[continent] = (acc[continent] || 0) + 1;
		return acc;
	}, {}))
		.map(([continent, count]) => new ContinentData(continent, count))
		.sort((a, b) => b.count - a.count);

	let worlds = data.worlds.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

</script>

<div class="container">

	<h1>Welcome to "The One Ring" World Tracker</h1>

	<div class="mb-2 w-full max-w-md p-2 text-center">
		<div class="card preset-filled-surface-100-900 border-[1px] border-surface-200-800">
			<div class="header">
				<p class="title">Worlds</p>
			</div>
			<p class="counter">{data.count}</p>
		</div>
	</div>

	<div class="flex flex-row  mb-2 w-full max-w-2xl p-2 text-center justify-center  content-evenly">

		<div class="card  w-72 preset-filled-surface-100-900 border-[1px] border-surface-200-800 mr-6">
			<div class="header">
				<p class="title">Languages</p>
			</div>
			{#each languages as language}
				<div class="language-container items-center">
					<img class="flag" src={language.flag} alt={language.name} />
					<span class="label justify-center">{language.count}</span>
				</div>
			{/each}
		</div>

		<div class="card w-72 preset-filled-surface-100-900 border-[1px] border-surface-200-800">
			<div class="header">
				<p class="title">Continent</p>
			</div>
			{#each continents as continent}
				<div class="language-container">
					<span class="label">{continent.name}</span>
					<span class="label">{continent.count}</span>
				</div>
			{/each}
		</div>

	</div>


	<div class="mt-2 w-full max-w-screen-lg p-2 text-center">
		<div
			class="card preset-filled-surface-100-900 border-[1px] border-surface-200-800">
			<Datatable data={worlds} />
		</div>
	</div>

	<p class="footer">Visit <a
		href="https://gitlab.com/herve.darritchon/foundryvtt-tor2e/-/blob/develop/README.md?ref_type=heads">The One
		Ring v2 (TOR2e)</a> to read the documentation</p>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 2rem;
    }

    .card {
        border-radius: 0.5rem;
        margin: 0;
        padding: 0;
    }

    .header {
        margin-bottom: 1rem;
        background: rgba(169, 169, 169, 0.25);
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
    }

    .title {
        font-size: 1.5rem;
        color: white;
    }

    .counter {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 2rem;
    }

    .footer {
        margin-top: 1rem;
        font-size: 0.75rem;
    }

    .language-container {
        display: flex;
        align-content: space-evenly;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.5rem;
        width: 50%;
        margin-left: auto;
        margin-right: auto;

    }

    .flag {
        width: 3rem;
        height: 2rem;
        margin-right: 0.5rem;
    }

    .language-container .label {
        font-size: 1.5rem;
        font-weight: bold;
        display: flex;
        justify-content: center;
        text-align: center;
    }

    .card {
        margin-right: 2rem;
    }
</style>