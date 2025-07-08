<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let formData;

	const dispatch = createEventDispatcher();

	function handleNext() {
		if (formData.authorizationType) {
			dispatch('next');
		} else {
			alert('Please select an authorization type');
		}
	}
</script>

<div>
	<h2 class="mb-6 text-2xl font-bold text-gray-900">Type of Authorization Requested</h2>

	<div class="space-y-4">
		<div class="rounded-lg bg-gray-50 p-4">
			<p class="mb-4 text-sm font-medium text-gray-700">
				Please select the type of authorization you are requesting:
			</p>

			<div class="space-y-3">
				<label
					class="flex cursor-pointer items-center rounded-lg border border-gray-300 p-3 hover:bg-gray-50"
				>
					<input
						type="radio"
						bind:group={formData.authorizationType}
						value="Gate Clearance"
						class="mr-3"
					/>
					<div>
						<p class="font-medium text-gray-800">Gate Clearance</p>
						<p class="text-sm text-gray-600">Standard access clearance for prison facilities</p>
					</div>
				</label>

				<label
					class="flex cursor-pointer items-center rounded-lg border border-gray-300 p-3 hover:bg-gray-50"
				>
					<input
						type="radio"
						bind:group={formData.authorizationType}
						value="State ID Card (Contractor)"
						class="mr-3"
					/>
					<div>
						<p class="font-medium text-gray-800">State ID Card (Contractor)</p>
						<p class="text-sm text-gray-600">Contractor identification card for ongoing access</p>
					</div>
				</label>
			</div>
		</div>

		<div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
			<div class="flex items-start">
				<svg class="mt-0.5 mr-3 h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					></path>
				</svg>
				<div>
					<h4 class="mb-1 text-sm font-medium text-blue-800">Important Notice</h4>
					<p class="text-xs text-blue-700">
						Prior written consent from the supervising agency is required for any parolee,
						probationer, or formerly incarcerated person to enter prison grounds. If approved,
						access is restricted to designated areas and shall be under state employee escort unless
						otherwise authorized.
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-8 flex justify-between">
		<button
			on:click={() => dispatch('prev')}
			class="rounded-lg bg-gray-300 px-6 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
		>
			Previous
		</button>
		<button
			on:click={handleNext}
			class="rounded-lg bg-gray-800 px-6 py-3 text-white transition-colors duration-200 hover:bg-gray-900 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
		>
			Review Application
		</button>
	</div>
</div>
