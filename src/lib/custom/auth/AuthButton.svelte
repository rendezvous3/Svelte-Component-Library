<script lang="ts">
  export let type: "button" | "submit" | "reset" = "button";
  export let disabled = false;
  export let loading = false;
</script>

<button
  class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-lime-300 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-60"
  {type}
  {disabled}
>
  {#if loading}
    <span class="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent"></span>
  {/if}
  <slot />
</button>
