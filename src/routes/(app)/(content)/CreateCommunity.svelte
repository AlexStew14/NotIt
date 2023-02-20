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
			action="/?/createCommunity"
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
		position: fixed;
		z-index: 9999;
		top: var(--navbar-height);

		display: flex;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: calc(100% - var(--navbar-height));

		background-color: rgba(0, 0, 0, 0.8);

		.community-container {
			position: fixed;

			width: 500px;
			max-height: 80%;
			padding: 1rem;

			background-color: var(--surface1);
			border-radius: 0.5rem;

			.exit-button {
				position: absolute;
				top: 1rem;
				right: 1rem;
				color: var(--text3);

				&:hover {
					cursor: pointer;
				}
			}

			.create-text {
				margin-bottom: 1rem;
				font-weight: normal;
			}

			.title-text {
				margin: 0;
				padding: 0;
				font-weight: normal;
			}

			.info-text {
				margin-top: 0.5rem;
				padding: 0;
				font-size: var(--font-small);
				color: var(--text3);
			}

			.community-form {
				display: flex;
				flex-direction: column;
				gap: 1rem;

				.bottom-container {
					display: flex;
					gap: 0.5rem;
					justify-content: flex-end;
				}
			}
		}
	}
</style>
