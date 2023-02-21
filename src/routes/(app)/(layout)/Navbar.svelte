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
				<button class="primary-filled-button">Post</button>
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
		position: fixed;
		z-index: 2;
		top: 0;

		display: flex;
		gap: 1rem;

		width: 100%;
		height: var(--navbar-height);
		padding: var(--content-padding);

		background-color: var(--surface1);
		border-bottom: 1px solid var(--surface2);

		.navbar-inner-left {
			display: flex;
			flex-grow: 1;
			gap: 10rem;
			align-items: center;

			.search-bar {
				flex-grow: 1;

				min-width: 140px;
				max-width: 700px;
				margin: 0 auto;
				padding: 0.75rem 2rem;

				font-size: var(--font-medium);
				font-weight: var(--font-weight-medium);
				color: var(--text3);

				background-color: var(--surface2);
				border: 1px solid var(--surface3);
				border-radius: 2rem;

				&:hover {
					background-color: var(--surface1);
					border: 1px solid var(--primary1);
				}
			}
		}

		.navbar-inner-right {
			display: flex;
			gap: 1rem;
			align-items: center;
			justify-content: space-around;

			padding-right: 3rem;

			text-align: center;
		}
	}
</style>
