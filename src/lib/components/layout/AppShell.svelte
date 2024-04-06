<script lang="ts">
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import Search from 'lucide-svelte/icons/search';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	import { siteData } from '../../../siteData';
	import { page } from '$app/stores';
	import LightSwitch from './LightSwitch.svelte';
	import { currentUser, setCurrentUser } from '../../stores/user';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { PageLoader } from '../ui/loader';

	let loading = false;
</script>

{#if loading}
	<PageLoader />
{/if}

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<div class="hidden border-r bg-muted/40 md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/" class="flex items-center gap-2 font-semibold">
					<Package2 class="h-6 w-6" />
					<span class="">{siteData?.appShellTitle}</span>
				</a>
				<div class="ml-auto">
					<LightSwitch />
				</div>
			</div>
			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					{#each siteData?.dashboardLinks as link}
						{#if $currentUser?.roles.includes(link.needsRole)}
							<a
								href={link.href}
								class={`flex items-center gap-3 rounded-lg px-3 py-2 ${$page.url.pathname == link.href ? 'text-primary' : 'text-muted-foreground '} transition-all hover:text-primary`}
							>
								<svelte:component this={link.icon} class="h-4 w-4" />
								{link.name}
							</a>
						{/if}
					{/each}
				</nav>
			</div>
			<div class="mt-auto p-4"></div>
		</div>
	</div>
	<div class="z-10 flex flex-col">
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
						<Menu class="h-5 w-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="flex flex-col">
					<nav class="grid gap-2 text-lg font-medium">
						<a href="/protected/dashboard" class="flex items-center gap-2 text-lg font-semibold">
							<Package2 class="h-6 w-6" />
							<span class="sr-only">{siteData?.appShellTitle}</span>
						</a>
						{#each siteData?.dashboardLinks as link}
							{#if $currentUser?.roles.includes(link.needsRole)}
								<a
									href={link.href}
									class={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${$page.url.pathname == link.href ? 'text-primary' : 'text-muted-foreground '} `}
								>
									<svelte:component this={link.icon} class="h-5 w-5" />
									{link.name}
								</a>
							{/if}
						{/each}
					</nav>
					<div class="mt-auto"></div>
				</Sheet.Content>
			</Sheet.Root>
			<div class=" w-full flex-1">
				<form class="hidden">
					<div class="relative">
						<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search products..."
							class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
						/>
					</div>
				</form>
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
						<CircleUser class="h-5 w-5" />
						<span class="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>{$currentUser?.email}</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<a href="/protected/settings">
						<DropdownMenu.Item>Settings</DropdownMenu.Item>
					</a>

					<DropdownMenu.Separator />
					<form
						method="post"
						action="/protected/logout"
						use:enhance={() => {
							return async ({ result, update }) => {
								loading = true;
								try {
									if (result.status === 200) {
										await setCurrentUser(null);
										await goto('/');
									} else {
										toast.error('There was an error logging you out. Please try again later.');
									}
								} finally {
									update();
									loading = false;
								}
							};
						}}
					>
						<DropdownMenu.Item>
							<button type="submit" class="h-full w-full"> Logout </button>
						</DropdownMenu.Item>
					</form>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</header>
		<main class=" -z-10 flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			<slot />
		</main>
	</div>
</div>
