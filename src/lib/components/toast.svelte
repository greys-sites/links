<script>
	import { dismiss } from '$lib/stores/toasts';
	import { fly } from 'svelte/transition';

	/** @type {{props?: any}} */
	let { props = {
		id: 0,
		type: "success",
		canClose: true,
		timeout: 5000,
		message: "This is a toast :)"
	} } = $props();
</script>

<div class={props.type} transition:fly|global={{ x: 50, duration: 500 }}>
<p>{props.message}</p>
{#if props.canClose}<button class="close" onclick={() => dismiss(props.id)}>X</button>{/if}
</div>

<style>
	div {
		color: #eee;
		border-radius: .5rem;
		text-align: left;
		margin: auto;
		margin-top: 10px;
		width: 18rem;
		padding: .5rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}

	.close {
		font-weight: bold;
		color: white;
		padding: .5rem .7rem;
	}

	div > p {
		margin: 0;
	}

	.success {
		background-color: #55aa55;
	}

	.error {
		background-color: #aa5555;
	}
</style>