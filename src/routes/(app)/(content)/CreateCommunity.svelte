<script>
	import CustomInput from '../(common)/CustomInput.svelte';
	import { enhance } from '$app/forms';
	import { createCommunityOpen } from '$lib/stores.js';

	let formData;
</script>

<div class="page-container">
	<div class="community-container">
		<button class="exit-button" on:click={() => ($createCommunityOpen = false)}>X</button>
		<h4 class="create-text">Create a community</h4>
		<div class="spacer" />
		<div>
			<h4 class="title-text">Name</h4>
			<p class="info-text">Community names including capitalization cannot be changed.</p>
		</div>
		<form
			class="community-form"
			method="POST"
			action="/?/postCommunity"
			use:enhance={() => {
				return async ({ result, update }) => {
					formData = result.data;
					update();
					if (result.type === 'success') {
						$createCommunityOpen = false;
					}
				};
			}}
		>
			<CustomInput
				maxLength="21"
				name="name"
				type="text"
				leftText="n/"
				error={formData?.error?.name}
			/>
			<CustomInput
				name="description"
				type="textarea"
				placeholder="Description"
				rows="3"
				error={formData?.error?.description}
			/>
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
		width: 100%;
		height: calc(100% - var(--navbar-height));
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.8);
		position: fixed;
		z-index: 9999;

		.community-container {
			max-height: 80%;
			width: 500px;
			position: fixed;
			background-color: var(--surface1);
			border-radius: 0.5rem;
			padding: 1rem;

			.exit-button {
				color: var(--text3);
				position: absolute;
				right: 1rem;
				top: 1rem;

				&:hover {
					cursor: pointer;
				}
			}

			.create-text {
				margin-bottom: 1rem;
				font-weight: 400;
			}

			.title-text {
				margin: 0;
				padding: 0;
				font-weight: 400;
			}

			.info-text {
				font-size: var(--font-small);
				color: var(--text3);
				margin-top: 0.5rem;
				padding: 0;
			}

			.community-form {
				display: flex;
				flex-direction: column;
				gap: 1rem;

				.bottom-container {
					display: flex;
					justify-content: flex-end;
					gap: 0.5rem;
				}
			}
		}
	}
</style>
