<script>
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';
	import '../app.scss';
	export let data;
	const { user } = data;
</script>

<Navbar {user} />
<Sidebar />
<slot />
