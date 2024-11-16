<script>
	import "../app.css";

	import {
		settings,
		update
	} from '$lib/stores/settings';

	import { toasts } from '$lib/stores/toasts';
	import Toast from '$lib/components/toast.svelte';

	import {
		Button
	} from 'flowbite-svelte';

	import Dark from '~icons/ic/round-dark-mode';
	import Light from '~icons/ic/round-light-mode';
	import Auto from '~icons/ic/round-auto-mode';

	let { children, data } = $props();

	let theme = $derived($settings.get('theme'));
</script>

<svelte:head>
  <script>
    var prefer = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if ('settings' in localStorage) {
      var st = JSON.parse(localStorage.getItem('settings'));
      if(st.theme == 'dark' || (st.theme == 'system' && prefer)) window.document.documentElement.classList.add('dark');
      else if(st.theme == 'light') window.document.documentElement.classList.remove('dark');
    } else if(prefer) {
      window.document.documentElement.classList.add('dark');  
    }
  </script>
</svelte:head>

<nav>
	<a href="/">home</a>
	<p>|</p>
	<a href="/links">links</a>
	{#if data.verified}
		<p>|</p>
		<a href="/dash">dash</a>
		<p>|</p>
		<a href="/stats">stats</a>
	{/if}
	<div class="ml-auto">
		{#if theme == 'dark'}
			<Button
				color="alternative"
				size="sm"
				class="border-0"
				onclick={() => update('theme', 'light')}
			>
				<Light />
			</Button>
		{:else}
			<Button
				color="alternative"
				size="sm"
				class="border-0"
				onclick={() => update('theme', 'dark')}
			>
				<Dark />
			</Button>
		{/if}
	</div>
</nav>

<div class="toasts">
	{#each $toasts as t (t.id)}
		<Toast props={t}></Toast>
	{/each}
</div>

{@render children?.()}

<style lang="postcss">
	nav {
		@apply bg-slate-200;
		@apply dark:bg-slate-800;
		@apply text-black;
		@apply dark:text-white;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		padding: .5rem;
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
