<script>
	import { enhance } from '$app/forms';
	import CustomInput from '../(common)/CustomInput.svelte';
	export let form;
</script>

<div class="page-container">
	<h3>Create a post</h3>
	<div class="line" />
	<div class="post-container">
		<div class="post-header">
			<button class="header-tab selected">Post</button>
			<button class="header-tab">Images & Video</button>
			<button class="header-tab">Link</button>
			<button class="header-tab">Poll</button>
			<button class="header-tab">Talk</button>
		</div>
		<form class="submit-form" method="POST" use:enhance>
			<CustomInput
				error={form?.error?.title}
				type="text"
				name="title"
				placeholder="Title"
				maxLength="80"
			/>
			<CustomInput
				error={form?.error?.content}
				type="textarea"
				name="content"
				placeholder="Text (optional)"
			/>
			<div class="submit-button-container">
				<button class="primary-filled-button" type="submit">Post</button>
			</div>
		</form>
	</div>
</div>

<style lang="scss">
	.page-container {
		margin-top: 6rem;
		margin-left: 3rem;
		padding: 0 2rem;

		.line {
			border-top: 1px solid var(--surface2);
			max-width: 46rem;
			margin-bottom: 1rem;
		}

		.post-container {
			max-width: 46rem;
			background-color: var(--surface1);
			border-radius: 0.25rem;
			width: 100%;
			overflow: hidden;

			.post-header {
				display: flex;
				justify-content: space-around;
				align-items: center;

				.header-tab {
					white-space: nowrap;
					font-weight: bold;
					color: var(--text3);
					text-align: center;
					height: 100%;
					padding: 1rem;
					flex: 1;
					border-right: 1px solid var(--surface3);
					border-bottom: 1px solid var(--surface3);

					&:hover {
						background-color: var(--surface2);
					}

					&:last-of-type {
						border-right: none;
					}
				}

				.selected {
					color: var(--primary2);
					background-color: var(--surface2);
					border-bottom: 2px solid var(--primary2);
				}
			}

			.submit-form {
				display: flex;
				flex-direction: column;
				padding: 1rem;
				gap: 0.5rem;

				.submit-button-container {
					margin-top: 0.5rem;
					display: flex;
					width: 100%;
					justify-content: flex-end;
				}
			}
		}
	}
</style>
