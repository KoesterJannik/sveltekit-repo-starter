<script>
	import '../app.pcss';
	import CookieBanner from '../lib/components/policy/CookieBanner.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { navigating } from '$app/stores';
	import { PageLoader } from '$lib/components/ui/loader';
</script>

{#if !!$navigating}
	<PageLoader />
{/if}

<ModeWatcher />
<slot />
<CookieBanner />
<Toaster />
