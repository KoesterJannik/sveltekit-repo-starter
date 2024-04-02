<script>
	import AppShell from '../../../lib/components/layout/AppShell.svelte';
	export let data;
</script>

<AppShell user={data?.user}>
	<slot />
</AppShell>
