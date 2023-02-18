<script>
	import UserPost from './(common)/UserPost.svelte';
</script>

<div class="page-container">
	<div class="posts-container">
		<UserPost />
	</div>
</div>

<style lang="scss">
	.page-container {
		left: 0;
		width: 100vw;
		height: 100vh;
		position: fixed;
		display: flex;
		justify-content: center;

		.posts-container {
			max-width: 40rem;
			padding-top: 1.5rem;
		}
	}
</style>
