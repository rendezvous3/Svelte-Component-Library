<script lang="ts">
  export let type: "button" | "submit" | "reset" = "button";
  export let disabled = false;
  export let loading = false;
</script>

<button
  class={`inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
    disabled
      ? "cursor-not-allowed border border-white/[0.07] bg-[#141414] text-[#525252]"
      : "border border-white/[0.15] bg-[#1f1f1f] text-[#f5f5f5] hover:border-white/25 hover:bg-[#2a2a2a]"
  }`}
  {type}
  {disabled}
>
  {#if loading}
    <span
      class={`h-4 w-4 animate-spin rounded-full border-2 border-t-transparent ${disabled ? "border-[#525252]" : "border-[#0a0a0a]"}`}
    ></span>
  {/if}
  <slot />
</button>
