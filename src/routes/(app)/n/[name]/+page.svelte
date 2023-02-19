<script>
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
			{#each data.community.posts as post}
				<h3>{post.title}</h3>
				<h3>{post.content}</h3>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.community-container {
		padding: 0.5rem 1rem;
	}
</style>
