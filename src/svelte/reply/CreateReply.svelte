<style>
	#displayname, #content { width: 100%; }
	#content { height: 150px; }
</style>

<script>
	import { service } from './service.js';
	import { store } from './store.js';

	const form = {
		displayName: null,
		content: null
	};

	$: if(!form.displayName && form.content) {
		form.displayName = form.content.slice(0, 25);
	}

	function handleCreate() {
		return service.add({ ...form }).then(item => {
			store.add(item);
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
	<label for="content">Content: <abbr title="required">*</abbr></label>
	<textarea 
		id="content" 
		name="content"
		required
		bind:value={form.content}></textarea>
</div>

<div>
	<label for="displayname">Display name:</label>
	<input 
		id="displayname" 
		type="text" 
		name="displayname"
		maxlength="25"
		bind:value={form.displayName}>
</div>

<div>
	<button on:click={handleCreate}>Create</button>
	<button on:click={handleCancel}>Cancel</button>
</div>