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
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.4);
		position: fixed;
		z-index: 9999;

		.auth-container {
			max-height: 95%;
			width: 400px;
			position: fixed;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: var(--surface1);
			border-radius: 0.75rem;
			padding: 3.5rem;
			flex-direction: column;
			gap: 1rem;

			.exit-button {
				color: var(--text3);
				position: absolute;
				right: 1rem;
				top: 1rem;

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
				text-align: center;
				width: 100%;

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

			.auth-spacer {
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

			.auth-form {
				display: flex;
				flex-direction: column;
				gap: 1rem;
				width: 100%;

				.auth-input {
					border: 1px solid var(--surface3);
					border-radius: 2rem;
					transition: all 0.3s;
					padding: 0.75rem;

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
					text-decoration: underline;
					color: var(--primary1);

					&:hover {
						cursor: pointer;
					}
				}
			}
		}
	}
</style>
