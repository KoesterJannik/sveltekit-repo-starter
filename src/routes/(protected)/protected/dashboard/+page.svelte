<script lang="ts">
	import { currentUser } from '$lib/stores/user';
</script>

<p>Hello <b>{$currentUser?.email}</b></p>
