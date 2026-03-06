<script lang="ts">
  export let title = "";
  export let subtitle = "";
</script>

<div class="relative min-h-screen overflow-hidden bg-[#070a07] text-slate-100">
  <div
    class="pointer-events-none absolute inset-0 opacity-60"
    style="background-image: radial-gradient(1000px 480px at 75% 24%, rgba(175, 255, 94, 0.12), transparent 60%), radial-gradient(900px 560px at 12% 70%, rgba(74, 92, 64, 0.15), transparent 60%);"
  ></div>
  <div
    class="pointer-events-none absolute inset-0 opacity-18"
    style="background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 34px 34px;"
  ></div>

  <div class="relative mx-auto w-full max-w-7xl px-6 py-10">
    <div class="mb-8">
      {#if title}
        <h1 class="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">{title}</h1>
      {/if}
      {#if subtitle}
        <p class="mt-2 text-sm text-slate-300 sm:text-base">{subtitle}</p>
      {/if}
    </div>
    <slot />
  </div>
</div>
