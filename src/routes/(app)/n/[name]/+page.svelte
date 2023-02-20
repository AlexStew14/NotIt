<script>
	import UserPost from '../../(content)/UserPost.svelte';

	export let data;
</script>

{#if data?.community}
	<div class="community-container">
		<h2>
			{data.community.name}
		</h2>
		<p>
			{data.community.description}
		</p>
		<div class="posts-container">
			{#each data.community.posts as { content, title, author, id, totalVotes }}
				<UserPost
					{content}
					{title}
					email={author.email}
					{id}
					{totalVotes}
					communityName={data.community.name}
				/>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.community-container {
		padding: 0.5rem 1rem;

		.posts-container {
			padding: 2rem 0;
			margin: 0 auto;
			max-width: 40rem;
		}
	}
</style>
