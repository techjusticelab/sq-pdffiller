<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
	import StepIndicator from './StepIndicator.svelte';
	import PersonalInfo from './steps/PersonalInfo.svelte';
	import ContactInfo from './steps/ContactInfo.svelte';
	import BackgroundQuestions from './steps/BackgroundQuestions.svelte';
	import AuthorizationType from './steps/AuthorisationType.svelte';
	import Review from './steps/Review.svelte';

	let currentStep = 1;
	let totalSteps = 5;
	let user = null;
	let loading = false;

	let formData = {
		// Personal Information
		lastName: '',
		firstName: '',
		middleInitial: '',
		otherNames: '',
		dateOfBirth: '',
		gender: '',
		ssn: '',

		// Contact Information
		phoneNumber: '',
		stateId: '',
		driverLicense: '',
		passportNumber: '',
		stateBarNumber: '',
		state: '',

		// Background Questions
		visitedInmate: false,
		formerInmate: false,
		restrictedAccess: false,
		restrictionDetails: '',
		felonyConviction: false,
		felonyDetails: '',
		onProbationParole: false,
		pendingCharges: false,

		// Authorization Type
		authorizationType: ''
	};

	onMount(async () => {
		const {
			data: { session }
		} = await supabase.auth.getSession();
		if (!session) {
			goto('/');
			return;
		}
		user = session.user;
	});

	async function signOut() {
		await supabase.auth.signOut();
		goto('/');
	}

	function nextStep() {
		if (currentStep < totalSteps) {
			currentStep++;
		}
	}

	function prevStep() {
		if (currentStep > 1) {
			currentStep--;
		}
	}

	async function submitApplication() {
		loading = true;
		try {
			const response = await fetch('/api/submit-application', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...formData,
					userId: user.id,
					email: user.email
				})
			});

			if (response.ok) {
				alert('Application submitted successfully! A confirmation email has been sent.');
				goto('/success');
			} else {
				throw new Error('Failed to submit application');
			}
		} catch (error) {
			alert('Error submitting application: ' + error.message);
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>CDCR Application Form</title>
</svelte:head>

{#if user}
	<div class="min-h-screen bg-gray-100">
		<!-- Header -->
		<header class="shadow-default bg-white">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex items-center justify-between py-6">
					<div>
						<h1 class="text-2xl font-bold text-gray-900">CDCR Security Clearance Application</h1>
						<p class="text-sm text-gray-600">Welcome, {user.email}</p>
					</div>
					<button on:click={signOut} class="text-sm font-medium text-gray-600 hover:text-gray-800">
						Sign Out
					</button>
				</div>
			</div>
		</header>

		<!-- Main Content -->
		<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
			<!-- Step Indicator -->
			<StepIndicator {currentStep} {totalSteps} />

			<!-- Form Steps -->
			<div class="shadow-default mt-8 rounded-lg bg-white p-8">
				{#if currentStep === 1}
					<PersonalInfo bind:formData on:next={nextStep} />
				{:else if currentStep === 2}
					<ContactInfo bind:formData on:next={nextStep} on:prev={prevStep} />
				{:else if currentStep === 3}
					<BackgroundQuestions bind:formData on:next={nextStep} on:prev={prevStep} />
				{:else if currentStep === 4}
					<AuthorizationType bind:formData on:next={nextStep} on:prev={prevStep} />
				{:else if currentStep === 5}
					<Review {formData} on:prev={prevStep} on:submit={submitApplication} {loading} />
				{/if}
			</div>
		</div>
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center">
		<div class="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
	</div>
{/if}
