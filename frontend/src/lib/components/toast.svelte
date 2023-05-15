<script>
import { dismiss } from '$lib/stores/toasts';
import { fly } from 'svelte/transition';

export let props = {
	id: 0,
	type: "success",
	canClose: true,
	timeout: 5000,
	message: "This is a toast :)"
}
</script>

<div class={props.type} transition:fly={{ x: 20, duration: 500 }}>
<p>{props.message}</p>
{#if props.canClose}<btn class="close" on:click={() => dismiss(props.id)}>X</btn>{/if}
</div>

<style>
	div {
		color: #eee;
		border-radius: 10px;
		text-align: center;
		margin: auto;
		margin-top: 10px;
		width: 15rem;
		height: 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.close {
		position: absolute;
		font-weight: bold;
		top: 0;
		right: 0;
		color: white;
		padding: .5rem .7rem;
	}

	div > p {
		margin: auto;
	}

	.success {
		background-color: #55aa55;
	}

	.error {
		background-color: #aa5555;
	}
</style>