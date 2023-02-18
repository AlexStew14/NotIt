<script>
	import { enhance } from '$app/forms';
</script>

<div class="page-container">
	<h3>Create a post</h3>
	<div class="line" />
	<div class="submit-container">
		<form method="POST" action="/?/createPost" use:enhance>
			<input class="title-input" type="text" name="title" placeholder="Title" />
			<input class="content-input" type="text" name="content" placeholder="Content" />
			<button class="submit-button" type="submit">Post</button>
		</form>
	</div>
</div>

<style lang="scss">
	.page-container {
		margin-top: 6rem;
		margin-left: 3rem;

		.line {
			border-top: 1px solid var(--surface2);
			max-width: 45rem;
		}

		.submit-container {
			max-width: 45rem;
			background-color: var(--surface1);
			border-radius: 0.25rem;
			width: 100%;
		}
	}
</style>
