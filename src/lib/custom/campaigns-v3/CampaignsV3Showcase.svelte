<script lang="ts">
  import EmailApiStatsV3 from "./EmailApiStatsV3.svelte";
  import EmailHealthStatsV3 from "./EmailHealthStatsV3.svelte";
  import CampaignErrorLogV3 from "./CampaignErrorLogV3.svelte";

  const sampleFailures = [
    {
      failure_type: "bounced",
      error_message: "550 5.1.1 The email account does not exist",
      error_type: "hard_bounce",
      suggested_action: "Remove this address from your list",
      http_status: null,
      emails_affected: 1,
      batch_offset: 0,
      recipient: "nobody@invalid-domain.test",
      reason: { bounce_type: "hard", diagnostic: "smtp;550 5.1.1" },
      created_at: "2026-03-08T14:30:00Z",
    },
    {
      failure_type: "api_rate_limit",
      error_message: "Rate limit exceeded — too many requests",
      error_type: "rate_limit_exceeded",
      suggested_action: "Reduce send frequency or upgrade plan",
      http_status: 429,
      emails_affected: 100,
      batch_offset: 200,
      recipient: null,
      reason: { error: "Too Many Requests", batch_offset: 200 },
      created_at: "2026-03-08T14:31:00Z",
    },
    {
      failure_type: "invalid_email",
      error_message: "Email address failed format validation and was excluded from send",
      error_type: null,
      suggested_action: null,
      http_status: null,
      emails_affected: 1,
      batch_offset: null,
      recipient: "not-an-email",
      reason: null,
      created_at: "2026-03-08T14:29:00Z",
    },
    {
      failure_type: "complained",
      error_message: "Recipient marked this email as spam",
      error_type: "spam_complaint",
      suggested_action: null,
      http_status: null,
      emails_affected: 1,
      batch_offset: null,
      recipient: "angry@user.test",
      reason: null,
      created_at: "2026-03-08T15:00:00Z",
    },
  ];
</script>

<div class="space-y-6 bg-[#0a0a0a] p-6">
  <EmailApiStatsV3
    attempted={1200}
    sent={1180}
    delivered={1150}
    opened={420}
    clicked={85}
    caption="Sample campaign run"
  />

  <EmailHealthStatsV3
    bounced={12}
    failed={8}
    complained={3}
    sent={1180}
    attempted={1200}
    internal={5}
    errorsHref="#errors"
    caption="Sample health metrics"
  />

  <CampaignErrorLogV3 failures={sampleFailures} />
</div>
