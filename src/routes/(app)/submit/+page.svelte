<script>
	import { enhance } from '$app/forms';
	import CustomInput from '../(common)/CustomInput.svelte';
	export let form;
	export let data;

	$: ({ communities } = data);
</script>

{#if communities}
	<div class="page-container">
		<form class="post-form" method="POST" action="?/createPost" use:enhance>
			<h3 class="post-title">Create a post</h3>
			<div class="line" />
			<select class="communities-select" name="communityName">
				{#each communities as communityName}
					<option value={communityName}>{communityName}</option>
				{/each}
			</select>
			<div class="post-container">
				<div class="post-header">
					<button type="button" class="header-tab selected">Post</button>
					<button type="button" class="header-tab">Images & Video</button>
					<button type="button" class="header-tab">Link</button>
					<button type="button" class="header-tab">Poll</button>
					<button type="button" class="header-tab">Talk</button>
				</div>
				<div class="post-inner">
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
						placeholder="Text"
					/>
					<div class="submit-button-container">
						<button class="primary-filled-button" type="submit">Post</button>
					</div>
				</div>
			</div>
		</form>
	</div>
{/if}

<style lang="scss">
	.page-container {
		padding: 0 2rem;

		.post-form {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			max-width: 46rem;
			margin: 5rem auto 0;

			.post-title {
				font-weight: normal;
			}

			.line {
				margin-bottom: 1rem;
				border-top: 1px solid var(--surface2);
			}

			.communities-select {
				max-width: 20rem;
			}

			.post-container {
				overflow: hidden;
				gap: 0.5rem;
				background-color: var(--surface1);
				border-radius: 0.25rem;

				.post-header {
					display: flex;
					align-items: center;
					justify-content: space-around;

					.header-tab {
						flex: 1;

						height: 100%;
						padding: 1rem;

						font-weight: bold;
						color: var(--text3);
						text-align: center;
						white-space: nowrap;

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
						border-bottom: 2px solid var(--primary2);
					}
				}

				.post-inner {
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
					padding: 1rem;

					.submit-button-container {
						display: flex;
						justify-content: flex-end;
						width: 100%;
						margin-top: 0.5rem;
					}
				}
			}
		}
	}
</style>
