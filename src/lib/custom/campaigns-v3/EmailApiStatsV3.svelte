<script lang="ts">
  export let attempted: number;
  export let sent: number;
  export let delivered: number;
  export let opened: number;
  export let clicked: number;
  export let title: string = "EMAIL API";
  export let caption: string = "";

  $: deliveryRate = attempted > 0 ? ((delivered / attempted) * 100).toFixed(1) : "—";
  $: openRate = delivered > 0 ? ((opened / delivered) * 100).toFixed(1) : "—";
  $: clickRate = delivered > 0 ? ((clicked / delivered) * 100).toFixed(1) : "—";
</script>

<div class="rounded-xl border border-white/[0.07] bg-[#111111]">
  <!-- Header -->
  <div class="flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
    <div class="text-xs font-medium uppercase tracking-widest text-[#525252]">{title}</div>
    {#if caption}
      <div class="text-xs text-[#525252]">{caption}</div>
    {/if}
  </div>

  <!-- Row 1: volume numbers -->
  <div class="grid grid-cols-4 divide-x divide-white/[0.05]">
    <!-- Attempted -->
    <div class="px-5 py-4">
      <div class="group/tip relative flex items-center gap-1">
        <div class="text-xs uppercase tracking-widest text-[#525252]">Attempted</div>
        <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
        </svg>
        <div class="pointer-events-none absolute bottom-full left-0 z-30 mb-2 w-44 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
          Total customers targeted across all selected campaigns
        </div>
      </div>
      <div class="mt-1.5 text-2xl font-semibold tabular-nums text-white">{attempted.toLocaleString()}</div>
    </div>

    <!-- Delivered -->
    <div class="px-5 py-4">
      <div class="group/tip relative flex items-center gap-1">
        <div class="text-xs uppercase tracking-widest text-[#525252]">Delivered</div>
        <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
        </svg>
        <div class="pointer-events-none absolute bottom-full left-0 z-30 mb-2 w-44 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
          Receiving mail server confirmed receipt, recorded from provider delivery events when available
        </div>
      </div>
      <div class="mt-1.5 text-2xl font-semibold tabular-nums text-white">{delivered.toLocaleString()}</div>
    </div>

    <!-- Opened -->
    <div class="px-5 py-4">
      <div class="group/tip relative flex items-center gap-1">
        <div class="text-xs uppercase tracking-widest text-[#525252]">Opened</div>
        <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
        </svg>
        <div class="pointer-events-none absolute bottom-full left-0 z-30 mb-2 w-48 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
          Total open events — not unique. Includes Apple Mail Privacy Protection pre-fetches, so may exceed delivered count
        </div>
      </div>
      <div class="mt-1.5 text-2xl font-semibold tabular-nums text-white">{opened.toLocaleString()}</div>
    </div>

    <!-- Clicked -->
    <div class="px-5 py-4">
      <div class="group/tip relative flex items-center gap-1">
        <div class="text-xs uppercase tracking-widest text-[#525252]">Clicked</div>
        <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
        </svg>
        <div class="pointer-events-none absolute bottom-full right-0 z-30 mb-2 w-44 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
          Link click events tracked by the active provider
        </div>
      </div>
      <div class="mt-1.5 text-2xl font-semibold tabular-nums text-white">{clicked.toLocaleString()}</div>
    </div>
  </div>

  <!-- Divider -->
  <div class="border-t border-white/[0.05]"></div>

  <!-- Row 2: rates -->
  <div class="grid grid-cols-4 divide-x divide-white/[0.05]">
    <!-- Sent -->
    <div class="px-5 py-4">
      <div class="group/tip relative flex items-center gap-1">
        <div class="text-xs uppercase tracking-widest text-[#525252]">Sent</div>
        <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
        </svg>
        <div class="pointer-events-none absolute bottom-full left-0 z-30 mb-2 w-44 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
          Emails the provider API accepted, which does not guarantee delivery
        </div>
      </div>
      <div class="mt-1.5 text-lg font-medium tabular-nums text-[#737373]">{sent.toLocaleString()}</div>
      <div class="mt-0.5 text-[11px] text-[#525252]">API accepted</div>
    </div>

    <!-- Del. rate -->
    <div class="px-5 py-4">
      <div class="group/tip relative flex items-center gap-1">
        <div class="text-xs uppercase tracking-widest text-[#525252]">Del. rate</div>
        <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
        </svg>
        <div class="pointer-events-none absolute bottom-full left-0 z-30 mb-2 w-40 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
          Delivered ÷ Attempted
        </div>
      </div>
      <div class="mt-1.5 text-lg font-medium tabular-nums text-white">{deliveryRate}{deliveryRate !== "—" ? "%" : ""}</div>
      <div class="mt-0.5 text-[11px] text-[#525252]">delivered / attempted</div>
    </div>

    <!-- Open rate -->
    <div class="px-5 py-4">
      <div class="group/tip relative flex items-center gap-1">
        <div class="text-xs uppercase tracking-widest text-[#525252]">Open rate</div>
        <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
        </svg>
        <div class="pointer-events-none absolute bottom-full left-0 z-30 mb-2 w-40 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
          Opened ÷ Delivered
        </div>
      </div>
      <div class="mt-1.5 text-lg font-medium tabular-nums text-white">{openRate}{openRate !== "—" ? "%" : ""}</div>
      <div class="mt-0.5 text-[11px] text-[#525252]">opened / delivered</div>
    </div>

    <!-- Click rate -->
    <div class="px-5 py-4">
      <div class="group/tip relative flex items-center gap-1">
        <div class="text-xs uppercase tracking-widest text-[#525252]">Click rate</div>
        <svg class="h-3 w-3 shrink-0 cursor-help text-[#3a3a3a] transition group-hover/tip:text-[#525252]" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7.5a1 1 0 0 1 2 0v3.5a1 1 0 0 1-2 0V7.5z" clip-rule="evenodd"/>
        </svg>
        <div class="pointer-events-none absolute bottom-full right-0 z-30 mb-2 w-40 rounded-lg border border-white/[0.07] bg-[#1a1a1a] px-2.5 py-2 text-[11px] leading-relaxed text-[#737373] opacity-0 transition-opacity group-hover/tip:opacity-100">
          Clicked ÷ Delivered
        </div>
      </div>
      <div class="mt-1.5 text-lg font-medium tabular-nums text-white">{clickRate}{clickRate !== "—" ? "%" : ""}</div>
      <div class="mt-0.5 text-[11px] text-[#525252]">clicked / delivered</div>
    </div>
  </div>
</div>
