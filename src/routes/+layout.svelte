<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initAuth } from '$lib/stores/auth';

	onMount(() => {
		const unsubscribe = initAuth();
		return unsubscribe;
	});
</script>

<main class="min-h-screen bg-gray-100">
	<slot />
</main>
