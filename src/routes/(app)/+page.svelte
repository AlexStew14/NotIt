<script>
	import UserPost from './(content)/UserPost.svelte';
	export let data;
	let posts;
	$: ({ posts } = data);
</script>

<div class="posts-container">
	{#each posts as { communityName, content, id, totalVotes, author, title }}
		<UserPost {communityName} {title} {content} {id} {totalVotes} email={author.email} />
	{/each}
</div>

<style lang="scss">
	.posts-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		max-width: 40rem;
		margin: 0 auto;
		padding: 2rem 0;
	}
</style>
