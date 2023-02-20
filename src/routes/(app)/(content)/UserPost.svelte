<script>
	import { enhance } from '$app/forms';
	import { user } from '$lib/stores.js';

	export let communityName = '';
	export let content = '';
	export let title = '';
	export let email = '';
	export let id = '';
	export let totalVotes = 0;
	export let detail = false;

	let postVoteValue;
	$: postVoteValue = $user?.votes.find((vote) => vote.postId === id)?.value || 0;
</script>

<div class="post-container" class:detail>
	<div class="sidebar-container">
		<div class="interaction-container">
			{#if $user && postVoteValue !== 1}
				<form method="POST" action="/?/postVote" use:enhance>
					<input name="postId" value={id} type="hidden" />
					<input name="value" value={1} type="hidden" />
					<button class="up-button" type="submit" />
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
				<form method="POST" action="/?/postVote" use:enhance>
					<input name="postId" value={id} type="hidden" />
					<input name="value" value={-1} type="hidden" />
					<button class="down-button" type="submit" />
				</form>
			{/if}
		</div>
	</div>
	<div class="post-inner" class:inner-detail={detail}>
		<div class="post-topline">
			<a href={`/n/${communityName}`} class="post-community">n/{communityName}</a>
			<p class="post-author">Posted by: {email}</p>
		</div>
		<a href={`/n/${communityName}/comments/${id}`}>
			<h3 class="post-title">{title}</h3>
		</a>
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
		max-height: 22rem;
		overflow-y: hidden;

		.sidebar-container {
			min-width: 2.5rem;

			.interaction-container {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0.25rem;

				.up-button {
					width: 1rem;
					height: 1rem;
					background-color: var(--primary1);
					clip-path: polygon(50% 0, 0 100%, 100% 100%);

					&:hover {
						background-color: var(--primary2);
					}
				}

				.down-button {
					width: 1rem;
					height: 1rem;
					background-color: var(--secondary1);
					clip-path: polygon(50% 100%, 0 0, 100% 0);

					&:hover {
						background-color: var(--secondary2);
					}
				}
			}
		}

		.post-inner {
			padding: 0.5rem;
			display: block;
			-webkit-mask-image: linear-gradient(180deg, #000 14rem, transparent);

			.post-topline {
				display: flex;
				align-items: center;
				gap: 0.5rem;

				.post-author {
					font-size: var(--font-medium);
				}

				.post-community {
					&:hover,
					&:active,
					&:focus {
						text-decoration: underline;
					}
				}
			}

			.post-content {
			}
		}

		.inner-detail {
			-webkit-mask-image: none;
		}
	}

	.detail {
		//overflow-y: scroll;
		max-height: 100%;
	}
</style>
