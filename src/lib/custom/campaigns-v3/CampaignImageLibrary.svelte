<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let images: Array<{ name: string; url: string }> = [];
  export let uploading: boolean = false;

  const dispatch = createEventDispatcher<{ upload: File; delete: string }>();

  let fileInput: HTMLInputElement;
  let copiedTagIndex: number | null = null;
  let copiedUrlIndex: number | null = null;
  let previewUrl: string | null = null;

  function triggerUpload() {
    fileInput.click();
  }

  function onFileChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      dispatch("upload", file);
      fileInput.value = "";
    }
  }

  async function copyTag(url: string, index: number) {
    await navigator.clipboard.writeText(`<img src="${url}" alt="">`);
    copiedTagIndex = index;
    setTimeout(() => { copiedTagIndex = null; }, 2000);
  }

  async function copyUrl(url: string, index: number) {
    await navigator.clipboard.writeText(url);
    copiedUrlIndex = index;
    setTimeout(() => { copiedUrlIndex = null; }, 2000);
  }

  function openPreview(url: string) {
    previewUrl = url;
  }

  function closePreview() {
    previewUrl = null;
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") closePreview();
  }
</script>

<svelte:window on:keydown={onKeydown} />

<div class="rounded-xl border border-white/[0.07] bg-[#111111]">
  <!-- Header -->
  <div class="flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
    <span class="text-sm font-medium text-[#f5f5f5]">Images</span>
    <button
      type="button"
      on:click={triggerUpload}
      disabled={uploading}
      class="cursor-pointer rounded-lg border border-white/[0.07] bg-[#1f1f1f] px-3 py-1.5 text-xs font-medium text-[#f5f5f5] transition hover:border-white/[0.15] disabled:cursor-not-allowed disabled:text-[#525252]"
    >
      {uploading ? "Uploading…" : "Upload image"}
    </button>
    <input
      bind:this={fileInput}
      type="file"
      accept="image/*"
      class="hidden"
      on:change={onFileChange}
    />
  </div>

  <!-- Image list -->
  <div class="divide-y divide-white/[0.05]">
    {#if images.length === 0}
      <div class="px-5 py-4 text-xs text-[#525252]">
        No images yet. Upload to get started.
      </div>
    {:else}
      {#each images as image, i}
        <div class="flex items-center gap-3 px-5 py-3">
          <!-- Thumbnail — click to preview -->
          <button
            type="button"
            on:click={() => openPreview(image.url)}
            class="shrink-0 cursor-pointer"
            title="Preview image"
          >
            <img src={image.url} alt={image.name} class="h-10 w-10 rounded object-cover transition hover:opacity-80" />
          </button>

          <!-- Filename -->
          <span class="w-[140px] shrink-0 truncate text-xs text-[#737373]">{image.name}</span>

          <!-- Full img tag -->
          <span class="min-w-0 flex-1 font-mono text-xs text-[#525252]">
            {`<img src="${image.url}" alt="">`}
          </span>

          <!-- Copy tag -->
          <button
            type="button"
            on:click={() => copyTag(image.url, i)}
            class="shrink-0 cursor-pointer rounded border border-white/[0.07] bg-[#141414] px-2.5 py-1.5 text-xs text-[#f5f5f5] transition hover:border-white/[0.15]"
          >
            {copiedTagIndex === i ? "Copied!" : "Copy tag"}
          </button>

          <!-- Copy URL -->
          <button
            type="button"
            on:click={() => copyUrl(image.url, i)}
            class="shrink-0 cursor-pointer rounded border border-white/[0.07] bg-[#141414] px-2.5 py-1.5 text-xs text-[#737373] transition hover:border-white/[0.15] hover:text-[#f5f5f5]"
          >
            {copiedUrlIndex === i ? "Copied!" : "Copy URL"}
          </button>

          <!-- Delete -->
          <button
            type="button"
            on:click={() => dispatch("delete", image.name)}
            class="shrink-0 cursor-pointer rounded border border-white/[0.07] bg-[#141414] px-2.5 py-1.5 text-xs text-[#737373] transition hover:border-rose-500/40 hover:text-rose-400"
          >
            Delete
          </button>
        </div>
      {/each}
    {/if}
  </div>
</div>

<!-- Preview modal -->
{#if previewUrl}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8"
    on:click={closePreview}
  >
    <div class="relative" on:click|stopPropagation={() => {}}>
      <img
        src={previewUrl}
        alt="Preview"
        class="max-h-[80vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
      />
      <button
        type="button"
        on:click={closePreview}
        class="absolute -right-3 -top-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/[0.15] bg-[#1f1f1f] text-xs text-[#f5f5f5] transition hover:bg-[#2a2a2a]"
      >
        ✕
      </button>
    </div>
  </div>
{/if}
