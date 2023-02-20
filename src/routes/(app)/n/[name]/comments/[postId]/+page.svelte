<script>
	import UserPost from '../../../../(content)/UserPost.svelte';
	export let data;

	let post, id, title, content, author, communityName, comments, totalVotes;
	$: ({ post } = data);
	$: ({ id, title, content, author, communityName, comments, totalVotes } = post);
	console.log(data);
</script>

{#if post}
	<div class="page-container">
		<div class="content-container">
			<div class="header-container">
				<button class="close" />
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
		top: var(--navbar-height);
		left: var(--sidebar-width);
		width: calc(100% - var(--sidebar-width));
		position: fixed;
		z-index: 3;
		background-color: var(--surface5);

		.content-container {
			max-width: 65rem;
			margin: 0 auto;
			background-color: var(--surface4);

			.header-container {
				width: 100%;
				height: 3rem;
				background-color: black;
			}

			.post-container {
				max-height: 90vh;
				padding: 2rem 4rem 4rem;
				overflow-y: scroll;
			}
		}
	}
</style>
