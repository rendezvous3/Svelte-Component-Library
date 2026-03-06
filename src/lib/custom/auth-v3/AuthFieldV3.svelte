<style>
  /* Override browser autofill background with a large inset shadow */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #141414 inset !important;
    -webkit-text-fill-color: #f5f5f5 !important;
    caret-color: #f5f5f5;
  }
</style>

<script lang="ts">
  export let label = "";
  export let type = "text";
  export let name = "";
  export let placeholder = "";
  export let value = "";
  export let helper = "";
  export let error = "";
  export let autocomplete = "";
  export let required = false;
  export let inputmode = "";
  export let invalid = false;

  let showPassword = false;
  $: resolvedType = type === "password" && showPassword ? "text" : type;
  $: hasError = !!error || invalid;
</script>

<div class="space-y-1.5">
  {#if label}
    <div class="flex items-center justify-between">
      <label class="text-sm text-[#a3a3a3]" for={name}>{label}</label>
      <slot name="right-link" />
    </div>
  {/if}

  <div class="relative">
    <input
      id={name}
      class={`w-full rounded-xl border bg-[#141414] px-3.5 py-3 text-sm text-[#f5f5f5] placeholder:text-[#3f3f3f] transition focus:outline-none focus:ring-2 ${
        hasError
          ? "border-rose-500/60 focus:border-rose-500/60 focus:ring-rose-500/10"
          : "border-white/[0.08] focus:border-white/30 focus:ring-white/5"
      } ${type === "password" ? "pr-10" : ""}`}
      type={resolvedType}
      {name}
      {placeholder}
      {autocomplete}
      {required}
      inputmode={inputmode || undefined}
      bind:value
    />

    {#if type === "password"}
      <button
        type="button"
        class="absolute inset-y-0 right-3 flex cursor-pointer items-center text-[#525252] transition hover:text-[#a3a3a3]"
        tabindex="-1"
        aria-label={showPassword ? "Hide password" : "Show password"}
        on:click={() => (showPassword = !showPassword)}
      >
        {#if showPassword}
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        {:else}
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        {/if}
      </button>
    {/if}
  </div>

  {#if error}
    <p class="text-xs text-rose-400">{error}</p>
  {:else if helper}
    <p class="text-xs text-[#525252]">{helper}</p>
  {/if}
</div>
