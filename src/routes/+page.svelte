<script lang="ts">
	import Datatable from './Datatable.svelte';
	import type { WorldsData } from '$lib/models/WorldsData';

	let { data }: { data: WorldsData } = $props();

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

	<div class="mt-2 w-full max-w-screen-lg p-2 text-center">
		<div
			class="card preset-filled-surface-100-900 border-[1px] border-surface-200-800">
			<Datatable data={data.worlds} />
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
</style>