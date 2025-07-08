<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabase';
	import { writable } from 'svelte/store';

	export let data;

	export const user = writable(null);

	onMount(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			user.set(session?.user ?? null);

			if (event === 'SIGNED_IN') {
				goto('/form');
			} else if (event === 'SIGNED_OUT') {
				goto('/');
			}
		});

		return () => authListener.subscription.unsubscribe();
	});
</script>

<main class="min-h-screen bg-gray-100">
	<slot />
</main>
