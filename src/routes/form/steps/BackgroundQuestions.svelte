<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let formData;

	const dispatch = createEventDispatcher();

	function handleNext() {
		dispatch('next');
	}
</script>

<div>
	<h2 class="mb-6 text-2xl font-bold text-gray-900">Background Questions</h2>

	<div class="space-y-6">
		<div class="rounded-lg bg-gray-50 p-4">
			<p class="mb-3 text-sm font-medium text-gray-700">
				Have you ever visited or had a personal relationship with any California Department of
				Corrections and Rehabilitation inmate or parolee for non-work related reasons?
			</p>
			<div class="flex space-x-4">
				<label class="flex items-center">
					<input type="radio" bind:group={formData.visitedInmate} value={false} class="mr-2" />
					No
				</label>
				<label class="flex items-center">
					<input type="radio" bind:group={formData.visitedInmate} value={true} class="mr-2" />
					Yes
				</label>
			</div>
			{#if formData.visitedInmate}
				<p class="mt-2 text-xs text-gray-600">
					If yes, please complete the CDCR Form 2189 Incarcerated/Paroled Relative/Associate
					Notification.
				</p>
			{/if}
		</div>

		<div class="rounded-lg bg-gray-50 p-4">
			<p class="mb-3 text-sm font-medium text-gray-700">
				Are you a former California State Prison inmate?
			</p>
			<div class="flex space-x-4">
				<label class="flex items-center">
					<input type="radio" bind:group={formData.formerInmate} value={false} class="mr-2" />
					No
				</label>
				<label class="flex items-center">
					<input type="radio" bind:group={formData.formerInmate} value={true} class="mr-2" />
					Yes
				</label>
			</div>
		</div>

		<div class="rounded-lg bg-gray-50 p-4">
			<p class="mb-3 text-sm font-medium text-gray-700">
				Have you ever been restricted or denied access to a State Prison?
			</p>
			<div class="flex space-x-4">
				<label class="flex items-center">
					<input type="radio" bind:group={formData.restrictedAccess} value={false} class="mr-2" />
					No
				</label>
				<label class="flex items-center">
					<input type="radio" bind:group={formData.restrictedAccess} value={true} class="mr-2" />
					Yes
				</label>
			</div>
			{#if formData.restrictedAccess}
				<textarea
					bind:value={formData.restrictionDetails}
					placeholder="Please list the institutions and the reason for the restriction/denial"
					class="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
					rows="3"
				></textarea>
			{/if}
		</div>

		<div class="rounded-lg bg-gray-50 p-4">
			<p class="mb-3 text-sm font-medium text-gray-700">
				Have you ever been convicted of a felony?
			</p>
			<div class="flex space-x-4">
				<label class="flex items-center">
					<input type="radio" bind:group={formData.felonyConviction} value={false} class="mr-2" />
					No
				</label>
				<label class="flex items-center">
					<input type="radio" bind:group={formData.felonyConviction} value={true} class="mr-2" />
					Yes
				</label>
			</div>
			{#if formData.felonyConviction}
				<textarea
					bind:value={formData.felonyDetails}
					placeholder="Please list the dates, counties & violations"
					class="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none"
					rows="3"
				></textarea>
			{/if}
		</div>

		<div class="rounded-lg bg-gray-50 p-4">
			<p class="mb-3 text-sm font-medium text-gray-700">Are you currently on probation/parole?</p>
			<div class="flex space-x-4">
				<label class="flex items-center">
					<input type="radio" bind:group={formData.onProbationParole} value={false} class="mr-2" />
					No
				</label>
				<label class="flex items-center">
					<input type="radio" bind:group={formData.onProbationParole} value={true} class="mr-2" />
					Yes
				</label>
			</div>
		</div>

		<div class="rounded-lg bg-gray-50 p-4">
			<p class="mb-3 text-sm font-medium text-gray-700">
				Do you have any pending or outstanding charges?
			</p>
			<div class="flex space-x-4">
				<label class="flex items-center">
					<input type="radio" bind:group={formData.pendingCharges} value={false} class="mr-2" />
					No
				</label>
				<label class="flex items-center">
					<input type="radio" bind:group={formData.pendingCharges} value={true} class="mr-2" />
					Yes
				</label>
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
			Next Step
		</button>
	</div>
</div>
