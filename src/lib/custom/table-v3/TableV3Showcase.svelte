<script lang="ts">
  import TableShellV3 from "./TableShellV3.svelte";
  import DataTableV3 from "./DataTableV3.svelte";

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "points", label: "Points", align: "right" },
    { key: "status", label: "Status" },
  ];

  const rows = [
    { name: "Alice Johnson", email: "alice@example.com", points: 1250, status: "Active" },
    { name: "Bob Smith", email: "bob@example.com", points: 840, status: "Active" },
    { name: "Carol Davis", email: "carol@example.com", points: 320, status: "Inactive" },
    { name: "Dan Wilson", email: "dan@example.com", points: 2100, status: "Active" },
    { name: "Eve Martinez", email: "eve@example.com", points: 0, status: "New" },
  ];

  let search = "";
</script>

<div class="bg-[#0a0a0a] p-6">
  <TableShellV3 title="Customers" count={rows.length} bind:search>
    <DataTableV3 {columns} {rows} />
  </TableShellV3>
</div>
