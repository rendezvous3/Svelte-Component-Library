<script lang="ts">
  export let label = "";
  export let type = "text";
  export let name = "";
  export let placeholder = "";
  export let value = "";
  export let helper = "";
  export let autocomplete = "";
  export let required = false;
  export let disabled = false;
  export let error = "";
</script>

<label class="block space-y-3 text-sm text-slate-200">
  {#if label}
    <span class="text-[0.7rem] uppercase tracking-[0.22em] text-slate-400">{label}</span>
  {/if}
  <div class="relative">
    <div class="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
      <slot name="icon" />
    </div>
    <input
      class="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-12 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300/20"
      {type}
      {name}
      {placeholder}
      {autocomplete}
      {required}
      {disabled}
      bind:value
    />
  </div>
  {#if error}
    <p class="text-xs text-rose-300">{error}</p>
  {:else if helper}
    <p class="text-xs text-slate-500">{helper}</p>
  {/if}
</label>
