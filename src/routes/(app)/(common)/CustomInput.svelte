<script>
	export let error;
	export let type;
	export let name;
	export let placeholder;
	export let rows;

	export let maxLength;
	export let leftText;
	export let rounded;

	let inputValue;
</script>

<div>
	{#if type === 'textarea'}
		<textarea class="custom-input" {name} {placeholder} rows={rows || 8} />
	{:else if type === 'text'}
		<div class="input-container">
			<input
				bind:value={inputValue}
				class="custom-input"
				type="text"
				class:left-padded={!!leftText}
				class:rounded={!!rounded}
				{maxLength}
				{name}
				{placeholder}
			/>
			{#if leftText}
				<span class="left-text">{leftText}</span>
			{/if}
			{#if maxLength}
				<span class="length-text">{inputValue?.length || 0}/{maxLength}</span>
			{/if}
		</div>
	{:else}
		<input class="custom-input" {type} class:rounded={!!rounded} {maxLength} {name} {placeholder} />
	{/if}

	{#if error}
		<p class="form-error" class:error-rounded={!!rounded}>{error}</p>
	{/if}
</div>

<style lang="scss">
	.input-container {
		position: relative;
		display: flex;
		align-items: center;

		.left-text {
			position: absolute;
			left: 0.5rem;
			color: var(--text3);
		}

		.length-text {
			position: absolute;
			right: 0.5rem;
			font-size: var(--font-medium);
			color: var(--text3);
		}
	}

	.custom-input {
		width: 100%;
		padding: 0.75rem;

		font-family: inherit;

		border: none;
		border-radius: 2px;
		outline: 1px solid var(--surface3);
		caret-color: var(--primary1);

		&::placeholder {
			color: var(--text3);
		}

		&:focus,
		&:focus-visible {
			outline: 1px solid #000000;
		}
	}

	.rounded {
		border-radius: 2rem;
	}

	.left-padded {
		padding-left: 1.5rem;
	}

	.form-error {
		margin-top: 0.5rem;
		padding: 0;
		font-size: var(--font-medium);
		color: #ff0000;
	}

	.error-rounded {
		margin-left: 0.5rem;
	}
</style>
