<script lang="ts">
  import DashboardShellV2 from "./DashboardShellV2.svelte";
  import TableCardV2 from "../table-v2/TableCardV2.svelte";
  import DataTableV2 from "../table-v2/DataTableV2.svelte";

  const rows = [
    { id: "1", cells: ["Reuben Rojas", "ACTIVE", 300] },
    { id: "2", cells: ["Jonathan Jarrell", "INACTIVE", -140] }
  ];
</script>

<DashboardShellV2 title="Admin dashboard" subtitle="Full-width dashboard reference without hero split.">
  <TableCardV2 title="Customers">
    <DataTableV2 headers={["Name", "Status", "Points"]} {rows} />
  </TableCardV2>
</DashboardShellV2>
