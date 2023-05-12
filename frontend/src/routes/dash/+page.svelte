<script>
export let form;
export let data;
</script>

<div class="container">
  <ul>
  {#each data as {d}}
    <li><a href="{d.url}">{d.name}</a></li>
  {/each}
   </ul>
</div>