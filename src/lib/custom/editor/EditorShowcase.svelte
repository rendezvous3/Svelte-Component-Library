<script lang="ts">
  import HtmlEditor from "./HtmlEditor.svelte";

  let value = `<h1 style="color: #333;">Hello {{name}}</h1>
<p>Welcome to our loyalty program! You currently have <strong>{{points}} points</strong>.</p>
<p>Visit us today to earn more rewards.</p>`;
</script>

<div class="space-y-8 bg-[#0a0a0a] p-6">
  <div>
    <h2 class="mb-2 text-sm text-[#737373]">Editable</h2>
    <HtmlEditor bind:value />
  </div>

  <div>
    <h2 class="mb-2 text-sm text-[#737373]">Readonly</h2>
    <HtmlEditor {value} readonly />
  </div>
</div>
