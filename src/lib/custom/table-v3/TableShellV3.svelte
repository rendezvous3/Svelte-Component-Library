<script lang="ts">
  export let title = "";
  export let count: number | null = null;
  export let search = "";
</script>

<div class="space-y-4">
  <div class="flex items-center justify-between gap-4">
    <div class="flex items-center gap-3">
      {#if title}
        <h2 class="text-sm font-medium text-[#f5f5f5]">{title}</h2>
      {/if}
      {#if count !== null}
        <span class="rounded-md bg-[#1f1f1f] px-2 py-0.5 text-xs text-[#737373]">{count}</span>
      {/if}
    </div>

    <div class="flex items-center gap-3">
      <div class="relative">
        <input
          class="rounded-lg border border-white/[0.07] bg-[#141414] py-1.5 pl-8 pr-3 text-sm text-[#f5f5f5] placeholder:text-[#3f3f3f] focus:border-white/[0.15] focus:outline-none"
          type="search"
          placeholder="Search..."
          bind:value={search}
        />
        <svg
          class="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#737373]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <slot name="actions" />
    </div>
  </div>

  <slot />

  {#if $$slots.footer}
    <div class="flex justify-end">
      <slot name="footer" />
    </div>
  {/if}
</div>
