<script lang="ts">
  export let headers: string[] = [];
  export let rows: Array<{ id: string; cells: Array<string | number> }> = [];
</script>

<div class="overflow-x-auto rounded-xl border border-white/10">
  <table class="min-w-full text-left">
    <thead class="bg-white/5">
      <tr>
        {#each headers as header}
          <th class="px-4 py-3 text-xs uppercase tracking-[0.22em] text-slate-400">{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="bg-transparent">
      {#if rows.length === 0}
        <tr>
          <td
            class="px-4 py-6 text-sm text-slate-400"
            colspan={Math.max(headers.length, 1)}
          >
            No records yet.
          </td>
        </tr>
      {:else}
        {#each rows as row}
          <tr class="border-t border-white/10 text-sm text-slate-200" data-row={row.id}>
            {#each row.cells as cell}
              <td class="px-4 py-3">{cell}</td>
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>
