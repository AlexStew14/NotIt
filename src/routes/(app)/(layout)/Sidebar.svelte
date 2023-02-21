<script>
	import { user } from '$lib/stores.js';
	export let communities;
</script>

<div class="sidebar-container">
	{#if $user}
		<p class="topic-header">MY COMMUNITIES</p>
	{/if}
	<div class="communities">
		{#each communities as communityName}
			<a href={`/n/${communityName}`}>
				<p>n/{communityName}</p>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.sidebar-container {
		position: fixed;
		z-index: 2;
		top: var(--navbar-height);
		left: 0;

		width: var(--sidebar-width);
		height: 100%;
		padding: var(--content-padding);
		padding-top: 0.5rem;

		background-color: var(--surface1);
		border-top: 1px solid var(--surface2);
		border-right: 1px solid var(--surface2);

		.topic-header {
			margin-bottom: 0.5rem;
			font-size: var(--font-small);
			font-weight: var(--font-weight-small);
			color: var(--text3);
		}

		.communities {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;

			p {
				font-size: var(--font-medium);
				font-weight: var(--font-weight-medium);
				color: var(--text2);

				&:hover {
					color: var(--text3);
				}
			}
		}
	}
</style>
