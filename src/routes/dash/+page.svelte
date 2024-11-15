<script>
 	import { run } from 'svelte/legacy';

	import { add } from '$lib/stores/toasts';
	import { enhance } from '$app/forms';
	import Toast from '$lib/components/toast.svelte';

	import {
		Input,
		Textarea,
		Button,
		Modal,
	} from 'flowbite-svelte';

	/** @type {{form: any, data: any}} */
	let { form, data } = $props();

	run(() => {
	   console.log(form);
	});
	
	run(() => {
	    if(form) {
		    switch(form.success) {
		      case true:
		        add({
		          type: 'success',
		          message: `Link ${form.action}d!`,
		          timeout: 5000,
		          canClose: true
		        })
		        break;
		      case false:
		        add({
		          type: 'error',
		          message: `Error: ${form.message}`,
		          timeout: 5000,
		          canClose: true
		        })
		        break;
		    }
		}
	});

</script>

{#snippet Link(hid, name, url)}
	<div class="link">
  	<a href="/{hid}" target="_blank">{hid}</a>
    <a href="{url}" target="_blank">{name}</a>
  	<form method="POST" action="?/del" use:enhance>
    	<input type="text" value="{hid}" name="hid" hidden />
    	<Button type="submit">Delete</Button>
  	</form>
  </div>
{/snippet}

<svelte:head>
  <title>Dash | gsdn.link</title>
</svelte:head>

<div class="container">
  <form method="POST" action="?/create" use:enhance>
    <Input type="text" placeholder="name" name="name" />
    <Input type="text" placeholder="url" name="url" />
    <Input type="text" placeholder="custom ID" name="hid" />
    <Button type="submit">Submit</Button>
  </form>
  {#each data.links as link}
  	{@render Link(link.hid, link.name, link.url)}
  {/each}
</div>

<style>
  .link {
  	@apply bg-slate-400;
  	@apply dark:bg-slate-700;
  	@apply mx-auto;
  	@apply mt-4;
  	@apply w-full;
  	@apply flex;
  	@apply flex-row;
  	@apply items-center;
  	@apply justify-between;
  	@apply p-4;
  	@apply rounded;
  }

  .link form {
    width: unset;
  }
</style>