<script>
	import { enhance } from '$app/forms';

	import {
		Button,
		Helper
	} from 'flowbite-svelte';

	import Edit from '~icons/ic/round-edit';
	import Delete from '~icons/ic/round-delete';
	import Check from '~icons/ic/baseline-check-circle';
	import Cancel from '~icons/ic/baseline-cancel';

	let { link, setEdit } = $props();

	let deleting = $state(false);
	let toggle = () => deleting = !deleting;
	
</script>

<div class="link">
	<div class="inner">
		<a href="/{link.hid}" target="_blank">{link.hid}</a>
		<a href={link.url} target="_blank">{link.name}</a>
		{#if deleting}
			<form class="btns" method="POST" action="?/del" use:enhance>
				<input type="text" value={link.hid} name="hid" hidden />
				<Button onclick={toggle} size="xs">
					<Cancel />
				</Button>
				<Button type="submit" size="xs">
					<Check />
				</Button>
			</form>
		{:else}
			<div class="btns">
				<Button onclick={toggle} size="xs">
					<Delete />
				</Button>
				<Button onclick={() => setEdit(link)} size="xs">
					<Edit />
				</Button>
			</div>
		{/if}
	</div>
	<div class="desc">
		<Helper>{link.description ?? "No description."}</Helper>
		<Helper>
			This link is { link.visible ? "public" : "private" } |{" "}
			Clicked <a href="/stats/{link.hid}">{link.stats.count ?? 0} times</a>.
		</Helper>
	</div>
</div>