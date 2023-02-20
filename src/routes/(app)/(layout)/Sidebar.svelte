<script>
	export let communities;
</script>

<div class="sidebar-container">
	<p class="topic-header">MY COMMUNITIES</p>
	<div class="communities">
		{#each communities as community}
			<a href={`/n/${community.name}`}>
				<p>n/{community.name}</p>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.sidebar-container {
		position: fixed;
		top: var(--navbar-height);
		left: 0;
		width: var(--sidebar-width);
		height: 100%;
		background-color: var(--surface1);
		border-top: 1px solid var(--surface2);
		border-right: 1px solid var(--surface2);
		padding: var(--content-padding);
		padding-top: 0.5rem;
		z-index: 2;

		.topic-header {
			font-size: var(--font-small);
			font-weight: var(--font-weight-small);
			color: var(--text3);
			margin-bottom: 0.5rem;
		}

		.communities {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;

			p {
				color: var(--text2);
				font-size: var(--font-medium);
				font-weight: var(--font-weight-medium);

				&:hover {
					color: var(--text3);
				}
			}
		}
	}
</style>
