<script>
	import LightSwitch from '../lib/components/layout/LightSwitch.svelte';
	import Button from '../lib/components/ui/button/button.svelte';
	import Input from '../lib/components/ui/input/input.svelte';
	import { siteData } from '../siteData';
</script>

<div class="bg-muted/40">
	<div class="">
		<header class="absolute inset-x-0 top-0 z-50">
			<nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
				<div class="flex lg:flex-1">
					<a href="/" class="-m-1.5 p-1.5">
						<span class="sr-only">{siteData?.landingHeaderTitle}</span>
						<img class="h-8 w-auto" src={siteData?.landingHeaderIconUrl} alt="" />
					</a>
				</div>

				<div class="flex gap-x-12">
					{#each siteData.landingLinks as link}
						<a href={link.href} class="text-sm font-semibold leading-6 text-primary">{link.name}</a>
					{/each}
				</div>
				<div class="flex lg:flex-1 lg:justify-end">
					<LightSwitch />
				</div>
			</nav>
		</header>

		<div class="relative isolate px-6 pt-14 lg:px-8">
			<div
				class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
				aria-hidden="true"
			>
				<div
					class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 dark:from-[#29151d] dark:to-[#000000] sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
					style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
				></div>
			</div>
			<div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
				<div class="hidden sm:mb-8 sm:flex sm:justify-center">
					<div
						class="relative rounded-full px-3 py-1 text-sm leading-6 text-primary ring-1 ring-primary/10 hover:ring-primary/20"
					>
						Announcing our next round of funding.
					</div>
				</div>
				<div class="text-center">
					<h1 class="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
						Data to enrich your online business
					</h1>
					<p class="mt-6 text-lg leading-8 text-primary">
						Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
						commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
					</p>
					<div class="mt-10 flex items-center justify-center gap-x-6">
						<Button>
							<a href="/signup">Get started</a>
						</Button>
					</div>
				</div>
			</div>
			<div
				class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
				aria-hidden="true"
			>
				<div
					class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
					style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
				></div>
			</div>
		</div>
	</div>

	<div class="">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl lg:text-center">
				<h2 class="text-base font-semibold leading-7 text-primary">Deploy faster</h2>
				<p class="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
					Everything you need to deploy your app
				</p>
				<p class="mt-6 text-lg leading-8 text-primary">
					Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas
					a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.
				</p>
			</div>
			<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
				<dl
					class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
				>
					<div class="relative pl-16">
						<dt class="text-base font-semibold leading-7 text-primary">
							<div
								class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary"
							>
								<svg
									class="h-6 w-6 text-white dark:text-black"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
									/>
								</svg>
							</div>
							Push to deploy
						</dt>
						<dd class="mt-2 text-base leading-7 text-primary">
							Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio
							urna massa nunc massa.
						</dd>
					</div>
					<div class="relative pl-16">
						<dt class="text-base font-semibold leading-7 text-primary">
							<div
								class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary"
							>
								<svg
									class="h-6 w-6 text-white dark:text-black"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
									/>
								</svg>
							</div>
							SSL certificates
						</dt>
						<dd class="mt-2 text-base leading-7 text-primary">
							Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales
							gravida quam turpis enim lacus amet.
						</dd>
					</div>
					<div class="relative pl-16">
						<dt class="text-base font-semibold leading-7 text-primary">
							<div
								class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary"
							>
								<svg
									class="h-6 w-6 text-white dark:text-black"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
									/>
								</svg>
							</div>
							Simple queues
						</dt>
						<dd class="mt-2 text-base leading-7 text-primary">
							Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor
							congue commodo diam neque.
						</dd>
					</div>
					<div class="relative pl-16">
						<dt class="text-base font-semibold leading-7 text-primary">
							<div
								class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary"
							>
								<svg
									class="h-6 w-6 text-white dark:text-black"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
									/>
								</svg>
							</div>
							Advanced security
						</dt>
						<dd class="mt-2 text-base leading-7 text-primary">
							Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id
							hac maecenas ac donec pharetra eget.
						</dd>
					</div>
				</dl>
			</div>
		</div>
	</div>
	<div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
		<div
			class="mt-16 border-t border-primary/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between"
		>
			<div>
				<h3 class="text-sm font-semibold leading-6 text-primary">Subscribe to our newsletter</h3>
				<p class="mt-2 text-sm leading-6 text-primary">
					The latest news, articles, and resources, sent to your inbox weekly.
				</p>
			</div>
			<form class="mt-6 sm:flex sm:max-w-md lg:mt-0">
				<label for="email-address" class="sr-only">Email address</label>
				<Input
					type="email"
					name="email-address"
					id="email-address"
					autocomplete="email"
					required
					class="w-full min-w-0 appearance-none rounded-md border-0 px-3 py-1.5 text-base text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-56 sm:text-sm sm:leading-6"
					placeholder="Enter your email"
				/>
				<div class="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
					<Button
						type="submit"
						class="flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold "
						>Subscribe</Button
					>
				</div>
			</form>
		</div>
	</div>
	<footer class="" aria-labelledby="footer-heading">
		<h2 id="footer-heading" class="sr-only">Footer</h2>
		<div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
			<div class="xl:grid xl:grid-cols-1 xl:gap-8">
				<img class="h-7" src={siteData?.landingHeaderIconUrl} alt="Company name" />
				<div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
					<div class="md:grid md:grid-cols-2 md:gap-8">
						<div class="hidden"></div>
						<div class="mt-10 hidden md:mt-0"></div>
					</div>
					<div class="md:grid md:grid-cols-2 md:gap-8">
						<div class="hidden"></div>
						<div class="mt-10 md:mt-0">
							<h3 class="text-sm font-semibold leading-6 text-primary">Legal</h3>
							<ul role="list" class="mt-6 space-y-4">
								{#each siteData.footerLinks.legal as link}
									<li>
										<a href={link.href} class="text-sm leading-6 text-primary hover:text-primary"
											>{link.name}</a
										>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-8 border-t border-primary/10 pt-8 md:flex md:items-center md:justify-between">
				<div class="flex space-x-6 md:order-2"></div>
				<p class="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
					{siteData.copyRightFooter.text}
				</p>
			</div>
		</div>
	</footer>
</div>
