<script lang="ts">
  export let bounced: number;
  export let failed: number;
  export let complained: number;
  export let sent: number;       // bounce/complaint rate denominator
  export let attempted: number;  // failed/internal rate denominator
  export let internal: number = 0;
  export let errorsHref: string | null = null;
  export let title: string = "EMAIL HEALTH";
  export let caption: string = "";

  $: showInternal = internal > 0;

  $: bounceRate = sent > 0 ? (bounced / sent) * 100 : 0;
  $: complaintRate = sent > 0 ? (complained / sent) * 100 : 0;
  $: failedRate = attempted > 0 ? (failed / attempted) * 100 : 0;
  $: internalRate = attempted > 0 ? (internal / attempted) * 100 : 0;

  $: bounceRateStr = sent > 0 ? bounceRate.toFixed(2) + "%" : "—";
  $: complaintRateStr = sent > 0 ? complaintRate.toFixed(2) + "%" : "—";
  $: failedRateStr = attempted > 0 ? failedRate.toFixed(2) + "%" : "—";
  $: internalRateStr = attempted > 0 ? internalRate.toFixed(2) + "%" : "—";

  function bounceColor(rate: number): string {
    if (rate >= 5) return "text-rose-400";
    if (rate >= 2) return "text-yellow-400";
    return "text-[#22c55e]";
  }

  function complaintColor(rate: number): string {
    if (rate >= 0.5) return "text-rose-400";
    if (rate >= 0.1) return "text-yellow-400";
    return "text-[#22c55e]";
  }

  function failedColor(rate: number): string {
    return rate > 0 ? "text-yellow-400" : "text-[#737373]";
  }
</script>

<div class="rounded-xl border border-white/[0.07] bg-[#111111]">
  <!-- Header -->
  <div class="flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
    <div class="text-xs font-medium uppercase tracking-widest text-[#525252]">{title}</div>
    {#if caption}
      <div class="text-xs text-[#525252]">{caption}</div>
    {/if}
  </div>

  <!-- Row 1: counts -->
  <div class="grid divide-x divide-white/[0.05] {showInternal ? 'grid-cols-4' : 'grid-cols-3'}">
    <!-- Bounced -->
    <div class="px-5 py-4">
      <div class="group/tip relative flex items-center gap-1">
        <div class="text-xs uppercase tracking-widest text-[#525252]">Bounced</div>
        <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
        </svg>
        <div class="pointer-events-none absolute bottom-full left-0 z-30 mb-2 w-48 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
          Hard bounce — the receiving mail server permanently rejected this address
        </div>
      </div>
      <div class="mt-1.5 text-2xl font-semibold tabular-nums {bounced > 0 ? 'text-rose-400' : 'text-white'}">{bounced.toLocaleString()}</div>
    </div>

    <!-- Failed -->
    <div class="px-5 py-4">
      <div class="group/tip relative flex items-center gap-1">
        <div class="text-xs uppercase tracking-widest text-[#525252]">Failed</div>
        <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
        </svg>
        <div class="pointer-events-none absolute bottom-full left-0 z-30 mb-2 w-48 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
          Resend API rejected the batch before attempting delivery — auth errors, rate limits, validation failures
        </div>
      </div>
      <div class="mt-1.5 text-2xl font-semibold tabular-nums {failed > 0 ? 'text-yellow-400' : 'text-white'}">{failed.toLocaleString()}</div>
    </div>

    <!-- Complained -->
    <div class="px-5 py-4">
      <div class="group/tip relative flex items-center gap-1">
        <div class="text-xs uppercase tracking-widest text-[#525252]">Complained</div>
        <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
        </svg>
        <div class="pointer-events-none absolute {showInternal ? 'left-0' : 'right-0'} bottom-full z-30 mb-2 w-44 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
          Recipient marked the email as spam — tracked via Resend webhook
        </div>
      </div>
      <div class="mt-1.5 text-2xl font-semibold tabular-nums {complained > 0 ? 'text-rose-400' : 'text-white'}">{complained.toLocaleString()}</div>
    </div>

    <!-- Internal (conditional) -->
    {#if showInternal}
      <div class="px-5 py-4">
        <div class="group/tip relative flex items-center gap-1">
          <div class="text-xs uppercase tracking-widest text-[#525252]">Internal</div>
          <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
            <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
          </svg>
          <div class="pointer-events-none absolute bottom-full right-0 z-30 mb-2 w-48 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
            Filtered by our email validator before reaching Resend — address failed format check
          </div>
        </div>
        <div class="mt-1.5 text-2xl font-semibold tabular-nums text-yellow-400">{internal.toLocaleString()}</div>
      </div>
    {/if}
  </div>

  <!-- Divider -->
  <div class="border-t border-white/[0.05]" />

  <!-- Row 2: rates -->
  <div class="grid divide-x divide-white/[0.05] {showInternal ? 'grid-cols-4' : 'grid-cols-3'}">
    <!-- Bounce rate -->
    <div class="px-5 py-4">
      <div class="group/tip relative flex items-center gap-1">
        <div class="text-xs uppercase tracking-widest text-[#525252]">Bounce rate</div>
        <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
        </svg>
        <div class="pointer-events-none absolute bottom-full left-0 z-30 mb-2 w-44 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
          Bounced ÷ Sent — industry standard. Keep below 2%
        </div>
      </div>
      <div class="mt-1.5 text-lg font-medium tabular-nums {bounceColor(bounceRate)}">{bounceRateStr}</div>
      <div class="mt-0.5 text-[11px] text-[#525252]">bounced / sent</div>
    </div>

    <!-- Failed rate -->
    <div class="px-5 py-4">
      <div class="group/tip relative flex items-center gap-1">
        <div class="text-xs uppercase tracking-widest text-[#525252]">Failed rate</div>
        <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
        </svg>
        <div class="pointer-events-none absolute bottom-full left-0 z-30 mb-2 w-40 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
          Failed ÷ Attempted
        </div>
      </div>
      <div class="mt-1.5 text-lg font-medium tabular-nums {failedColor(failedRate)}">{failedRateStr}</div>
      <div class="mt-0.5 text-[11px] text-[#525252]">failed / attempted</div>
    </div>

    <!-- Complaint rate (+ View errors link when no internal col) -->
    <div class="px-5 py-4 {!showInternal ? 'flex flex-col justify-between' : ''}">
      <div>
        <div class="group/tip relative flex items-center gap-1">
          <div class="text-xs uppercase tracking-widest text-[#525252]">Complaint rate</div>
          <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
            <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
          </svg>
          <div class="pointer-events-none absolute {showInternal ? 'left-0' : 'right-0'} bottom-full z-30 mb-2 w-44 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
            Complained ÷ Sent — industry standard. Keep below 0.1%
          </div>
        </div>
        <div class="mt-1.5 text-lg font-medium tabular-nums {complaintColor(complaintRate)}">{complaintRateStr}</div>
        <div class="mt-0.5 text-[11px] text-[#525252]">complained / sent</div>
      </div>
      {#if errorsHref && !showInternal}
        <a href={errorsHref} class="mt-3 self-end text-xs text-[#525252] transition hover:text-[#f5f5f5]">
          View errors →
        </a>
      {/if}
    </div>

    <!-- Internal rate (conditional, also holds View errors link) -->
    {#if showInternal}
      <div class="flex flex-col justify-between px-5 py-4">
        <div>
          <div class="group/tip relative flex items-center gap-1">
            <div class="text-xs uppercase tracking-widest text-[#525252]">Internal rate</div>
            <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
              <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
            </svg>
            <div class="pointer-events-none absolute bottom-full right-0 z-30 mb-2 w-48 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
              Internally filtered ÷ Attempted — fixable by cleaning your contact list
            </div>
          </div>
          <div class="mt-1.5 text-lg font-medium tabular-nums text-yellow-400">{internalRateStr}</div>
          <div class="mt-0.5 text-[11px] text-[#525252]">internal / attempted</div>
        </div>
        {#if errorsHref}
          <a href={errorsHref} class="mt-3 self-end text-xs text-[#525252] transition hover:text-[#f5f5f5]">
            View errors →
          </a>
        {/if}
      </div>
    {/if}
  </div>
</div>
