<script>
	import { enhance } from '$app/forms';
	import UserPost from '../../../../(content)/UserPost.svelte';
	import CustomInput from '../../../../(common)/CustomInput.svelte';
	import { user } from '$lib/stores.js';
	export let data;

	$: ({ post } = data);
	$: ({ id, title, content, author, communityName, comments, totalVotes } = post);

	export let form;
</script>

{#if post}
	<div class="page-container">
		<div class="content-container">
			<div class="header-container">
				<a href={`/n/${communityName}/`} class="close">X Close</a>
			</div>
			<div class="post-container">
				<UserPost
					{communityName}
					{content}
					{title}
					email={author.email}
					{id}
					{totalVotes}
					detail={true}
				/>
				<div class="spacer" />
				<div class="create-comment-container">
					{#if $user}
						<form action="?/postComment" method="POST" class="comment-form" use:enhance>
							<p>Comment as {$user.email}</p>
							<CustomInput
								name="content"
								type="textarea"
								rows="6"
								placeholder="What are your thoughts?"
								error={form?.error?.content}
							/>
							<input type="hidden" name="postId" value={post.id} />
							<div class="submit-container">
								<button type="submit" class="primary-filled-button">Comment</button>
							</div>
						</form>
					{:else}
						<p>Sign in to comment.</p>
					{/if}
				</div>
				<div class="spacer" />
				<div class="comments-container">
					<h3>Comments</h3>
					{#if comments?.length > 0}
						{#each comments as comment}
							<div class="comment-container">
								<p class="user-text">{comment.author.email}</p>
								<div class="comment-content-container">
									<p class="comment-content">{comment.content}</p>
								</div>
							</div>
						{/each}
					{:else}
						<p class="no-comments-text">Be the first to comment!</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.page-container {
		position: fixed;
		z-index: 3;
		top: var(--navbar-height);
		left: var(--sidebar-width);

		width: calc(100% - var(--sidebar-width));
		min-height: calc(100vh - var(--navbar-height));

		background-color: var(--surface5);

		.content-container {
			max-width: 65rem;
			margin: 0 auto;
			background-color: var(--surface4);

			.header-container {
				display: flex;
				align-items: center;
				justify-content: flex-end;

				width: 100%;
				height: 3rem;
				padding: 0 4.5rem;

				background-color: #000000;

				.close {
					color: var(--surface1);
					&:hover {
						color: var(--surface3);
					}
				}
			}

			.post-container {
				overflow-y: scroll;
				max-height: calc(100vh - var(--navbar-height));
				padding: 2rem 4rem 4rem;

				.spacer {
					width: 100%;
					height: 0.75rem;
					background-color: var(--surface4);
				}

				.create-comment-container {
					padding: 1rem 3rem;
					background-color: var(--surface1);

					p {
						font-size: var(--font-medium);
						color: var(--text2);
					}

					.submit-container {
						display: flex;
						justify-content: flex-end;
						width: 100%;
					}
				}

				.comments-container {
					width: 100%;
					padding: 1rem 3rem;
					background-color: var(--surface1);

					.comment-container {
						padding: 1rem 0;

						.user-text {
							margin-bottom: 0.5rem;
							font-size: var(--font-medium);
							font-weight: bold;
						}
					}

					.no-comments-text {
						margin-top: 1rem;
					}
				}
			}
		}
	}
</style>
