<script>
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index';

	import Button from '../ui/button/button.svelte';
	import Label from '../ui/label/label.svelte';
	import Input from '../ui/input/input.svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { Loader2 } from 'lucide-svelte';
	import { Loader } from '../ui/loader';
	export let showDialog = false;
	let loading = false;
</script>

<AlertDialog.Root bind:open={showDialog}>
	<AlertDialog.Content>
		<form
			class="space-y-4"
			method="post"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				loading = true;
				return async ({ result, update }) => {
					try {
						if (result.status === 200) {
							// `result` is an `ActionResult` object
							// @ts-ignore
							toast.success(result?.data?.message);
							showDialog = false;
							// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
						} else {
							toast.error('An error occurred. Please try again later.');
						}
					} finally {
						loading = false;
						update();
					}
				};
			}}
			action="/signin?/resetPassword"
		>
			<AlertDialog.Header>
				<AlertDialog.Title>Reset your password</AlertDialog.Title>
				<AlertDialog.Description>
					You will receive a link to reset your password. This one is valid for 2 hours.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<div class=" grid gap-2">
				<Label for="email">Email</Label>
				<Input name="email" type="email" placeholder="youremail@example.com" required />
			</div>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<Button type="submit" size="sm">
					{#if loading}
						<Loader />
					{:else}
						Reset Password
					{/if}
				</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
