<script>
	import "../app.css";

	import {
		DarkMode
	} from 'flowbite-svelte';

	import { toasts } from '$lib/stores/toasts';
	import Toast from '$lib/components/toast.svelte';

	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
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
	<p>|</p>
	<a href="/dash">dash</a>
	<div class="ml-auto">
		<DarkMode />
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
		@apply bg-slate-300;
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
