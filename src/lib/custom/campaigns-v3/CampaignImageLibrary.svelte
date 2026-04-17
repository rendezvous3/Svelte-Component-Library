<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let images: Array<{ name: string; url: string }> = [];
  export let uploading: boolean = false;
  export let bulkUploading: boolean = false;

  const dispatch = createEventDispatcher<{
    upload: File;
    delete: string;
    bulkupload: { htmlContent: string | null; images: File[] };
  }>();

  let fileInput: HTMLInputElement;
  let folderInput: HTMLInputElement;
  let copiedTagIndex: number | null = null;
  let copiedUrlIndex: number | null = null;
  let previewUrl: string | null = null;
  let dragActive = false;
  let collapsed = false;
  let showAll = false;
  const VISIBLE_COUNT = 5;
  $: visibleImages = showAll ? images : images.slice(0, VISIBLE_COUNT);
  $: hiddenCount = images.length - VISIBLE_COUNT;

  function triggerUpload() {
    fileInput.click();
  }

  function triggerFolderImport() {
    folderInput.click();
  }

  function onFileChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      dispatch("upload", file);
      fileInput.value = "";
    }
  }

  async function processFileList(files: File[]): Promise<void> {
    const images = files.filter(
      (f) => f.type.startsWith("image/") || /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f.name)
    );
    const htmlFile = files.find((f) => f.name === "index.html");
    const htmlContent = htmlFile ? await htmlFile.text() : null;
    dispatch("bulkupload", { htmlContent, images });
  }

  async function onFolderChange(e: Event) {
    const files = Array.from((e.target as HTMLInputElement).files ?? []);
    folderInput.value = "";
    if (files.length > 0) await processFileList(files);
  }

  async function readEntry(entry: FileSystemEntry): Promise<File[]> {
    if (entry.isFile) {
      return [await new Promise<File>((res) => (entry as FileSystemFileEntry).file(res))];
    }
    const reader = (entry as FileSystemDirectoryEntry).createReader();
    const entries: FileSystemEntry[] = await new Promise((res) => reader.readEntries(res));
    const nested = await Promise.all(entries.map(readEntry));
    return nested.flat();
  }

  async function onDrop(e: DragEvent) {
    e.preventDefault();
    dragActive = false;
    const items = Array.from(e.dataTransfer?.items ?? []);
    const entries = items
      .map((i) => i.webkitGetAsEntry())
      .filter((en): en is FileSystemEntry => en !== null);
    const allFiles = (await Promise.all(entries.map(readEntry))).flat();
    if (allFiles.length > 0) await processFileList(allFiles);
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
    <button
      type="button"
      on:click={() => { collapsed = !collapsed; }}
      class="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[#f5f5f5] transition hover:text-white"
    >
      <svg
        class="h-3.5 w-3.5 text-[#737373] transition-transform duration-200 {collapsed ? '-rotate-90' : ''}"
        viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"
      >
        <path d="M3 5l3 3 3-3" />
      </svg>
      Images
      {#if images.length > 0}
        <span class="rounded-full bg-white/[0.07] px-1.5 py-0.5 text-xs font-normal text-[#737373]">{images.length}</span>
      {/if}
    </button>
    <div class="flex items-center gap-2">
      <button
        type="button"
        on:click={triggerFolderImport}
        disabled={bulkUploading || uploading}
        class="cursor-pointer rounded-lg border border-white/[0.07] bg-[#1f1f1f] px-3 py-1.5 text-xs font-medium text-[#f5f5f5] transition hover:border-white/[0.15] disabled:cursor-not-allowed disabled:text-[#525252]"
      >
        {bulkUploading ? "Importing…" : "Import folder"}
      </button>
      <button
        type="button"
        on:click={triggerUpload}
        disabled={uploading || bulkUploading}
        class="cursor-pointer rounded-lg border border-white/[0.07] bg-[#1f1f1f] px-3 py-1.5 text-xs font-medium text-[#f5f5f5] transition hover:border-white/[0.15] disabled:cursor-not-allowed disabled:text-[#525252]"
      >
        {uploading ? "Uploading…" : "Upload image"}
      </button>
    </div>
    <input
      bind:this={fileInput}
      type="file"
      accept="image/*"
      class="hidden"
      on:change={onFileChange}
    />
    <input
      bind:this={folderInput}
      type="file"
      webkitdirectory
      multiple
      class="hidden"
      on:change={onFolderChange}
    />
  </div>

  {#if !collapsed}
  <!-- Drop zone -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="mx-4 my-3 flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed px-4 py-5 text-center transition-colors {dragActive
      ? 'border-white/30 bg-white/[0.04]'
      : 'border-white/[0.10] bg-transparent'}"
    on:dragover|preventDefault={() => { dragActive = true; }}
    on:dragleave={() => { dragActive = false; }}
    on:drop={onDrop}
  >
    <span class="text-xs font-medium text-[#737373]">
      Drop Kombai export folder or <code class="font-mono text-[#525252]">assets/</code> folder here
    </span>
    <span class="text-[11px] text-[#525252]">
      Full export loads HTML + images · Assets-only replaces srcs in editor
    </span>
  </div>

  <!-- Image list -->
  <div class="divide-y divide-white/[0.05]">
    {#if images.length === 0}
      <div class="px-5 py-4 text-xs text-[#525252]">
        No images yet. Upload to get started.
      </div>
    {:else}
      {#each visibleImages as image, i}
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
      {#if hiddenCount > 0 && !showAll}
        <button
          type="button"
          on:click={() => { showAll = true; }}
          class="flex w-full cursor-pointer items-center justify-center gap-1.5 py-2.5 text-xs text-[#525252] transition hover:text-[#737373]"
        >
          Show {hiddenCount} more
          <svg class="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 5l3 3 3-3" />
          </svg>
        </button>
      {:else if showAll && images.length > VISIBLE_COUNT}
        <button
          type="button"
          on:click={() => { showAll = false; }}
          class="flex w-full cursor-pointer items-center justify-center gap-1.5 py-2.5 text-xs text-[#525252] transition hover:text-[#737373]"
        >
          Show less
          <svg class="h-3 w-3 rotate-180" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 5l3 3 3-3" />
          </svg>
        </button>
      {/if}
    {/if}
  </div>
  {/if}
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
