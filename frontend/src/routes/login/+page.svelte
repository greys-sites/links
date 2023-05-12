<script>
export let form;

let $err;
if(form?.error) {
	$err = form.error;
	setTimeout(() => $err = null, 10000);
}
</script>

<style>
.error {
	color: red;
	background-color: #111;
}
</style>

<div class="container">
{#if $err}
	<p class="error">{$err}</p>
{/if}
<form>
	<input type="text" placeholder="token" />
	<input type="submit">log in</input>
</form>
</div>