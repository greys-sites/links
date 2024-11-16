<script>
	import LineChart from '$lib/components/lineChart.svelte';

	let { data } = $props();

	let obj = {
		labels: data.arranged.map(d => d.date),
		datasets: [{
			label: "Clicks",
			data: data.arranged.map(d => d.count)
		}]
	}

	let options = {
		animation: false,
		plugins: {
			legend: {
				display: false
			}
		},
		scales: {
			y: {
				min: 0,
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
</script>

<div class="container">
	<h1>Overall Stats</h1>
	<LineChart data={obj} {options} />
</div>