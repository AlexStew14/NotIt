<script>
	import UserPost from './(content)/UserPost.svelte';
	export let data;
	let posts = [];
	$: ({ posts } = data);
</script>

<div class="posts-container">
	{#each posts as post}
		<UserPost
			title={post.title}
			content={post.content}
			id={post.id}
			totalVotes={post.totalVotes}
			email={post.author.email}
		/>
	{/each}
</div>

<style lang="scss">
	.posts-container {
		margin: 0 auto;
		max-width: 40rem;
		padding-top: 1.5rem;
	}
</style>
