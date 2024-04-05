<script>
	import Button from '../../../../../lib/components/ui/button/button.svelte';
	import Card from '../../../../../lib/components/ui/card/card.svelte';
</script>

<Card
	class="mx-auto w-full max-w-sm rounded-lg border  text-card-foreground shadow-sm"
	data-v0-t="card"
>
	<div class="flex flex-col items-center space-y-0 p-6">
		<h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-primary">
			Payment successful
		</h3>
		<p class="pt-6 text-sm text-primary">Thanks for buying our product.</p>
	</div>

	<div class="flex items-center p-6">
		<Button class="mx-auto ">
			<a href="/protected/bought-products"> Go to your Products </a>
		</Button>
	</div>
</Card>
