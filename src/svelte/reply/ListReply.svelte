<script>
  import { service } from './service.js';
  import { store } from './store.js';
  import ViewReply from './ViewReply.svelte';

  function handleDelete(row) {
    return service.remove(row).then((item) => {
      store.delete(item);
    });
  }
</script>

{#each $store as item}
  <section class="item">
    <ViewReply item={item} />

    <button on:click={() => handleDelete(item)}>X</button>
  </section>
{:else}
  <p>No quick replies yet. Add first!</p>
{/each}