<script lang="ts">
  export let title = "";
  export let subtitle = "";
</script>

<section class="rounded-2xl border border-white/10 bg-[#151a16]/80 p-6 backdrop-blur">
  {#if title}
    <h3 class="text-xs uppercase tracking-[0.26em] text-slate-400">{title}</h3>
  {/if}
  {#if subtitle}
    <p class="mt-2 text-sm text-slate-400">{subtitle}</p>
  {/if}
  <div class="mt-4">
    <slot />
  </div>
</section>
