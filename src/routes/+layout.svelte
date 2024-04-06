<script>
	import '../app.pcss';
	import CookieBanner from '../lib/components/policy/CookieBanner.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { navigating, page } from '$app/stores';
	import { PageLoader } from '$lib/components/ui/loader';
	import { onMount } from 'svelte';
	import { setCurrentUser } from '$lib/stores/user';
	import { toast } from 'svelte-sonner';

	export let data;

	let url = $page.url;

	$: {
		url = $page.url;

		let message = url.searchParams.get('message');

		if (message) {
			toast.info(message);
		}
	}

	let loading = true;

	onMount(() => {
		setCurrentUser(data?.user || null);
		loading = false;
	});
</script>

{#if !!$navigating || loading}
	<PageLoader />
{/if}

<ModeWatcher />
{#if !loading}
	<slot />
{/if}
<CookieBanner />
<Toaster richColors />
