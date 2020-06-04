<style>
	:global(body) {
		margin: 0;
		font-size: 16px;
		font-style: normal;
		font-family: "Lato", Arial, sans-serif;
		line-height: 25px;
	}

	.container {
		max-width: 960px;
		margin: auto;
	}

	.col {
		margin: 10px;
		padding: 10px;
	}
</style>

<script>
	import { onMount } from 'svelte';
	import { store } from './reply/store.js';
	import { service } from './reply/service.js';
	import CreateReply from './reply/CreateReply.svelte';
	import ListReply from './reply/ListReply.svelte';
	import ListVariable from './variables/ListVariable.svelte';

	onMount(() => {
		service.getAll().then((data) => {
			store.init(data);
		});
	});
</script>

<svelte:head>
	<title>QuickReply Options</title>>
</svelte:head>

<main class="container">
  <section class="col">
    <h1>General</h1>
    
    <h2>Replies</h2>
		<ListReply />

		<h2>Create reply</h2>
		<CreateReply />

		<h2>Template variables</h2>
		<ListVariable />
  </section>
</main>