<script>
	export let error;
	export let type;
	export let name;
	export let placeholder;
</script>

{#if type === 'textarea'}
	<textarea class="custom-input" {name} {placeholder} rows="8" />
{:else}
	<input class="custom-input" {type} {name} {placeholder} />
{/if}
{#if error}
	<p class="form-error">{error}</p>
{/if}

<style lang="scss">
	.custom-input {
		outline: 1px solid var(--surface3);
		border: none;
		border-radius: 2px;
		padding: 0.75rem;
		caret-color: var(--primary1);
		font-family: inherit;

		&::placeholder {
			color: var(--text3);
		}

		&:focus,
		&:focus-visible {
			outline: 1px solid black;
		}
	}

	.form-error {
		color: red;
		margin: 0;
		font-size: var(--font-medium);
	}
</style>
