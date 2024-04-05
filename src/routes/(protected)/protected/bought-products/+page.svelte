<script>
	import Button from '../../../../lib/components/ui/button/button.svelte';
	import { Card } from '../../../../lib/components/ui/card';

	export let data;
</script>

<div class="flex flex-wrap gap-4">
	{#each data.boughtProducts as product}
		<Card class="rounded-lg border text-foreground shadow-sm" data-v0-t="card">
			<div class="p-6">
				<div class="grid gap-2">
					<h2 class="text-xl font-bold">{product?.product?.name}</h2>
					<p class="text-sm leading-none">{product?.product?.description}</p>
					<p class="text-sm leading-none">{product?.product?.price}$</p>
				</div>
			</div>
			<div class="flex items-center p-6">
				<Button>Some action here for the product</Button>
			</div>
		</Card>
	{/each}
</div>
