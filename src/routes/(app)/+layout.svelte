<script>
	import { registrationOpen } from '$lib/stores.js';
	import { onDestroy } from 'svelte';
	import Navbar from './(common)/Navbar.svelte';
	import Sidebar from './(common)/Sidebar.svelte';
	import '../app.scss';
	import Registration from './(auth)/Registration.svelte';

	export let data;
	let user;
	$: ({ user } = data);

	let registrationOpenValue = false;
	const registrationOpenUnsubscribe = registrationOpen.subscribe(
		(value) => (registrationOpenValue = value)
	);
	onDestroy(registrationOpenUnsubscribe);
</script>

<Navbar {user} />
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
