<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<div style="min-height: 600px; padding: 40px; position: relative;">
  {#if children}
    {@render children()}
  {/if}
</div>

