<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { user } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let loading = false;
	let email = '';
	let password = '';
	let confirmPassword = '';
	let activeTab = 'signin'; // 'signin' or 'signup'

	$: if ($user) {
		goto('/form');
	}

	async function signInWithEmailPassword() {
		loading = true;
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: email,
				password: password
			});
			if (error) throw error;
		} catch (error) {
			alert('Error signing in: ' + error.message);
		} finally {
			loading = false;
		}
	}

	async function signUpWithEmailPassword() {
		loading = true;
		try {
			const { error } = await supabase.auth.signUp({
				email: email,
				password: password
			});
			if (error) throw error;
			alert('Check your email for a confirmation link.');
		} catch (error) {
			alert('Error signing up: ' + error.message);
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>CDCR Background Security Clearance</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center px-4">
	<div class="w-full max-w-md space-y-8">
		<div class="text-center">
			<h1 class="mb-2 text-4xl font-bold text-gray-900">CDCR Security Clearance</h1>
			<p class="text-lg text-gray-600">Background Security Clearance Application</p>
			<p class="mt-4 text-sm text-gray-500">
				California Department of Corrections and Rehabilitation
			</p>
		</div>
		<div class="shadow-default rounded-lg bg-white p-8">
			<div class="mb-6 text-center">
				<h2 class="mb-2 text-2xl font-semibold text-gray-800">
					{activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
				</h2>
				<p class="text-gray-600">
					{activeTab === 'signin'
						? 'Sign in with your email and password to begin your application'
						: 'Create an account to get started'}
				</p>
			</div>

			<div class="mb-6 flex justify-center">
				<button
					type="button"
					class={`rounded-tl-lg rounded-tr-lg px-4 py-2 text-sm font-medium
                        ${activeTab === 'signin' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
					on:click={() => (activeTab = 'signin')}
				>
					Sign In
				</button>
				<button
					type="button"
					class={`rounded-tl-lg rounded-tr-lg px-4 py-2 text-sm font-medium
                        ${activeTab === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
					on:click={() => (activeTab = 'signup')}
				>
					Sign Up
				</button>
			</div>

			{#if activeTab === 'signin'}
				<form on:submit|preventDefault={signInWithEmailPassword}>
					<div class="mb-4">
						<label for="email" class="mb-1 block text-sm font-medium text-gray-700"> Email </label>
						<input
							type="email"
							id="email"
							bind:value={email}
							placeholder="you@example.com"
							class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div class="mb-6">
						<label for="password" class="mb-1 block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							id="password"
							bind:value={password}
							placeholder="••••••••"
							class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						class="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-70"
					>
						{#if loading}
							<div
								class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
							></div>
						{:else}
							Sign in
						{/if}
					</button>
				</form>
			{:else}
				<form on:submit|preventDefault={signUpWithEmailPassword}>
					<div class="mb-4">
						<label for="email" class="mb-1 block text-sm font-medium text-gray-700"> Email </label>
						<input
							type="email"
							id="email"
							bind:value={email}
							placeholder="you@example.com"
							class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div class="mb-4">
						<label for="password" class="mb-1 block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							id="password"
							bind:value={password}
							placeholder="••••••••"
							class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div class="mb-6">
						<label for="confirmPassword" class="mb-1 block text-sm font-medium text-gray-700">
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							bind:value={confirmPassword}
							placeholder="••••••••"
							class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						class="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-70"
					>
						{#if loading}
							<div
								class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
							></div>
						{:else}
							Create Account
						{/if}
					</button>
				</form>
			{/if}

			<div class="mt-6 text-center text-sm text-gray-600">
				{activeTab === 'signin' ? 'Don’t have an account? ' : 'Already have an account? '}
				<button
					type="button"
					class="font-medium text-blue-600 hover:text-blue-500"
					on:click={() => (activeTab = activeTab === 'signin' ? 'signup' : 'signin')}
				>
					{activeTab === 'signin' ? 'Sign Up' : 'Sign In'}
				</button>
			</div>
		</div>
	</div>
</div>
