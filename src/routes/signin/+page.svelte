<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import ExclamationTriangle from 'svelte-radix/ExclamationTriangle.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { enhance } from '$app/forms';
	import ResetPasswordForm from '$lib/components/forms/ResetPasswordForm.svelte';
	export let form;
	let showResetForm = false;
</script>

<div class="min-h-screen">
	<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
		<div class="flex items-center justify-center py-12">
			<div class="mx-auto grid w-[350px] gap-6">
				<div class="grid gap-2 text-center">
					<h1 class="text-3xl font-bold">Login</h1>
					<p class="text-balance text-muted-foreground">
						Enter your credentials below to login to your account
					</p>
				</div>
				<div class="grid gap-4">
					<form method="post" use:enhance action="?/login" class="space-y-4">
						<div class="grid gap-2">
							<Label for="email">Email</Label>
							<Input name="email" type="email" placeholder="m@example.com" required />
						</div>
						<div class="grid gap-2">
							<div class="flex items-center">
								<Label for="password">Password</Label>
								<button
									on:click={() => (showResetForm = true)}
									type="button"
									class="ml-auto inline-block text-sm underline"
								>
									Forgot your password?
								</button>
							</div>
							<Input name="password" type="password" minlength={6} required placeholder="******" />
						</div>
						<Button type="submit" class="my-2 w-full">Login</Button>
						{#if form?.message}
							<Alert.Root variant="default">
								<ExclamationTriangle class="h-4 w-4" />
								<Alert.Title>Info</Alert.Title>
								<Alert.Description>{form?.message}.</Alert.Description>
							</Alert.Root>
						{/if}
					</form>
				</div>
				<div class="mt-4 text-center text-sm">
					Need an account?
					<a href="/signup" class="underline"> Sign Up </a>
				</div>
			</div>
		</div>
		<div class="hidden bg-muted lg:block">
			<img
				src="/favicon.png"
				alt="placeholder"
				width="1920"
				height="1080"
				class="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
			/>
		</div>
	</div>
</div>

<ResetPasswordForm bind:showDialog={showResetForm} />
