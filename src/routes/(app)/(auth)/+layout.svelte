<div class="auth-container">
	<slot />
</div>

<style lang="scss">
	.auth-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.4);
		position: fixed;
	}
</style>
