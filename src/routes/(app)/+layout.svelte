<script>
	import { registrationOpen } from '$lib/stores.js';
	import { onDestroy } from 'svelte';
	import Navbar from './(layout)/Navbar.svelte';
	import Sidebar from './(layout)/Sidebar.svelte';
	import '../app.scss';
	import Registration from './(auth)/Registration.svelte';
	import { user } from '$lib/stores.js';

	export let data;
	$: $user = data?.user;

	let registrationOpenValue = false;
	const registrationOpenUnsubscribe = registrationOpen.subscribe(
		(value) => (registrationOpenValue = value)
	);
	onDestroy(registrationOpenUnsubscribe);
</script>

<Navbar />
<Sidebar />
{#if registrationOpenValue}
	<Registration />
{/if}
<div class="slot-container">
	<slot />
</div>

<style lang="scss">
	.slot-container {
		margin-top: var(--navbar-height);
		margin-left: var(--sidebar-width);
	}
</style>
