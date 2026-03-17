<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  export let value: string = "";
  export let readonly: boolean = false;

  let editorEl: HTMLElement;
  let editor: any;

  onMount(async () => {
    const { Editor } = await import("@tiptap/core");
    const { default: StarterKit } = await import("@tiptap/starter-kit");
    const { default: Underline } = await import("@tiptap/extension-underline");
    const { default: Link } = await import("@tiptap/extension-link");

    editor = new Editor({
      element: editorEl,
      extensions: [StarterKit, Underline, Link.configure({ openOnClick: false })],
      content: value,
      editable: !readonly,
      onUpdate({ editor: e }) {
        value = e.getHTML();
      },
    });
  });

  onDestroy(() => {
    editor?.destroy();
  });

  function exec(command: string) {
    editor?.chain().focus()[command]().run();
  }

  function setLink() {
    if (!editor) return;
    const prev = editor.getAttributes("link").href ?? "";
    const { from, to } = editor.state.selection;
    const url = window.prompt("Link URL", prev);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().setTextSelection({ from, to }).unsetLink().run();
    } else {
      editor.chain().focus().setTextSelection({ from, to }).setLink({ href: url }).run();
    }
  }
</script>

<div class="overflow-hidden rounded-xl border border-white/[0.07] bg-[#111111] {readonly ? 'opacity-60' : ''}">
  {#if !readonly}
    <div class="flex items-center gap-1 border-b border-white/[0.07] px-3 py-2">
      {#each [
        { cmd: "toggleBold", label: "Bold", icon: "B", style: "font-bold" },
        { cmd: "toggleItalic", label: "Italic", icon: "I", style: "italic" },
        { cmd: "toggleUnderline", label: "Underline", icon: "U", style: "underline" },
      ] as btn}
        <button
          type="button"
          aria-label={btn.label}
          on:click={() => exec(btn.cmd)}
          class="rounded px-2.5 py-1 text-sm transition {btn.style} {editor?.isActive(btn.label.toLowerCase()) ? 'bg-white/[0.1] text-white' : 'text-[#737373] hover:text-white'}"
        >
          {btn.icon}
        </button>
      {/each}

      <div class="mx-1 h-4 w-px bg-white/[0.08]"></div>

      <button
        type="button"
        aria-label="Link"
        on:mousedown|preventDefault
        on:click={setLink}
        class="rounded p-1.5 transition {editor?.isActive('link') ? 'bg-white/[0.1] text-white' : 'text-[#737373] hover:text-white'}"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>

      <div class="mx-1 h-4 w-px bg-white/[0.08]"></div>

      <button
        type="button"
        aria-label="Bullet list"
        on:click={() => exec("toggleBulletList")}
        class="rounded p-1.5 transition {editor?.isActive('bulletList') ? 'bg-white/[0.1] text-white' : 'text-[#737373] hover:text-white'}"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" />
          <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" /><circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Ordered list"
        on:click={() => exec("toggleOrderedList")}
        class="rounded p-1.5 transition {editor?.isActive('orderedList') ? 'bg-white/[0.1] text-white' : 'text-[#737373] hover:text-white'}"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" />
          <text x="2" y="8" font-size="7" fill="currentColor" stroke="none" font-family="monospace">1.</text>
          <text x="2" y="14" font-size="7" fill="currentColor" stroke="none" font-family="monospace">2.</text>
          <text x="2" y="20" font-size="7" fill="currentColor" stroke="none" font-family="monospace">3.</text>
        </svg>
      </button>
    </div>
  {/if}

  <div
    bind:this={editorEl}
    class="min-h-[300px] bg-[#141414] p-4 text-sm text-[#f5f5f5] [&_.ProseMirror]:min-h-[260px] [&_.ProseMirror]:outline-none [&_.ProseMirror_p]:mb-2 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_a]:underline [&_.ProseMirror_a]:text-blue-400"
  ></div>
</div>
