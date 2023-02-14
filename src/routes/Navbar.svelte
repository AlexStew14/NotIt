<div class="navbar-container">
	<div class="navbar-inner">
		<h3>reddit</h3>
		<div class="search-bar">
			<p>Search</p>
		</div>
		<div class="navbar-buttons">
			<div class="outlined-button">Get App</div>
			<div class="filled-button">Log In</div>
			<div class="login" />
		</div>
	</div>
</div>

<style lang="scss">
	.navbar-container {
		top: 0;
		position: fixed;
		width: 100%;
		height: 3rem;
		background-color: var(--surface1);
		border-bottom: 1px solid var(--surface2);
	}

	.navbar-inner {
		display: flex;
		padding: 0 2rem;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}

	.navbar-buttons {
		align-items: center;
		display: flex;
		gap: 1rem;
	}

	.outlined-button {
		text-align: center;
		padding: 0.5rem 2rem;
		border: 1px solid var(--primary1);
		border-radius: 1rem;
		color: var(--primary1);
		&:hover {
			background-color: var(--surface2);
			cursor: pointer;
		}
	}

	.filled-button {
		text-align: center;
		padding: 0.5rem 2rem;
		background-color: var(--primary1);
		border-radius: 1rem;
		color: white;

		&:hover {
			background-color: var(--primary2);
			cursor: pointer;
		}
	}
</style>
