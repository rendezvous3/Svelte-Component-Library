<script lang="ts">
  import DashboardShellV3 from "./DashboardShellV3.svelte";
</script>

<DashboardShellV3 pageTitle="Dashboard V3">
  <div class="space-y-4">
    <div class="rounded-xl border border-white/[0.07] bg-[#111111] px-5 py-4">
      <p class="text-sm text-[#737373]">
        DashboardShellV3 provides a page title header and a max-w-7xl content area on a dark background.
      </p>
    </div>
    <div class="grid grid-cols-3 gap-4">
      {#each ["Card A", "Card B", "Card C"] as label}
        <div class="rounded-xl border border-white/[0.07] bg-[#111111] px-5 py-8 text-center text-sm text-[#737373]">
          {label}
        </div>
      {/each}
    </div>
  </div>
</DashboardShellV3>
