<script>
	import { enhance } from '$app/forms';
	import { registrationOpen } from '$lib/stores.js';

	let formData;
	let signUp = false;
</script>

<div class="page-container">
	<div class="auth-container">
		<button class="exit-button" on:click={() => ($registrationOpen = false)}>X</button>
		<div class="auth-info">
			<h3 class="auth-title">{signUp ? 'Sign Up' : 'Log In'}</h3>
			<p class="auth-text">
				By continuing, you agree are setting up a NotIt account and agree to our User Agreement and
				Privacy Policy.
			</p>
		</div>
		<div class="third-party-buttons">
			<div class="third-party-button">Continue with Google</div>
			<div class="third-party-button">Continue with Apple</div>
		</div>
		<div class="auth-spacer">
			<span />
			<p>OR</p>
			<span />
		</div>
		<form
			class="auth-form"
			method="POST"
			action={signUp ? '/?/signup' : '/?/login'}
			use:enhance={() => {
				return async ({ result, update }) => {
					formData = result.data;
					update();
					if (result.type === 'success') {
						$registrationOpen = false;
					}
				};
			}}
		>
			<input class="auth-input" name="email" type="email" placeholder="Email Address" />
			<input class="auth-input" name="password" type="password" placeholder="Password" />
			<button class="secondary-filled-button" type="submit">{signUp ? 'Sign Up' : 'Log in'}</button>
		</form>
		<div class="signup-info">
			{#if signUp}
				<p>
					Already a NotIt user?
					<button class="link-text" on:click={() => (signUp = false)}>Log In</button>
				</p>
			{:else}
				<p>
					New to NotIt?
					<button class="link-text" on:click={() => (signUp = true)}>Sign Up</button>
				</p>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.page-container {
		position: fixed;
		z-index: 9999;
		top: 0;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: 100%;

		background-color: rgba(0, 0, 0, 0.4);

		.auth-container {
			position: fixed;

			display: flex;
			flex-direction: column;
			gap: 1rem;
			align-items: center;
			justify-content: center;

			width: 400px;
			max-height: 95%;
			padding: 3.5rem;

			background-color: var(--surface1);
			border-radius: 0.75rem;

			.exit-button {
				position: absolute;
				top: 1rem;
				right: 1rem;
				color: var(--text3);

				&:hover {
					cursor: pointer;
				}
			}

			.auth-info {
				.auth-title {
					margin: 0 0 0.5rem;
				}

				.auth-text {
					margin: 0;
					font-size: var(--font-medium);
				}
			}

			.third-party-buttons {
				width: 100%;
				text-align: center;

				.third-party-button {
					margin-top: 0.5rem;
					padding: 0.5rem;

					border: 1px solid var(--surface3);
					border-radius: 1rem;

					transition: all 0.3s;

					&:hover {
						cursor: pointer;
						background-color: var(--surface4);
						border: 1px solid var(--surface4);
					}
				}
			}

			.auth-spacer {
				display: flex;
				gap: 1rem;
				align-items: center;

				width: 100%;

				text-align: center;

				span {
					flex: 1;
					border-top: 1px solid var(--surface3);
				}

				p {
					font-size: var(--font-medium);
					font-weight: bold;
					color: var(--text3);
				}
			}

			.auth-form {
				display: flex;
				flex-direction: column;
				gap: 1rem;
				width: 100%;

				.auth-input {
					padding: 0.75rem;
					border: 1px solid var(--surface3);
					border-radius: 2rem;
					transition: all 0.3s;

					&:hover {
						border: 1px solid var(--surface4);
					}
				}
			}

			.signup-info {
				p {
					font-size: var(--font-medium);
				}

				.link-text {
					color: var(--primary1);
					text-decoration: underline;

					&:hover {
						cursor: pointer;
					}
				}
			}
		}
	}
</style>
