<script lang="ts">
  import TableCardV2 from "./TableCardV2.svelte";
  import DataTableV2 from "./DataTableV2.svelte";

  const rows = [
    { id: "1", cells: ["Reuben Rojas", "reuben@store.com", "ACTIVE", 300] },
    { id: "2", cells: ["Jonathan Jarrell", "jonathan@store.com", "INACTIVE", -140] },
    { id: "3", cells: ["Mason Maire", "mason@store.com", "ACTIVE", 300] }
  ];
</script>

<div class="min-h-screen bg-[#121f3d] p-8 text-slate-100">
  <TableCardV2 title="Customers" subtitle="Dark table reference style.">
    <DataTableV2 headers={["Name", "Email", "Status", "Points"]} {rows} />
  </TableCardV2>
</div>
