<script>
	import UserPost from './UserPost.svelte';
</script>

<div class="page-container">
	<div class="content-container">
		<div class="posts-container">
			<UserPost />
		</div>
	</div>
</div>

<style lang="scss">
	.page-container {
		margin-top: var(--navbar-height);
		width: 100%;
		height: 100vh;

		.content-container {
			display: flex;
			justify-content: center;

			.posts-container {
				max-width: 40rem;
				padding-top: 1.5rem;
			}
		}
	}
</style>
