<script>
	import CustomInput from '../(common)/CustomInput.svelte';
	import { enhance } from '$app/forms';
	import { createCommunityOpen } from '$lib/stores.js';
</script>

<div class="page-container">
	<div class="community-container">
		<button class="exit-button" on:click={() => ($createCommunityOpen = false)}>X</button>
		<h4>Create a community</h4>
		<div class="spacer" />
		<div>
			<h4 class="title-text">Name</h4>
			<p class="info-text">Community names including capitalization cannot be changed.</p>
		</div>
		<form class="community-form" method="POST" action="/?/createCommunity" use:enhance>
			<CustomInput maxLength="21" name="name" type="text" leftText="r/" />
			<div class="bottom-container">
				<button class="primary-outlined-button" on:click={() => ($createCommunityOpen = false)}>
					Cancel
				</button>
				<button class="primary-filled-button" type="submit">Create Community</button>
			</div>
		</form>
	</div>
</div>

<style lang="scss">
	.page-container {
		top: var(--navbar-height);
		width: 100vw;
		height: calc(100vh - var(--navbar-height));
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.8);
		position: fixed;
		z-index: 9999;

		.community-container {
			box-sizing: border-box;
			height: 80vh;
			width: 500px;
			position: fixed;
			background-color: var(--surface1);
			border-radius: 0.5rem;
			padding: 0 1rem;

			.exit-button {
				color: var(--text3);
				position: absolute;
				right: 1rem;
				top: 1rem;

				&:hover {
					cursor: pointer;
				}
			}

			h4 {
				font-weight: 400;
			}

			.title-text {
				margin: 0;
				padding: 0;
			}

			.info-text {
				font-size: var(--font-small);
				color: var(--text3);
				margin-top: 0.5rem;
				padding: 0;
			}

			.community-form {
				.bottom-container {
					position: absolute;
					bottom: 0.5rem;
					right: 0.5rem;

					.cancel-button {
					}
				}
			}
		}
	}
</style>
