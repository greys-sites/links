<script>
import { add } from '$lib/stores/toasts';
import { enhance } from '$app/forms';
import Toast from '$lib/components/toast.svelte';

export let form;
export let data;

$: console.log(form);
$: if(form) {
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
        message: `${form.status}: ${form.message}`,
        timeout: 5000,
        canClose: true
      })
      break;
  }
}

</script>

<div class="container">
  <form method="POST" action="?/create" use:enhance>
    <input type="text" placeholder="name" name="name" />
    <input type="text" placeholder="url" name="url" />
    <input type="text" placeholder="custom ID" name="hid" />
    <input type="submit" value="submit" />
  </form>
  {#each data.links as d}
  	<div class="link">
    	<a href="/{d.hid}">{d.hid}</a>
      <a href="{d.url}">{d.name}</a>
    	<form method="POST" action="?/del" use:enhance>
	    	<input type="text" value="{d.hid}" name="hid" hidden />
	    	<input type="submit" value="delete" />
    	</form>
    </div>
  {/each}
</div>

<style>
  .link {
    height: 2.5rem;
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #aaa;
    border-radius: .5rem;
    color: black;
    margin: .7rem;
    padding: .5rem;
  }

  .link p {
    color: var(--accent);
    font-weight: bold;
  }

  .link form {
    width: unset;
  }
</style>