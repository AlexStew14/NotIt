<script>
	import { registrationOpen, createCommunityOpen } from '$lib/stores.js';
	import { enhance } from '$app/forms';
	import { user } from '$lib/stores.js';
</script>

<div class="navbar-container">
	<div class="navbar-inner-left">
		<h3><a href="/">NotIt</a></h3>
		<div class="search-bar"><span>Search NotIt</span></div>
	</div>
	<div class="navbar-inner-right">
		{#if $user}
			<button class="secondary-filled-button" on:click={() => ($createCommunityOpen = true)}
				>Community</button
			>
			<a href="/submit">
				<button class="primary-filled-button" style="width: 60px">Post</button>
			</a>
			<form method="POST" action="/?/logout" use:enhance>
				<button
					class="primary-outlined-button"
					type="submit"
					on:click={() => ($createCommunityOpen = false)}>Log Out</button
				>
			</form>
			<p>{$user.email}</p>
		{:else}
			<button class="primary-outlined-button">Get App</button>
			<button class="primary-filled-button" on:click={() => ($registrationOpen = true)}
				>Log In</button
			>
			<div class="profile" />
		{/if}
	</div>
</div>

<style lang="scss">
	.navbar-container {
		top: 0;
		position: fixed;
		width: 100%;
		height: var(--navbar-height);
		background-color: var(--surface1);
		border-bottom: 1px solid var(--surface2);
		display: flex;
		padding: var(--content-padding);
		gap: 1rem;

		.navbar-inner-left {
			display: flex;
			align-items: center;
			flex-grow: 1;
			gap: 10rem;

			.search-bar {
				background-color: var(--surface2);
				border-radius: 2rem;
				padding: 0.75rem 2rem;
				color: var(--text3);
				font-size: var(--font-medium);
				font-weight: var(--font-weight-medium);
				border: 1px solid var(--surface3);
				flex-grow: 1;
				margin: 0 auto;
				max-width: 700px;
				min-width: 140px;

				&:hover {
					border: 1px solid var(--primary1);
					background-color: var(--surface1);
				}
			}
		}

		.navbar-inner-right {
			align-items: center;
			display: flex;
			justify-content: space-around;
			text-align: center;
			gap: 1rem;
			max-width: 500px;
			padding-right: 3rem;
		}
	}
</style>
