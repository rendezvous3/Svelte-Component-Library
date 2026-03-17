<script lang="ts">
  import InsightShellV3 from "./InsightShellV3.svelte";
  import InsightCardV3 from "./InsightCardV3.svelte";
</script>

<div class="space-y-6 bg-[#0a0a0a] p-6">
  <InsightShellV3 title="Overview" caption="Last 30 days" cols={4}>
    <InsightCardV3 label="Total Customers" value="1,284" sub="+12% from last month" tone="green" />
    <InsightCardV3 label="Active Members" value="842" sub="65.6% of total" />
    <InsightCardV3 label="Emails Sent" value="4,500" sub="3 campaigns" />
    <InsightCardV3 label="Bounce Rate" value="4.8%" sub="Above 2% threshold" tone="yellow" />
  </InsightShellV3>

  <InsightShellV3 title="Health Metrics" caption="Current period" cols={5}>
    <InsightCardV3 label="Delivered" value="98.2%" tone="green" />
    <InsightCardV3 label="Open Rate" value="36.5%" />
    <InsightCardV3 label="Click Rate" value="7.2%" />
    <InsightCardV3 label="Complaints" value="0.8%" sub="Above 0.5% threshold" tone="red" />
    <InsightCardV3 label="Failed" value="0" sub="No failures" tone="green" />
  </InsightShellV3>
</div>
