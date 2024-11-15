<script>
 	import { add } from '$lib/stores/toasts';
	import { enhance } from '$app/forms';
	import Toast from '$lib/components/toast.svelte';

	import {
		Label,
		Input,
		Textarea,
		Button,
		Modal,
		Toggle,
		Helper,
		SpeedDial
	} from 'flowbite-svelte';

	import Edit from '~icons/ic/round-edit';
	import Delete from '~icons/ic/round-delete';

	/** @type {{form: any, data: any}} */
	let { form, data } = $props();

	let open = $state(false);

	let edit = $state(false);
	let editing = $state( null);

	$effect(() => {
	    if(form) {
		    switch(form.success) {
		      case true:
		        add({
		          type: 'success',
		          message: `Link ${form.action.endsWith('e') ? form.action : form.action + "e"}d!`,
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

	let toggle = () => {
		open = true;
	}

	let setEdit = (e, itm) => {
		editing = itm;
		edit = true;
	}
</script>

{#snippet Link(link)}
	<div class="link">
		<div class="inner">
			<a href="/{link.hid}" target="_blank">{link.hid}</a>
			<a href={link.url} target="_blank">{link.name}</a>
			<form method="POST" action="?/del" use:enhance>
				<input type="text" value={link.hid} name="hid" hidden />
				<Button type="submit" size="xs">
					<Delete />
				</Button>
				<Button onclick={(e) => setEdit(e, link)} size="xs">
					<Edit />
				</Button>
			</form>
		</div>
		<div class="desc">
			<Helper>{link.description ?? "No description."}</Helper>
			<Helper>This link is { link.visible ? "public" : "private" }.</Helper>
		</div>
	</div>
{/snippet}

<svelte:head>
  <title>Dash | gsdn.link</title>
</svelte:head>

<SpeedDial onclick={toggle}>
</SpeedDial>

<Modal bind:open outsideclick>
	<form method="POST" action="?/create" use:enhance>
		<Label for="name">Name</Label>
		<Input class="mb-4" type="text"
			placeholder="name" name="name"
			id="name"
		/>

		<Label for="url">URL</Label>
		<Input class="mb-4" type="text"
			placeholder="url" name="url"
			id="url"
		/>

		<Label for="hid">Custom ID</Label>
		<Input class="mb-4" type="text"
			placeholder="custom ID" name="hid"
			id="hid"
		/>

		<Label for="description">Description</Label>
		<Textarea class="mb-4" placeholder="description" 
			name="description" id="description"
		/>

		<Toggle value="public" name="visible">Public?</Toggle>
		<Helper class="mb-4">Whether the link will be visible on the public links page</Helper>

		<Button type="submit">Submit</Button>
	</form>
</Modal>

<Modal bind:open={edit} outsideclick>
	<form method="POST" action="?/edit" use:enhance>
		<input type="hidden" name="oldhid" value={editing.hid} />
		<Label for="name">Name</Label>
		<Input class="mb-4" type="text"
			placeholder="name" name="name"
			id="name"
			value={editing.name}
		/>

		<Label for="url">URL</Label>
		<Input class="mb-4" type="text"
			placeholder="url" name="url"
			id="url"
			value={editing.url}
		/>

		<Label for="hid">Custom ID</Label>
		<Input class="mb-4" type="text"
			placeholder="custom ID" name="hid"
			id="hid"
			value={editing.hid}
		/>

		<Label for="description">Description</Label>
		<Textarea class="mb-4" placeholder="description" 
			name="description" id="description"
			value={editing.description}
		/>

		<Toggle value="public" name="visible"
			checked={editing.visible}
		>Public?</Toggle>
		<Helper class="mb-4">Whether the link will be visible on the public links page</Helper>

		<Button type="submit">Submit</Button>
	</form>
</Modal>

{#if data?.links?.length}
	<div class="container">
	  {#each data.links as link}
	  	{@render Link(
	  		link
	  	)}
	  {/each}
	</div>
{:else}
	<p class="text-center mt-4">Nothing here yet.</p>
{/if}