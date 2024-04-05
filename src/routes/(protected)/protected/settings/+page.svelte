<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import { Checkbox } from '$lib/components/ui/checkbox/index';

	import { Input } from '$lib/components/ui/input/index';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { message } from 'sveltekit-superforms';

	export let data;
</script>

<main
	class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
>
	<div class="mx-auto grid w-full max-w-6xl gap-2">
		<h1 class="text-3xl font-semibold">Settings</h1>
	</div>
	<div
		class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
	>
		<nav class="grid gap-4 text-sm text-muted-foreground"></nav>
		<div class="grid gap-6">
			<Card.Root>
				<Card.Header>
					<Card.Title>Your Settings</Card.Title>
					<Card.Description>Here you can manage your account data</Card.Description>
				</Card.Header>
				<form
					method="POST"
					use:enhance={({ formElement, formData, action, cancel, submitter }) => {
						// `formElement` is this `<form>` element
						// `formData` is its `FormData` object that's about to be submitted
						// `action` is the URL to which the form is posted
						// calling `cancel()` will prevent the submission
						// `submitter` is the `HTMLElement` that caused the form to be submitted

						return async ({ result, update }) => {
							// `result` is an `ActionResult` object
							// @ts-ignore
							toast.success(result?.data?.message);
							// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
							update();
						};
					}}
				>
					<Card.Content class="flex flex-col flex-wrap gap-4">
						<Input
							class="w-full max-w-lg"
							placeholder="yourmail@example.com"
							disabled
							value={data?.user?.email}
						/>
						<Input
							type="password"
							class="w-full max-w-lg"
							placeholder="oldPassword"
							name="oldPassword"
							required
						/>
						<Input
							type="password"
							class="w-full max-w-lg"
							placeholder="newPassword"
							required
							name="newPassword"
						/>
					</Card.Content>
					<Card.Footer class="border-t px-6 py-4">
						<Button type="submit" variant="outline">Save</Button>
					</Card.Footer>
				</form>
			</Card.Root>
		</div>
	</div>
</main>
