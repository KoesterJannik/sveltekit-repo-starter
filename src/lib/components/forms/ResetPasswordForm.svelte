<script>
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index';

	import Button from '../ui/button/button.svelte';
	import Label from '../ui/label/label.svelte';
	import Input from '../ui/input/input.svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	export let showDialog = false;
</script>

<AlertDialog.Root bind:open={showDialog}>
	<AlertDialog.Content>
		<form
			method="post"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				return async ({ result, update }) => {
					// `result` is an `ActionResult` object
					// @ts-ignore
					toast.success(result?.data?.message);
					showDialog = false;
					// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
					update();
				};
			}}
			action="/signin?/resetPassword"
		>
			<AlertDialog.Header>
				<AlertDialog.Title>Reset your password</AlertDialog.Title>
				<AlertDialog.Description>
					You will receive a link to reset your password. This one is valid for 2 hours.
				</AlertDialog.Description>
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input name="email" type="email" placeholder="youremail@example.com" required />
				</div>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<Button type="submit" size="sm">Reset Password</Button>
			</AlertDialog.Footer>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
