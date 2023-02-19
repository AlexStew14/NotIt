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
		padding: 2rem 0;
		margin: 0 auto;
		max-width: 40rem;
	}
</style>
