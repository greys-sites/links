<script>
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

  let { data } = $props();
</script>

<svelte:head>
  <title>Links | gsdn.link</title>
</svelte:head>

{#snippet Link(link)}
  <div class="link">
    <div class="inner">
      <a href="/{link.hid}" target="_blank">{link.name}</a>
    </div>
    {#if link.description}
      <div class="desc">
        <Helper>{link.description}</Helper>
      </div>
    {/if}
  </div>
{/snippet}

<div class="container">
  <h1>Important Links</h1>
  {#if data?.links?.length}
    {#each data.links as link}
      {@render Link(link)}
    {/each}
  {:else}
    <p>No links are here yet.</p>
  {/if}
</div>