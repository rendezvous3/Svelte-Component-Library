<script lang="ts">
  import AuthLayout from "./AuthLayout.svelte";
  import AuthField from "./AuthField.svelte";
  import AuthButton from "./AuthButton.svelte";

  let name = "";
  let email = "";
</script>

<AuthLayout title="Auth V1 Reference" subtitle="Legacy auth styling kept for comparison and fallback.">
  <div class="space-y-4">
    <AuthField label="Name" name="name" placeholder="Your name" bind:value={name} />
    <AuthField label="Email" name="email" type="email" placeholder="you@email.com" bind:value={email} />
    <AuthButton type="button">Continue</AuthButton>
  </div>
</AuthLayout>
