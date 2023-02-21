<script>
	import { enhance } from '$app/forms';
	import { registrationOpen } from '$lib/stores.js';
	import CustomInput from '../(common)/CustomInput.svelte';

	let form = {};
	$: ({ status: formStatus, data: formData } = form);
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
					form = result;
					update();
					if (result.type === 'success') {
						$registrationOpen = false;
					}
				};
			}}
		>
			<CustomInput
				name="email"
				type="email"
				placeholder="Email Address"
				error={formData?.error?.email}
				rounded
			/>
			<CustomInput
				name="password"
				type="password"
				placeholder="Password"
				error={formData?.error?.password}
				rounded
			/>
			{#if formStatus === 500}
				<p class="error-text">
					{formData.error}
				</p>
			{/if}
			<button class="secondary-filled-button" type="submit">{signUp ? 'Sign Up' : 'Log in'}</button>
			<div class="signup-info">
				<p>
					{signUp ? 'Already a NotIt user?' : 'New to NotIt?'}
					<button
						class="link-text"
						type="reset"
						on:click={() => {
							signUp = !signUp;
							form = {};
						}}>{signUp ? 'Log In' : 'Sign Up'}</button
					>
				</p>
			</div>
		</form>
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

				.error-text {
					color: #ff0000;
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
