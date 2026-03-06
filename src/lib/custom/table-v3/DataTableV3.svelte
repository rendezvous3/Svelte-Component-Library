<script lang="ts">
  export let columns: Array<{ key: string; label: string; align?: string }> = [];
  export let rows: Array<Record<string, any>> = [];
</script>

<div class="overflow-x-auto">
  <table class="min-w-full bg-[#0a0a0a] text-left">
    <thead>
      <tr class="border-b border-white/[0.08]">
        {#each columns as col}
          <th
            class={`px-4 py-3 text-sm font-normal text-[#737373] ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : ""}`}
          >
            {col.label}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if rows.length === 0}
        <tr>
          <td class="px-4 py-10 text-center text-sm text-[#737373]" colspan={columns.length}>
            No records
          </td>
        </tr>
      {:else}
        {#each rows as row}
          <tr
            class="border-b border-white/[0.05] text-sm text-[#f5f5f5] transition hover:bg-white/[0.02]"
          >
            {#each columns as col}
              <td
                class={`px-4 py-3 ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : ""}`}
              >
                <slot name="cell" {row} {col}>{row[col.key] ?? "—"}</slot>
              </td>
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

{#if $$slots.footer}
  <div class="flex justify-end border-t border-white/[0.05] px-4 py-3">
    <slot name="footer" />
  </div>
{/if}
