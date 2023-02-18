<script>
	import { registrationOpen } from '$lib/stores.js';
	import { enhance } from '$app/forms';
	import { user } from '$lib/stores.js';
</script>

<div class="navbar-container">
	<div class="navbar-inner">
		<h3><a href="/">reddit</a></h3>
		<div class="navbar-inner-right">
			<div class="search-bar"><span>Search Reddit</span></div>
			{#if $user}
				<p>{$user.email}</p>
				<a href="/submit"><button class="filled-button">Create Post</button></a>
				<form method="POST" action="/?/logout" use:enhance>
					<button class="outlined-button" type="submit">Log Out</button>
				</form>
			{:else}
				<button class="outlined-button">Get App</button>
				<button class="filled-button" on:click={() => ($registrationOpen = true)}>Log In</button>
				<div class="profile" />
			{/if}
		</div>
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

		.navbar-inner {
			display: flex;
			padding: var(--content-padding);
			justify-content: space-between;
			align-items: center;
			height: 100%;

			.navbar-inner-right {
				align-items: center;
				display: flex;
				justify-content: space-between;
				gap: 1rem;
				text-align: center;
				max-width: 70vw;
				width: 100%;

				.search-bar {
					flex: 3;
					background-color: var(--surface2);
					border-radius: 2rem;
					padding: 0.75rem 2rem;
					color: var(--text3);
					font-size: var(--font-medium);
					font-weight: var(--font-weight-medium);
					border: 1px solid var(--surface3);

					&:hover {
						border: 1px solid var(--primary1);
						background-color: var(--surface1);
					}
				}

				.outlined-button {
					padding: 0.5rem 2rem;
					border: 1px solid var(--primary1);
					border-radius: 2rem;
					color: var(--primary1);

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

					&:hover {
						background-color: var(--primary2);
						cursor: pointer;
					}
				}
			}
		}
	}
</style>
