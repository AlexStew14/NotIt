<script>
	import UserPost from '../../../../(content)/UserPost.svelte';
	export let data;

	$: ({ post } = data);
	$: ({ id, title, content, author, communityName, comments, totalVotes } = post);
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
				max-height: 90vh;
				padding: 2rem 4rem 4rem;
			}
		}
	}
</style>
