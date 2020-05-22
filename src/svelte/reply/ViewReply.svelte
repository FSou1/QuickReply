<style>
.content { white-space: pre-line; }
</style>

<script>
  export let item;
</script>

<div>
  <h3>{ item.displayName }</h3>
  <p class="content">{@html item.content }</p>
</div>