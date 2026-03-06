<script lang="ts">
  export let title = "";
  export let subtitle = "";
  export let cardClass = "";
</script>

<div class="relative min-h-screen overflow-hidden bg-[#070a07] text-slate-100">
  <div
    class="pointer-events-none absolute inset-0 opacity-70"
    style="background-image: radial-gradient(1100px 560px at 78% 26%, rgba(175, 255, 94, 0.16), transparent 60%), radial-gradient(900px 620px at 12% 72%, rgba(74, 92, 64, 0.2), transparent 60%);"
  ></div>
  <div
    class="pointer-events-none absolute inset-0 opacity-25"
    style="background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 34px 34px;"
  ></div>

  <div class="relative mx-auto grid min-h-[calc(100vh-68px)] w-full max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
    <section class="space-y-6">
      {#if title}
        <h1 class="max-w-2xl text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
          {title}
        </h1>
      {/if}
      {#if subtitle}
        <p class="max-w-xl text-base leading-relaxed text-slate-300 sm:text-xl">{subtitle}</p>
      {/if}
      <slot name="hero" />
    </section>

    <section class="flex w-full justify-center lg:justify-end">
      <div class={`w-full max-w-xl rounded-3xl border border-white/15 bg-[#151a16]/80 p-6 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)] backdrop-blur ${cardClass}`}>
        <slot />
      </div>
    </section>
  </div>
</div>
