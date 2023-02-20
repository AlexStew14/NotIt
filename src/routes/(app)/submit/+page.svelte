<script>
	import { enhance } from '$app/forms';
	import CustomInput from '../(common)/CustomInput.svelte';
	export let form;
	export let data;

	let communities;
	$: ({ communities } = data);
</script>

{#if communities}
	<div class="page-container">
		<form class="post-form" method="POST" action="?/createPost" use:enhance>
			<h3 class="post-title">Create a post</h3>
			<div class="line" />
			<input
				list="communities"
				class="communities-select"
				name="communityName"
				maxlength="21"
				placeholder="Choose a community"
			/>
			<datalist id="communities">
				{#each communities as community}
					<option value={community.name}>{community.name}</option>
				{/each}
			</datalist>
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
			max-width: 46rem;
			margin: 5rem auto 0;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			.post-title {
				font-weight: 400;
			}

			.line {
				border-top: 1px solid var(--surface2);
				margin-bottom: 1rem;
			}

			.communities-select {
				max-width: 20rem;
			}

			.post-container {
				background-color: var(--surface1);
				border-radius: 0.25rem;
				overflow: hidden;
				gap: 0.5rem;

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
						border-bottom: 2px solid var(--primary2);
					}
				}

				.post-inner {
					padding: 1rem;
					display: flex;
					flex-direction: column;
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
	}
</style>
