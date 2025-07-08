<script lang="ts">
	export let currentStep: number;
	export let totalSteps: number;

	const steps = [
		'Personal Information',
		'Contact Details',
		'Background Questions',
		'Authorization Type',
		'Review & Submit'
	];
</script>

<div class="w-full">
	<div class="mb-4 flex items-center justify-between">
		{#each steps as step, index}
			<div class="flex items-center {index < steps.length - 1 ? 'flex-1' : ''}">
				<div class="flex items-center">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full
								{index + 1 <= currentStep ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-600'}
								transition-colors duration-200"
					>
						{index + 1}
					</div>
					<div class="ml-3">
						<p
							class="text-sm font-medium {index + 1 <= currentStep
								? 'text-gray-800'
								: 'text-gray-500'}"
						>
							{step}
						</p>
					</div>
				</div>
				{#if index < steps.length - 1}
					<div class="mx-4 flex-1">
						<div
							class="h-0.5 {index + 1 < currentStep
								? 'bg-gray-800'
								: 'bg-gray-300'} transition-colors duration-200"
						></div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
