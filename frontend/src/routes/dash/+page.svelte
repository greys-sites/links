<script>
import { fly } from 'svelte/transition';
import { enhance } from '$app/forms';

import { addToast } from '$lib/stores/toasts';
import Toast from '$lib/components/toast';

export let form;
export let data;

let err;
if(form?.success === false) {
	err = form.data;
	setTimeout(() => err = null, 5000);
}
</script>

<style>

.error {
	color: #aa5555;
	background-color: #111;
	border-radius: 5px;
	width: 500px;
	margin: 5px;
	padding: 5px;
	position: absolute;
	top: 0;
	left: 0;
	height: 50px;
	z-index: 5;
}
</style>

<div class="container">
	<div class="toasts">
		{#each $toasts as t (t.id)}
			<Toast
				props={t}
			/>
		{/each}
	</div>
  <form method="POST" action="?/create" use:enhance>
    <input type="text" placeholder="name" name="name" />
    <input type="text" placeholder="url" name="url" />
    <input type="text" placeholder="custom ID" name="hid" />
    <input type="submit" value="submit" />
  </form>
  {#each data.links as d}
  	<div class="link">
    	<a href="{d.url}">{d.name}</a>
    	<form method="POST" action="?/del" >
	    	<input type="text" value="{d.hid}" name="hid" hidden />
	    	<input type="submit" value="delete" />
    	</form>
    </div>
  {/each}
</div>