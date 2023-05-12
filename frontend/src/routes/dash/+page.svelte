<script>
export let form;
export let data;
</script>

<div class="container">
  <form method="POST" action="?/create">
    <input type="text" placeholder="name" name="name" />
    <input type="text" placeholder="url" name="url" />
    <input type="text" placeholder="custom ID" name="hid" />
    <input type="submit" value="submit" />
  </form>
  <ul>
  {#each data as d}
    <li><a href="{d.url}">{d.name}</a></li>
  {/each}
   </ul>
</div>