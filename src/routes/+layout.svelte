<script>
	import '../app.pcss';
	import CookieBanner from '../lib/components/policy/CookieBanner.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<slot />
<CookieBanner />
<Toaster />
