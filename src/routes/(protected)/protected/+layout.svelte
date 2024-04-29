<script lang="ts">
	import AppShell from '../../../lib/components/layout/AppShell.svelte';
	import type { User } from '@prisma/client';
	export let data: { user: User };
</script>

<AppShell user={data?.user}>
	<slot />
</AppShell>
