<script>
import { dismiss } from '$lib/stores/toasts';
import { fly } from 'svelte/transition';

export let props = {
	id: 0,
	type: "success",
	canClose: true,
	timeout: 5000,
	message: "This is a toast :)"
}
</script>

<div class={props.type}>
{props.message}
</div>

<style>
div {
	color: #eee;
	border-radius: 10px;
	text-align: center;
	margin: auto;
	margin-top: 10px;
	width: 500px;
}

.success {
	background-color: #55aa55;
}

.error {
	background-color: #aa5555;
}
</style>