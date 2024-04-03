<script>
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
	import { onMount } from 'svelte';
	import Button from '../ui/button/button.svelte';
	let showCookieBanner = false;

	onMount(() => {
		const state = localStorage.getItem('accepted-cookies');
		if (!state) {
			showCookieBanner = true;
		}
	});

	function onAccept() {
		localStorage.setItem('accepted-cookies', 'ACCEPTED');
		showCookieBanner = false;
	}
	function onDecline() {
		localStorage.setItem('accepted-cookies', 'DECLINED');
		showCookieBanner = false;
	}
</script>

<AlertDialog.Root bind:open={showCookieBanner}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>We are using cookies</AlertDialog.Title>
			<AlertDialog.Description>
				We are using cookies to improve the user experience and keep track of user sessions if the
				login. By using this website, you agree to our use of cookies.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<Button on:click={onAccept} size="sm">Accept all</Button>
			<Button on:click={onDecline} variant="outline" size="sm">Decline all</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
