<script>
	import { toasts } from '$lib/stores/toasts';
	import Toast from '$lib/components/toast.svelte';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<nav>
	<a href="/">home</a>
	<p>|</p>
	<a href="/links">links</a>
	<p>|</p>
	<a href="/dash">dash</a>
</nav>

<div class="toasts">
	{#each $toasts as t (t.id)}
		<Toast
			props={t}
		/>
	{/each}
</div>

{@render children?.()}

<style>
	nav {
		background-color: rgba(255, 255, 255, .07);
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		padding-left: .5rem;
		margin: 0;
		position: sticky;
		top: 0;
		left: 0;
	}

	nav > * {
		margin-right: .5rem;
	}

	.toasts {
		position: fixed;
		top: 0;
		right: 0;
		width: 18rem;
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		justify-content: center;
	}
</style>