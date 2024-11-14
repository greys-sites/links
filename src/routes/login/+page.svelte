<script>
  import { add } from '$lib/stores/toasts';
  import { enhance } from '$app/forms';

  import {
  	Input,
  	Label,
  	Button
  } from 'flowbite-svelte';
 
  /** @type {{form: any}} */
  let { form } = $props();

  $effect(() => {
    if(form) {
      switch(form.success) {
        case false:
          add({
            type: 'error',
            message: `${form.status}: ${form.message}`,
            timeout: 5000,
            canClose: true
          })
          break;
        default:
          break;
      }
    }
  });
</script>

<svelte:head>
  <title>Login | gsdn.link</title>
</svelte:head>

<div class="container">
	<form method="POST" action="?/login" use:enhance>
		<Label for="token">Token</Label>
		<Input type="text" placeholder="token" name="token" id="token" />
		<Button type="submit">Submit</Button>
	</form>
</div>