<style>
	#displayname, #content { width: 100%; }
	#content { height: 150px; }
</style>

<script>
	import { service } from './service.js';
	import { store } from './store.js';
	import { exchange } from './exchange.js';
	import { config } from '../../js/config.js';

	const form = {
		displayName: null,
		content: null
	};

	$: if(!form.displayName && form.content) {
		form.displayName = form.content.slice(0, config.display_name_length);
	}

	function handleCreate() {
		return service.add({ ...form }).then(item => {
			store.add(item);
			exchange.contextMenu.update();
			resetForm();
		});
	}

	function handleCancel() {
		resetForm();
	}

	function resetForm() {
		form.displayName = null;
		form.content = null;
	}
</script>

<div>
	<label for="displayname">Display name:</label>
	<input 
		id="displayname" 
		type="text" 
		name="displayname"
		maxlength="{config.display_name_length}"
		bind:value={form.displayName}>
</div>

<div>
	<label for="content">Content: <abbr title="required">*</abbr></label>
	<textarea 
		id="content" 
		name="content"
		required
		bind:value={form.content}></textarea>
</div>

<div>
	<button on:click={handleCreate}>Create</button>
	<button on:click={handleCancel}>Cancel</button>
</div>