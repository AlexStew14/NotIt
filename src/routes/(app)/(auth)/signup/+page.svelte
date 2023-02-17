<div class="signup-container">
	<a class="exit-button" href="/">X</a>
	<div class="signup-inner">
		<div class="signup-info">
			<h3 class="signup-title">Sign Up</h3>
			<p class="signup-text">
				By continuing, you are setting up a Reddit account and agree to our User Agreement and
				Privacy Policy.
			</p>
		</div>
		<div class="third-party-buttons">
			<div class="third-party-button">Continue with Google</div>
			<div class="third-party-button">Continue with Apple</div>
		</div>
		<div class="signup-spacer">
			<span />
			<p>OR</p>
			<span />
		</div>
		<form class="signup-form" method="POST">
			<input class="signup-input" name="email" type="email" placeholder="Email Address" />
			<input class="signup-input" name="password" type="password" placeholder="Password" />
			<button class="signup-button" type="submit">Sign Up</button>
		</form>
		<div class="signup-info">
			<p>
				Already a redditor? <a href="/login">Log In</a>
			</p>
		</div>
	</div>
</div>

<style lang="scss">
	.signup-container {
		height: 95vh;
		width: 400px;
		position: fixed;
		display: flex;
		align-items: center;
		background-color: var(--surface1);
		border-radius: 0.75rem;

		.exit-button {
			color: var(--text3);
			position: absolute;
			right: 1rem;
			top: 1rem;

			&:hover {
				cursor: pointer;
			}
		}

		.signup-inner {
			display: flex;
			flex-direction: column;
			border-radius: 0.5rem;
			gap: 1rem;
			padding: 4rem;

			.signup-info {
				.signup-title {
					margin: 0 0 0.5rem;
				}

				.signup-text {
					margin: 0;
					font-size: var(--font-medium);
				}
			}

			.third-party-buttons {
				text-align: center;

				.third-party-button {
					border: 1px solid var(--surface3);
					border-radius: 1rem;
					transition: all 0.3s;
					padding: 0.5rem;
					margin-top: 0.5rem;

					&:hover {
						cursor: pointer;
						background-color: var(--surface4);
						border: 1px solid var(--surface4);
					}
				}
			}

			.signup-spacer {
				width: 100%;
				text-align: center;
				display: flex;
				align-items: center;
				gap: 1rem;

				span {
					border-top: 1px solid var(--surface3);
					flex: 1;
				}

				p {
					font-size: var(--font-medium);
					font-weight: bold;
					color: var(--text3);
				}
			}

			.signup-form {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
				width: 100%;

				.signup-input {
					border: 1px solid var(--surface3);
					border-radius: 2rem;
					transition: all 0.3s;
					padding: 0.75rem;
					margin-top: 0.5rem;

					&:hover {
						border: 1px solid var(--surface4);
					}
				}

				.signup-button {
					color: white;
					border: 1px solid var(--secondary1);
					background-color: var(--secondary1);
					font-weight: bold;
					border-radius: 2rem;
					transition: all 0.3s;
					padding: 0.75rem;
					margin-top: 0.5rem;
					box-sizing: inherit;

					&:hover {
						border: 1px solid var(--secondary2);
						background-color: var(--secondary2);
					}
				}
			}

			.signup-info {
				p {
					font-size: var(--font-medium);
				}

				a {
					text-decoration: underline;
					color: var(--primary1);
				}
			}
		}
	}
</style>
