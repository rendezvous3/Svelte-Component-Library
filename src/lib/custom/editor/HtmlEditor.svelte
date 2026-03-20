<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { EditorView, basicSetup } from "codemirror";
  import { html } from "@codemirror/lang-html";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { EditorState } from "@codemirror/state";

  export let value: string = "";
  export let readonly: boolean = false;

  let containerEl: HTMLElement;
  let fileInputEl: HTMLInputElement;
  let view: any;
  let debounceTimer: ReturnType<typeof setTimeout>;
  let variablesOpen = false;

  const variables = [
    { token: "{{name}}", label: "Name" },
    { token: "{{email}}", label: "Email" },
    { token: "{{phone}}", label: "Phone" },
    { token: "{{points}}", label: "Points" },
  ];

  onMount(() => {
    const bgTheme = EditorView.theme({
      "&": { backgroundColor: "#141414", height: "100%" },
      ".cm-gutters": { backgroundColor: "#141414", border: "none" },
      ".cm-content": { minHeight: "280px" },
      ".cm-scroller": { overflow: "auto" },
    });

    const extensions = [
      basicSetup,
      html(),
      oneDark,
      bgTheme,
      EditorView.lineWrapping,
      EditorView.updateListener.of((update: any) => {
        if (update.docChanged) {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            value = update.state.doc.toString();
          }, 300);
        }
      }),
    ];

    if (readonly) {
      extensions.push(EditorState.readOnly.of(true));
    }

    view = new EditorView({
      state: EditorState.create({ doc: value, extensions }),
      parent: containerEl,
    });
  });

  onDestroy(() => {
    clearTimeout(debounceTimer);
    view?.destroy();
  });

  function handleFileUpload(file: File) {
    if (!file || !file.name.endsWith(".html")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      if (view) {
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: text },
        });
      }
      value = text;
    };
    reader.readAsText(file);
  }

  function onFileInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) handleFileUpload(file);
    input.value = "";
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFileUpload(file);
  }

  function onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  export function loadContent(text: string) {
    if (!view) return;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: text },
    });
    value = text;
  }

  function insertVariable(token: string) {
    if (!view) return;
    const cursor = view.state.selection.main.head;
    view.dispatch({ changes: { from: cursor, insert: token } });
    view.focus();
    variablesOpen = false;
  }
</script>

<svelte:window on:click={() => { variablesOpen = false; }} />

<div class="overflow-hidden rounded-xl border border-white/[0.07] bg-[#111111] {readonly ? 'opacity-60' : ''}">
  <!-- Toolbar -->
  {#if !readonly}
    <div class="flex items-center gap-2 border-b border-white/[0.07] px-3 py-2">
      <button
        type="button"
        on:click={() => fileInputEl.click()}
        class="rounded px-2.5 py-1 text-xs text-[#737373] transition hover:bg-white/[0.05] hover:text-white"
      >
        Upload .html
      </button>

      <input
        bind:this={fileInputEl}
        type="file"
        accept=".html"
        class="hidden"
        on:change={onFileInput}
      />

      <div class="mx-1 h-4 w-px bg-white/[0.08]"></div>

      <!-- Variable picker -->
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <div class="relative" on:click|stopPropagation={() => {}}>
        <button
          type="button"
          on:click={() => { variablesOpen = !variablesOpen; }}
          class="rounded px-2.5 py-1 text-xs text-[#737373] transition hover:bg-white/[0.05] hover:text-white"
        >
          Variables
          <svg class="ml-1 inline-block h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 5l3 3 3-3" />
          </svg>
        </button>

        {#if variablesOpen}
          <div class="absolute left-0 top-full z-10 mt-1 w-40 rounded-lg border border-white/[0.07] bg-[#141414] py-1 shadow-xl">
            {#each variables as v}
              <button
                type="button"
                on:click={() => insertVariable(v.token)}
                class="flex w-full items-center justify-between px-3 py-1.5 text-xs text-[#f5f5f5] transition hover:bg-white/[0.05]"
              >
                <span>{v.label}</span>
                <span class="text-[#525252]">{v.token}</span>
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Editor + Preview -->
  <div class="grid grid-cols-2 divide-x divide-white/[0.07]" style="min-height: 400px;">
    <!-- CodeMirror -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      bind:this={containerEl}
      on:drop={onDrop}
      on:dragover={onDragOver}
      class="overflow-auto bg-[#141414] [&_.cm-editor]:h-full [&_.cm-editor]:outline-none"
    ></div>

    <!-- Live preview -->
    <div class="bg-white">
      <iframe
        title="Email preview"
        srcdoc={value}
        class="h-full w-full border-0"
        sandbox="allow-same-origin"
      ></iframe>
    </div>
  </div>
</div>
