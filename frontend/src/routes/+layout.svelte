<script>
	import { toasts } from '$lib/stores/toasts';
	import Toast from '$lib/components/toast.svelte';
</script>

<nav><a href="/">home</a><p>|</p><a href="/links">links</a></nav>

<div class="toasts">
	{#each $toasts as t (t.id)}
		<Toast
			props={t}
		/>
	{/each}
</div>

<slot />

<style>
	nav {
		background-color: #111;
		height: 5vh;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		padding-left: 10px;
		margin: 0;
		position: sticky;
		top: 0;
		left: 0;
	}

	nav > * {
		margin-right: 5px;
	}

	.toasts {
		position: fixed;
		top: 0;
		right: 0;
		width: 20rem;
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		justify-content: center;
	}
</style>