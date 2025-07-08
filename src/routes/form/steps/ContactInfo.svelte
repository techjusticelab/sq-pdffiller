<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let formData;

	const dispatch = createEventDispatcher();

	function handleNext() {
		if (
			formData.phoneNumber &&
			(formData.stateId || formData.driverLicense || formData.passportNumber)
		) {
			dispatch('next');
		} else {
			alert('Please provide phone number and at least one form of ID');
		}
	}
</script>

<div>
	<h2 class="mb-6 text-2xl font-bold text-gray-900">Contact Information</h2>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<div>
			<label for="phoneNumber" class="mb-2 block text-sm font-medium text-gray-700">
				Contact Telephone Number *
			</label>
			<input
				id="phoneNumber"
				type="tel"
				bind:value={formData.phoneNumber}
				placeholder="(XXX) XXX-XXXX"
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
				required
			/>
		</div>

		<div>
			<label for="state" class="mb-2 block text-sm font-medium text-gray-700"> State </label>
			<select
				id="state"
				bind:value={formData.state}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
			>
				<option value="">Select State</option>
				<option value="CA">California</option>
				<option value="AL">Alabama</option>
				<option value="AK">Alaska</option>
				<!-- Add more states as needed -->
			</select>
		</div>

		<div>
			<label for="stateId" class="mb-2 block text-sm font-medium text-gray-700">
				State ID Number
			</label>
			<input
				id="stateId"
				type="text"
				bind:value={formData.stateId}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
			/>
		</div>

		<div>
			<label for="driverLicense" class="mb-2 block text-sm font-medium text-gray-700">
				Driver's License Number
			</label>
			<input
				id="driverLicense"
				type="text"
				bind:value={formData.driverLicense}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
			/>
		</div>

		<div>
			<label for="passportNumber" class="mb-2 block text-sm font-medium text-gray-700">
				Passport Number (if no State ID/Driver's License)
			</label>
			<input
				id="passportNumber"
				type="text"
				bind:value={formData.passportNumber}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
			/>
		</div>

		<div>
			<label for="stateBarNumber" class="mb-2 block text-sm font-medium text-gray-700">
				State Bar Number (if applicable)
			</label>
			<input
				id="stateBarNumber"
				type="text"
				bind:value={formData.stateBarNumber}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
			/>
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
			Next Step
		</button>
	</div>
</div>
