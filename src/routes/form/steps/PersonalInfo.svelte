<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let formData;

	const dispatch = createEventDispatcher();

	function handleNext() {
		if (formData.lastName && formData.firstName && formData.dateOfBirth && formData.gender) {
			dispatch('next');
		} else {
			alert('Please fill in all required fields');
		}
	}
</script>

<div>
	<h2 class="mb-6 text-2xl font-bold text-gray-900">Personal Information</h2>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<div>
			<label for="lastName" class="mb-2 block text-sm font-medium text-gray-700">
				Last Name *
			</label>
			<input
				id="lastName"
				type="text"
				bind:value={formData.lastName}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
				required
			/>
		</div>

		<div>
			<label for="firstName" class="mb-2 block text-sm font-medium text-gray-700">
				First Name *
			</label>
			<input
				id="firstName"
				type="text"
				bind:value={formData.firstName}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
				required
			/>
		</div>

		<div>
			<label for="middleInitial" class="mb-2 block text-sm font-medium text-gray-700">
				Middle Initial
			</label>
			<input
				id="middleInitial"
				type="text"
				maxlength="1"
				bind:value={formData.middleInitial}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
			/>
		</div>

		<div>
			<label for="dateOfBirth" class="mb-2 block text-sm font-medium text-gray-700">
				Date of Birth *
			</label>
			<input
				id="dateOfBirth"
				type="date"
				bind:value={formData.dateOfBirth}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
				required
			/>
		</div>

		<div class="md:col-span-2">
			<label for="otherNames" class="mb-2 block text-sm font-medium text-gray-700">
				Other names you have been known by
			</label>
			<input
				id="otherNames"
				type="text"
				bind:value={formData.otherNames}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
			/>
		</div>

		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700">Gender *</label>
			<div class="flex space-x-4">
				<label class="flex items-center">
					<input type="radio" bind:group={formData.gender} value="Male" class="mr-2" />
					Male
				</label>
				<label class="flex items-center">
					<input type="radio" bind:group={formData.gender} value="Female" class="mr-2" />
					Female
				</label>
				<label class="flex items-center">
					<input type="radio" bind:group={formData.gender} value="Non-Binary" class="mr-2" />
					Non-Binary
				</label>
			</div>
		</div>

		<div>
			<label for="ssn" class="mb-2 block text-sm font-medium text-gray-700">
				Social Security Number (Optional)
			</label>
			<input
				id="ssn"
				type="text"
				bind:value={formData.ssn}
				placeholder="XXX-XX-XXXX"
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
			/>
			<p class="mt-1 text-xs text-gray-500">
				Providing SSN is optional per Privacy Act of 1974. Omission may cause denial of access.
			</p>
		</div>
	</div>

	<div class="mt-8 flex justify-end">
		<button
			on:click={handleNext}
			class="rounded-lg bg-gray-800 px-6 py-3 text-white transition-colors duration-200 hover:bg-gray-900 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
		>
			Next Step
		</button>
	</div>
</div>
