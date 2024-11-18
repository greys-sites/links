<script>
	import { page } from '$app/stores';
	import { replaceState, invalidateAll, goto } from '$app/navigation';
	import { SvelteSet as Set } from 'svelte/reactivity';
	
	import LineChart from '$lib/components/lineChart.svelte';

	import {
		Datepicker,
		Helper
	} from 'flowbite-svelte';

	let { data } = $props();

	let dates = $state({
		from: new Date($page.url.searchParams.get('from')) ?? null,
		to: new Date($page.url.searchParams.get('to')) ?? null
	});

	let selected = new Set();

	$inspect(selected)

	let obj = $derived.by(() => {
		if(!selected.size) {
			return ({
				labels: data.stats.map(d => d.date),
				datasets: [{
					label: "Clicks",
					data: data.stats.map(d => d.count)
				}]
			})
		} else {
			var sts = Array.from(selected.keys()).map((k) => {
				var l = data.links.find(link => link.hid == k);
				console.log(l)
				return ({
					label: l?.name,
					data: l?.stats
				})
			});
			console.log(sts)
			
			return {
				labels: data.stats.map(d => d.date),
				datasets: sts
			}
		}
	})

	let options = {
		animation: false,
		scales: {
			y: {
				min: 0,
				suggestedMax: 5,
				ticks: {
					precision: 0
				}
			},
			x: {
				type: 'timeseries',
				time: {
					unit: 'day'
				}
			}
		}
	}

	let pick = async ({ detail }) => {
		if(!detail.to) return;

		let query = new URLSearchParams($page.url.searchParams.toString());

		query.set('from', detail.from);
		query.set('to', detail.to);
		await goto(`?${query.toString()}`);
	}

	let setSelect = (link) => {
		if(selected.has(link.hid)) selected.delete(link.hid);
		else selected.add(link.hid)
	}
</script>

{#snippet Link(link)}
  <div class="link"
  	onclick={() => setSelect(link)}
  	class:selected={selected.has(link.hid)}
  >
    <div class="inner">
      <a href="/{link.hid}" target="_blank">{link.name}</a>
    </div>
    {#if link.description}
      <div class="desc">
        <Helper>{link.description}</Helper>
      </div>
    {/if}
  </div>
{/snippet}

<div class="container">
	<h1>Overall Stats</h1>
	<Datepicker range
		bind:rangeFrom={dates.from}
		bind:rangeTo={dates.to}
		on:select={pick}
	/>
	<LineChart data={obj} {options} />

	<p class="mt-4 text-lg">
		Select links to show comparisons
	</p>
	{#each data.links as link (link.hid)}
		{@render Link(link)}
	{/each}
</div>