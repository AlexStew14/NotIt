<script>
	export let user;
</script>

<div class="navbar-container">
	<div class="navbar-inner">
		<h3>reddit</h3>
		<div class="search-bar"><span>Search Reddit</span></div>
		{#if user}
			<div class="navbar-buttons">
				<p>{user.email}</p>
				<form method="POST" action="?/logout">
					<button class="outlined-button" type="submit">Log Out</button>
				</form>
			</div>
		{:else}
			<div class="navbar-buttons">
				<button class="outlined-button">Get App</button>
				<a href="/login">
					<button class="filled-button">Log In</button>
				</a>
				<div class="profile" />
			</div>
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

		.navbar-inner {
			display: flex;
			padding: var(--content-padding);
			justify-content: space-between;
			align-items: center;
			height: 100%;

			.search-bar {
				min-width: 35rem;
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

			.navbar-buttons {
				align-items: center;
				display: flex;
				gap: 1rem;
				text-align: center;

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
