<script>
	import './app.scss';
</script>

<div class="hide-overflow">
	<slot />
</div>

<style>
	.hide-overflow {
		overflow-y: hidden;
	}
</style>
