<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import { user } from '$lib/stores/auth';

	// Redirect if not authenticated
	$: if ($user === null) {
		goto('/');
	}

	async function signOut() {
		await supabase.auth.signOut();
		goto('/');
	}
</script>

<svelte:head>
	<title>Application Submitted - CDCR</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-100 px-4">
	<div class="w-full max-w-md">
		<div class="shadow-default rounded-lg bg-white p-8 text-center">
			<div
				class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
			>
				<svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
					></path>
				</svg>
			</div>

			<h1 class="mb-2 text-2xl font-bold text-gray-900">Application Submitted!</h1>
			<p class="mb-6 text-gray-600">
				Your CDCR Background Security Clearance application has been submitted successfully. A
				confirmation email has been sent to your registered email address.
			</p>

			<div class="space-y-3">
				<button
					on:click={() => goto('/form')}
					class="w-full rounded-lg bg-gray-800 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-900 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
				>
					Submit Another Application
				</button>

				<button
					on:click={signOut}
					class="w-full rounded-lg bg-gray-300 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
				>
					Sign Out
				</button>
			</div>
		</div>
	</div>
</div>
