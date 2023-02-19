<script>
	import { registrationOpen, createCommunityOpen } from '$lib/stores.js';
	import Navbar from './(layout)/Navbar.svelte';
	import Sidebar from './(layout)/Sidebar.svelte';
	import '../app.scss';
	import Registration from './(auth)/Registration.svelte';
	import CreateCommunity from './(content)/(community)/CreateCommunity.svelte';
	import { user } from '$lib/stores.js';

	export let data;
	$: $user = data?.user;
</script>

<Navbar />
<Sidebar communities={data.communities} />
{#if $registrationOpen}
	<Registration />
{/if}
{#if $createCommunityOpen}
	<CreateCommunity />
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
