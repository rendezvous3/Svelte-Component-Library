<script lang="ts">
  import AuthShellV2 from "./AuthShellV2.svelte";
  import AuthFieldV2 from "./AuthFieldV2.svelte";
  import AuthButtonV2 from "./AuthButtonV2.svelte";

  let email = "";
  let password = "";
</script>

<AuthShellV2 title="Auth V2" subtitle="New auth direction used by app routes.">
  <form class="space-y-4">
    <AuthFieldV2 label="Email" type="email" name="email" placeholder="you@email.com" bind:value={email} />
    <AuthFieldV2 label="Password" type="password" name="password" placeholder="Your password" bind:value={password} />
    <AuthButtonV2 type="button">Log In</AuthButtonV2>
  </form>
</AuthShellV2>
