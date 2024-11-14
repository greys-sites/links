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
  {#each data.links as d}
  	<div class="link">
    	<a href="/{d.hid}" target="_blank">{d.hid}</a>
      <a href="{d.url}" target="_blank">{d.name}</a>
    	<form method="POST" action="?/del" use:enhance>
	    	<input type="text" value="{d.hid}" name="hid" hidden />
	    	<input type="submit" value="delete" />
    	</form>
    </div>
  {/each}
</div>

<style>
  .link {
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, .09);
    border-radius: .5rem;
    color: black;
    margin: .7rem;
    padding: .5rem;
  }

  .link p {
    color: var(--accent);
    font-weight: bold;
    margin: 0;
  }

  .link form {
    width: unset;
  }

  .link button {
  	margin: 0;
  }
</style>