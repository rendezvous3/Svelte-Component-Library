<script lang="ts">
  export let title = "";
  export let subtitle = "";
</script>

<div class="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
  <div class="flex min-h-screen flex-col items-center justify-center px-4 py-16">
    <div class="w-full max-w-[440px] space-y-8">
      <slot name="logo" />

      {#if title || subtitle}
        <div class="space-y-2 text-center">
          {#if title}
            <h1 class="text-3xl font-semibold tracking-tight text-white">{title}</h1>
          {/if}
          {#if subtitle}
            <p class="text-sm text-[#737373]">{subtitle}</p>
          {/if}
        </div>
      {/if}

      <slot />
    </div>
  </div>
</div>
