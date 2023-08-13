<script>
import { add } from '$lib/stores/toasts';
import { enhance } from '$app/forms';
export let form;

$: console.log(form);
$: if(form) {
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
</script>

<svelte:head>
  <title>Login | gsdn.link</title>
</svelte:head>

<div class="container">
<form method="POST" action="?/login" use:enhance>
	<input type="text" placeholder="token" name="token" />
	<input type="submit" value="submit" />
</form>
</div>