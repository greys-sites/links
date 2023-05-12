<script>
import { goto } from '$app/navigation';
export let form;

let err = null;
if(form?.error) {
	err = form.error;
	setTimeout(() => err = null, 10000);
}
</script>

<style>
.error {
	color: red;
	background-color: #111;
}
</style>

<div class="container">
{#if err}
	<p class="error">{err}</p>
{/if}
<form method="POST">
	<input type="text" placeholder="token" name="token" />
	<input type="submit" value="submit" />
</form>
</div>