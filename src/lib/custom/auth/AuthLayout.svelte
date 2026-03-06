<script lang="ts">
  export let title = "";
  export let subtitle = "";
  export let showCard = true;
</script>

<div class="relative min-h-screen overflow-hidden bg-[#0b0d0a] text-slate-100">
  <div
    class="pointer-events-none absolute inset-0 opacity-70"
    style="background-image: radial-gradient(800px 400px at 75% 30%, rgba(190, 255, 80, 0.18), transparent 60%), radial-gradient(700px 500px at 20% 60%, rgba(98, 111, 81, 0.22), transparent 60%);"
  ></div>
  <div
    class="pointer-events-none absolute inset-0 opacity-20"
    style="background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 32px 32px;"
  ></div>

  <div class="relative mx-auto grid min-h-screen w-full max-w-6xl gap-10 px-6 py-12 lg:grid-cols-2 lg:items-center">
    <section class="space-y-6">
      {#if title}
        <h1 class="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
          {title}
        </h1>
      {/if}
      {#if subtitle}
        <p class="max-w-md text-sm text-slate-300 sm:text-base">{subtitle}</p>
      {/if}
      <slot name="hero" />
    </section>

    {#if showCard}
      <section class="flex w-full justify-center lg:justify-end">
        <div class="w-full max-w-md">
          <div class="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
            <slot />
          </div>
        </div>
      </section>
    {/if}
  </div>
</div>
