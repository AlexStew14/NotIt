<div class="sidebar-container">
	<div class="topics-container">
		<div class="topic-container">
			<p class="topic-header">FEEDS</p>
			<div class="topics">
				<p>Home</p>
				<p>Popular</p>
			</div>
		</div>
		<div class="topic-container">
			<p class="topic-header">RECENT</p>
			<div class="topics">
				<p>r/sveltejs</p>
				<p>r/reactjs</p>
				<p>r/programmerhumor</p>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.sidebar-container {
		position: fixed;
		top: var(--navbar-height);
		left: 0;
		width: var(--sidebar-width);
		height: 100vh;
		background-color: var(--surface1);
		border-top: 1px solid var(--surface2);
		border-right: 1px solid var(--surface2);
		padding: var(--content-padding);
		padding-top: 0.5rem;

		.topics-container {
			display: flex;
			flex-direction: column;

			.topic-header {
				font-size: var(--font-small);
				font-weight: var(--font-weight-small);
				color: var(--text3);
			}
		}

		.topics {
			p {
				color: var(--text2);
				font-size: var(--font-medium);
				font-weight: var(--font-weight-medium);
				padding: 0.25rem;
			}
		}
	}
</style>
