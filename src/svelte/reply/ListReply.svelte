<script>
  import { service } from './service.js';
  import { store } from './store.js';
  import { exchange } from './exchange.js';
  import ViewReply from './ViewReply.svelte';

  let items = [];
  store.subscribe((data) => {
    items = data;
  });

  function handleDelete(row) {
    return service.remove(row).then((item) => {
      store.delete(item);
      exchange.contextMenu.update();
    });
  }
</script>

{#each items as item}
  <section class="item">
    <ViewReply item={item} />

    <button on:click={() => handleDelete(item)}>X</button>
  </section>
{:else}
  <p>No quick replies yet. Add first!</p>
{/each}