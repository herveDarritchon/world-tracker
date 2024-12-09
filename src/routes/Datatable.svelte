<script lang="ts">

	import Search from '$lib/components/Search.svelte';
	import ThFilter from '$lib/components/ThFilter.svelte';
	import ThSort from '$lib/components/ThSort.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	import { DataHandler } from '@vincjo/datatables/legacy';
	import RowPerPage from '$lib/components/RowPerPage.svelte';
	import RowCount from '$lib/components/RowCount.svelte';
	import type { WorldData } from '$lib/models/WorldData';
	import type { WorldsData } from '$lib/models/WorldsData';

	let { data }: { data: WorldData[] } = $props();

	const handler = new DataHandler(data.sort((a:WorldData,b:WorldData)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), { rowsPerPage: 10 });
	const rows = handler.getRows();
</script>

<div class=" overflow-x-auto space-y-2">
	<header class="flex justify-between gap-4">
		<Search {handler} />
		<RowPerPage {handler} />
	</header>
	<table class="table table-hover table-compact table-auto w-full ">
		<thead>
		<tr>

			<ThSort {handler} orderBy="foundryVersion">Foundry Version</ThSort>
			<ThSort {handler} orderBy="systemVersion">System Version</ThSort>
			<ThSort {handler} orderBy="timezone">Timezone</ThSort>
			<ThSort {handler} orderBy="language">Language</ThSort>
			<ThSort {handler} orderBy="since">Since</ThSort>

		</tr>
		<tr>

			<ThFilter {handler} filterBy="foundryVersion" />
			<ThFilter {handler} filterBy="systemVersion" />
			<ThFilter {handler} filterBy="timezone" />
			<ThFilter {handler} filterBy="language" />
			<ThFilter {handler} filterBy="since" />

		</tr>
		</thead>
		<tbody>
		{#each $rows as row}
			<tr>

				<td>{row.foundryVersion}</td>
				<td>{row.systemVersion}</td>
				<td>{row.timezone}</td>
				<td>{row.language}</td>
				<td>{row.since}</td>

			</tr>
		{/each}
		</tbody>
	</table>
	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>
