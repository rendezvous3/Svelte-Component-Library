<script lang="ts">
  // Use the Svelte 5 way. It's much cleaner for AI to parse.
  let { label = 'Default', primary = false, onclick } = $props();
</script>

<button 
  class={primary ? 'bg-blue-500 text-white' : 'bg-gray-200'}
  onclick={onclick}
>
  {label}
</button>

<style>
  button {
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: filter 0.2s;
  }
  button:hover {
    filter: brightness(0.9);
  }
</style>