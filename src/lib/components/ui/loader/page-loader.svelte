<script>
	import Loader from './loader.svelte';
</script>

<div
	class="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center text-primary"
>
	<div class="absolute left-0 top-0 h-full w-full bg-black/30" />
	<div class="z-50 rounded bg-background p-5">
		<Loader />
	</div>
</div>
