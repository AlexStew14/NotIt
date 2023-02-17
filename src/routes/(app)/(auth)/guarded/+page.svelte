<script>
	export let data;
	const { user } = data;
</script>

<p>Logged in user: {user.email} with id: {user.id}</p>

<form method="POST">
	<button type="submit" name="logout" value="true">Logout</button>
</form>
