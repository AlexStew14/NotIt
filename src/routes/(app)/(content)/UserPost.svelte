<script>
	import { enhance } from '$app/forms';
	import { user } from '$lib/stores.js';

	export let content = '';
	export let title = '';
	export let email = '';
	export let id = '';
	export let totalVotes = 0;

	let postVoteValue;
	$: postVoteValue = $user?.votes.find((vote) => vote.postId === id)?.value || 0;
</script>

<div class="post-container">
	<div class="sidebar-container">
		{#if $user && postVoteValue !== 1}
			<form method="POST" action="/?/createVote" use:enhance>
				<input name="postId" value={id} type="hidden" />
				<input name="value" value={1} type="hidden" />
				<button type="submit">Up</button>
			</form>
		{/if}
		{#if $user && postVoteValue !== 0}
			<form method="POST" action="/?/deleteVote" use:enhance>
				<input name="postId" value={id} type="hidden" />
				<button type="submit">
					{totalVotes}
				</button>
			</form>
		{:else}
			<p>
				{totalVotes}
			</p>
		{/if}
		{#if $user && postVoteValue !== -1}
			<form method="POST" action="/?/createVote" use:enhance>
				<input name="postId" value={id} type="hidden" />
				<input name="value" value={-1} type="hidden" />
				<button type="submit">Down</button>
			</form>
		{/if}
	</div>
	<div class="post-inner">
		<p class="post-author">By: {email}</p>
		<h3 class="post-title">{title}</h3>
		<div class="post-content">
			{content}
		</div>
	</div>
</div>

<style lang="scss">
	.post-container {
		background-color: var(--surface1);
		border: 1px solid var(--surface3);
		border-radius: 0.25rem;
		display: flex;
		max-height: 20rem;

		.sidebar-container {
			min-width: 2.5rem;
			min-height: 100%;
			background-color: var(--surface2);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
		}

		.post-inner {
			padding: 0.5rem;
			display: flex;
			flex-direction: column;

			.post-author {
				font-size: var(--font-medium);
				margin: 0;
			}
		}
	}
</style>
