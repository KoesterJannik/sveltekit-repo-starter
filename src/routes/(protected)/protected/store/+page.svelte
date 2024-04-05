<script>
	export let data;
</script>

<div class="grid grid-cols-3">
	{#each data.products as product}
		<form method="post" action="?/buyProduct">
			<div>{product.name}</div>
			<div>{product.price}</div>
			{product.description}
			<input type="hidden" name="productId" value={product.id} />
			<button type="submit">Buy</button>
		</form>
	{/each}
</div>
