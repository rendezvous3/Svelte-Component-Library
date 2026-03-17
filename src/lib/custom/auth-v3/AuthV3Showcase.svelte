<script lang="ts">
  import AuthShellV3 from "./AuthShellV3.svelte";
  import AuthFieldV3 from "./AuthFieldV3.svelte";
  import AuthButtonV3 from "./AuthButtonV3.svelte";
</script>

<AuthShellV3 title="Welcome back" subtitle="Sign in to your account">
  <form class="space-y-4">
    <AuthFieldV3 label="Email" name="email" type="email" placeholder="you@example.com" required />
    <AuthFieldV3 label="Password" name="password" type="password" placeholder="Enter your password" required />
    <AuthFieldV3 label="With error" name="demo-error" type="text" placeholder="This field has an error" error="This field is required" invalid />
    <AuthButtonV3 type="button">Sign in</AuthButtonV3>
    <AuthButtonV3 type="button" disabled>Disabled state</AuthButtonV3>
    <AuthButtonV3 type="button" loading>Loading...</AuthButtonV3>
  </form>
</AuthShellV3>
