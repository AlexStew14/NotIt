<script>
	import { registrationOpen } from '$lib/stores.js';
	import { enhance } from '$app/forms';
	import { user } from '$lib/stores.js';
</script>

<div class="navbar-container">
	<div class="navbar-inner-left">
		<h3><a href="/">reddit</a></h3>
		<div class="search-bar"><span>Search Reddit</span></div>
	</div>
	<div class="navbar-inner-right">
		{#if $user}
			<a href="/submit"><button class="filled-button">Post</button></a>
			<form method="POST" action="/?/logout" use:enhance>
				<button class="outlined-button" type="submit">Log Out</button>
			</form>
			<p>{$user.email}</p>
		{:else}
			<button class="outlined-button">Get App</button>
			<button class="filled-button" on:click={() => ($registrationOpen = true)}>Log In</button>
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
			width: 350px;
			padding-right: 3rem;

			.outlined-button {
				padding: 0.5rem 2rem;
				border: 1px solid var(--primary1);
				border-radius: 2rem;
				color: var(--primary1);
				width: 60px;

				&:hover {
					background-color: var(--surface2);
					cursor: pointer;
				}
			}

			.filled-button {
				padding: 0.5rem 2rem;
				background-color: var(--primary1);
				border-radius: 2rem;
				color: white;
				width: 60px;

				&:hover {
					background-color: var(--primary2);
					cursor: pointer;
				}
			}
		}
	}
</style>
