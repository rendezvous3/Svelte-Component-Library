<script lang="ts">
  import RichTextEditor from "./RichTextEditor.svelte";

  let value = "<h2>Welcome!</h2><p>This is the <strong>Rich Text</strong> editor powered by Tiptap.</p><p>Try <em>formatting</em>, <u>underline</u>, and <a href=\"https://anthropic.com\">links</a>.</p>";
</script>

<div class="space-y-8 bg-[#0a0a0a] p-6">
  <div>
    <h2 class="mb-2 text-sm text-[#737373]">Editable</h2>
    <RichTextEditor bind:value />
  </div>

  <div>
    <h2 class="mb-2 text-sm text-[#737373]">Readonly</h2>
    <RichTextEditor {value} readonly />
  </div>
</div>
