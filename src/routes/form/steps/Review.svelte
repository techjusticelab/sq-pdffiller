<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { generateFilledPdf } from '$lib/pdfGen';

	export let formData;
	export let loading = false;

	const dispatch = createEventDispatcher();

	async function downloadPdf() {
		try {
			loading = true;
			const pdfBytes = await generateFilledPdf(formData);

			// Create a blob from the PDF bytes
			const blob = new Blob([pdfBytes], { type: 'application/pdf' });

			// Create a URL for the blob
			const url = URL.createObjectURL(blob);

			// Create a link element
			const link = document.createElement('a');
			link.href = url;
			link.download = 'CDCR_2311_Application.pdf';

			// Append to the document
			document.body.appendChild(link);

			// Click the link
			link.click();

			// Remove the link
			document.body.removeChild(link);

			// Release the blob URL
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Error downloading PDF:', error);
			alert('Error generating PDF: ' + error.message);
		} finally {
			loading = false;
		}
	}
</script>

<div>
	<h2 class="mb-6 text-2xl font-bold text-gray-900">Review Your Application</h2>

	<div class="space-y-6">
		<!-- Personal Information -->
		<div class="rounded-lg bg-gray-50 p-4">
			<h3 class="mb-3 text-lg font-semibold text-gray-800">Personal Information</h3>
			<div class="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
				<div>
					<span class="font-medium text-gray-600">Name:</span>
					{formData.lastName}, {formData.firstName}
					{formData.middleInitial}
				</div>
				<div>
					<span class="font-medium text-gray-600">Date of Birth:</span>
					{formData.dateOfBirth}
				</div>
				<div>
					<span class="font-medium text-gray-600">Gender:</span>
					{formData.gender}
				</div>
				{#if formData.otherNames}
					<div>
						<span class="font-medium text-gray-600">Other Names:</span>
						{formData.otherNames}
					</div>
				{/if}
			</div>
		</div>

		<!-- Contact Information -->
		<div class="rounded-lg bg-gray-50 p-4">
			<h3 class="mb-3 text-lg font-semibold text-gray-800">Contact Information</h3>
			<div class="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
				<div>
					<span class="font-medium text-gray-600">Phone:</span>
					{formData.phoneNumber}
				</div>
				{#if formData.state}
					<div>
						<span class="font-medium text-gray-600">State:</span>
						{formData.state}
					</div>
				{/if}
				{#if formData.stateId}
					<div>
						<span class="font-medium text-gray-600">State ID:</span>
						{formData.stateId}
					</div>
				{/if}
				{#if formData.driverLicense}
					<div>
						<span class="font-medium text-gray-600">Driver's License:</span>
						{formData.driverLicense}
					</div>
				{/if}
			</div>
		</div>

		<!-- Authorization Type -->
		<div class="rounded-lg bg-gray-50 p-4">
			<h3 class="mb-3 text-lg font-semibold text-gray-800">Authorization Type</h3>
			<p class="text-sm">{formData.authorizationType}</p>
		</div>

		<!-- Background Questions Summary -->
		<div class="rounded-lg bg-gray-50 p-4">
			<h3 class="mb-3 text-lg font-semibold text-gray-800">Background Questions</h3>
			<div class="space-y-2 text-sm">
				<div>
					Visited/relationship with inmate: <span class="font-medium"
						>{formData.visitedInmate ? 'Yes' : 'No'}</span
					>
				</div>
				<div>
					Former inmate: <span class="font-medium">{formData.formerInmate ? 'Yes' : 'No'}</span>
				</div>
				<div>
					Restricted access: <span class="font-medium"
						>{formData.restrictedAccess ? 'Yes' : 'No'}</span
					>
				</div>
				<div>
					Felony conviction: <span class="font-medium"
						>{formData.felonyConviction ? 'Yes' : 'No'}</span
					>
				</div>
				<div>
					On probation/parole: <span class="font-medium"
						>{formData.onProbationParole ? 'Yes' : 'No'}</span
					>
				</div>
				<div>
					Pending charges: <span class="font-medium">{formData.pendingCharges ? 'Yes' : 'No'}</span>
				</div>
			</div>
		</div>

		<!-- Attestation -->
		<div class="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
			<h4 class="mb-2 text-sm font-medium text-yellow-800">Attestation</h4>
			<p class="text-xs text-yellow-700">
				By submitting this application, I attest that all of the information provided is true and
				correct. I acknowledge that prior written consent from the supervising agency is required
				for any parolee, probationer, or formerly incarcerated person to enter prison grounds. I
				further understand that, if approved, access is restricted to the designated area(s) and
				shall be under state employee escort unless otherwise authorized.
			</p>
		</div>
	</div>

	<div class="mt-8 flex justify-between">
		<button
			on:click={() => dispatch('prev')}
			class="rounded-lg bg-gray-300 px-6 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
			disabled={loading}
		>
			Previous
		</button>

		<div class="flex space-x-4">
			<button
				on:click={downloadPdf}
				disabled={loading}
				class="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
			>
				Download PDF
			</button>

			<button
				on:click={() => dispatch('submit')}
				disabled={loading}
				class="flex items-center rounded-lg bg-green-600 px-8 py-3 text-white transition-colors duration-200 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
			>
				{#if loading}
					<div class="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
					Submitting...
				{:else}
					Submit Application
				{/if}
			</button>
		</div>
	</div>
</div>
