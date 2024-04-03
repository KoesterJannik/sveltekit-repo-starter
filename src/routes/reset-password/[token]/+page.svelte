<script lang="ts">
	import Button from '../../../lib/components/ui/button/button.svelte';
	import Input from '../../../lib/components/ui/input/input.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<form method="post" class="mx-auto flex w-full max-w-xl flex-col gap-2">
	<Input type="password" name="password" placeholder="New password" required />
	<input type="hidden" name="token" value={data.token} />
	<Button type="submit">Reset password</Button>
</form>
