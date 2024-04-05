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
			Payment failed
		</h3>
		<p class="pt-6 text-sm text-primary">
			Something went wrong while processing your payment. Try it again or contact the support.
		</p>
	</div>

	<div class="flex items-center p-6">
		<Button class="mx-auto ">
			<a href="/protected/store"> Back to store </a>
		</Button>
	</div>
</Card>
