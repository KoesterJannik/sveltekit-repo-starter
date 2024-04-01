<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>Sign In</h1>
<form method="post" use:enhance>
	<label for="email">Email</label>
	<input name="email" id="email" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" minlength="6" /><br />
	<button>Continue</button>
</form>
