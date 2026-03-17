<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  export let label = "";
  export let type = "text";
  export let name = "";
  export let placeholder = "";
  export let value = "";
  export let helper = "";
  export let autocomplete: HTMLInputAttributes["autocomplete"] = undefined;
  export let required = false;
  export let disabled = false;
  export let error = "";
  export let invalid = false;
  export let inputmode: HTMLInputAttributes["inputmode"] = undefined;
</script>

<label class="block space-y-2.5 text-sm text-slate-200">
  {#if label}
    <span class="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</span>
  {/if}

  <div
    class={`relative overflow-hidden rounded-2xl border bg-[#202621] transition ${
      invalid
        ? "border-rose-500/80 ring-2 ring-rose-500/20"
        : "border-white/15 focus-within:border-lime-300 focus-within:ring-2 focus-within:ring-lime-300/20"
    }`}
  >
    <div class="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
      <slot name="icon" />
    </div>
    <input
      class="w-full bg-transparent py-3.5 pl-12 pr-4 text-base text-slate-100 placeholder:text-slate-500 focus:outline-none"
      {type}
      {name}
      {placeholder}
      {autocomplete}
      {required}
      {disabled}
      {inputmode}
      bind:value
    />
  </div>

  {#if error}
    <p class="text-xs text-rose-300">{error}</p>
  {:else if helper}
    <p class={`text-xs ${invalid ? "text-rose-300" : "text-slate-500"}`}>{helper}</p>
  {/if}
</label>
