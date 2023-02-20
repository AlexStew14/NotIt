<script>
	import { enhance } from '$app/forms';
	import UserPost from '../../(content)/UserPost.svelte';

	export let data;
	$: inCommunity = data?.communities.includes(data?.community?.name);
	$: console.log(inCommunity);
	$: console.log(data);
</script>

{#if data?.community}
	<div class="community-container">
		<div class="community-topline">
			<h2>
				{data.community.name}
			</h2>
			<form action={inCommunity ? '?/leaveCommunity' : '?/joinCommunity'} method="POST" use:enhance>
				<input type="hidden" name="name" value={data.community.name} />
				<button
					class={inCommunity ? 'secondary-filled-button' : 'primary-filled-button'}
					type="submit">{inCommunity ? 'Joined' : 'Join'}</button
				>
			</form>
		</div>
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

		.community-topline {
			display: flex;
			gap: 1rem;
		}

		.posts-container {
			max-width: 40rem;
			margin: 0 auto;
			padding: 2rem 0;
		}
	}
</style>
