<script lang="ts">
  type FailureRecord = {
    failure_type: string;
    error_message: string | null;
    error_type: string | null;
    suggested_action: string | null;
    http_status: number | null;
    emails_affected: number | null;
    batch_offset: number | null;
    recipient: string | null;
    reason: Record<string, unknown> | null;
    created_at: string | null;
  };

  export let failures: FailureRecord[];

  const LABELS: Record<string, { label: string; color: string }> = {
    invalid_email:        { label: "Invalid address",    color: "bg-white/[0.06] text-[#737373]" },
    api_auth_error:       { label: "Auth failed",        color: "bg-rose-500/[0.12] text-rose-400" },
    api_validation_error: { label: "Validation error",   color: "bg-orange-500/[0.12] text-orange-400" },
    api_rate_limit:       { label: "Rate limited",       color: "bg-yellow-500/[0.10] text-yellow-400" },
    api_server_error:     { label: "Provider outage",    color: "bg-yellow-500/[0.10] text-yellow-400" },
    api_network_error:    { label: "Network error",      color: "bg-yellow-500/[0.10] text-yellow-400" },
    api_error:            { label: "API error",          color: "bg-orange-500/[0.12] text-orange-400" },
    bounced:              { label: "Bounced",            color: "bg-orange-500/[0.12] text-orange-400" },
    complained:           { label: "Spam report",        color: "bg-rose-500/[0.12] text-rose-400" },
  };

  let expandedDetails = new Set<number>();

  function toggleDetails(index: number) {
    if (expandedDetails.has(index)) {
      expandedDetails.delete(index);
    } else {
      expandedDetails.add(index);
    }
    expandedDetails = expandedDetails;
  }

  function fmtDate(iso: string | null | undefined): string {
    if (!iso) return "—";
    return new Date(iso).toLocaleString(undefined, {
      month: "short", day: "numeric",
      hour: "numeric", minute: "2-digit"
    });
  }

  function getMeta(ft: string) {
    return LABELS[ft] ?? { label: ft, color: "bg-white/[0.06] text-[#737373]" };
  }

  function hasDetails(f: FailureRecord): boolean {
    return !!(f.error_type || f.suggested_action || f.reason);
  }
</script>

{#if failures && failures.length > 0}
  <div class="rounded-xl border border-white/[0.07] bg-[#111111] overflow-hidden">
    <div class="border-b border-white/[0.07] px-5 py-3 flex items-center justify-between">
      <div class="text-sm font-medium text-white">Errors</div>
      <div class="rounded-full bg-rose-500/[0.12] px-2 py-0.5 text-xs text-rose-400">
        {failures.length}
      </div>
    </div>

    <div class="divide-y divide-white/[0.05]">
      {#each failures as f, i}
        {@const meta = getMeta(f.failure_type)}
        <div class="px-5 py-3 space-y-1.5">
          <!-- Row: badge + message + affected count -->
          <div class="flex items-start gap-3">
            <!-- Left: badge + timestamp -->
            <div class="flex flex-col gap-1 shrink-0">
              <span class="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium {meta.color}">
                {meta.label}
              </span>
              <span class="text-[10px] text-[#525252]">{fmtDate(f.created_at)}</span>
            </div>

            <!-- Middle: error_message -->
            <div class="flex-1 min-w-0">
              <p class="text-xs text-[#f5f5f5] break-words leading-relaxed">
                {f.error_message ?? "—"}
              </p>
              {#if f.batch_offset !== null && f.batch_offset !== undefined}
                <p class="mt-0.5 text-[11px] text-[#525252]">Batch at offset {f.batch_offset}</p>
              {/if}
              {#if f.recipient}
                <p class="mt-0.5 text-[11px] text-[#525252]">{f.recipient}</p>
              {/if}
            </div>

            <!-- Right: emails_affected + expand button -->
            <div class="flex flex-col items-end gap-1.5 shrink-0">
              {#if (f.emails_affected ?? 1) > 1}
                <span class="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] text-[#737373]">
                  {f.emails_affected} emails
                </span>
              {/if}
              {#if hasDetails(f)}
                <button
                  type="button"
                  on:click={() => toggleDetails(i)}
                  class="text-[11px] text-[#525252] transition hover:text-[#737373]"
                >
                  {expandedDetails.has(i) ? "Hide" : "Details"}
                </button>
              {/if}
            </div>
          </div>

          <!-- Expandable details -->
          {#if expandedDetails.has(i)}
            <div class="mt-2 space-y-1.5 rounded-lg border border-white/[0.05] bg-[#0d0d0d] px-3 py-2.5">
              {#if f.error_type}
                <div class="flex gap-2 text-xs">
                  <span class="text-[#525252] shrink-0">Type</span>
                  <span class="text-[#737373] font-mono">{f.error_type}</span>
                </div>
              {/if}
              {#if f.http_status}
                <div class="flex gap-2 text-xs">
                  <span class="text-[#525252] shrink-0">HTTP</span>
                  <span class="text-[#737373]">{f.http_status}</span>
                </div>
              {/if}
              {#if f.suggested_action}
                <div class="flex gap-2 text-xs">
                  <span class="text-[#525252] shrink-0">Suggestion</span>
                  <span class="text-[#f5f5f5]">{f.suggested_action}</span>
                </div>
              {/if}
              {#if f.reason}
                <div class="mt-1.5">
                  <div class="mb-1 text-[10px] uppercase tracking-widest text-[#525252]">Raw</div>
                  <pre class="overflow-x-auto rounded bg-black/30 px-2.5 py-2 text-[11px] text-[#737373] whitespace-pre-wrap break-all">{JSON.stringify(f.reason, null, 2)}</pre>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if}
