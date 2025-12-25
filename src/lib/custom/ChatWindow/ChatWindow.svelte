<script lang="ts">
  import type { Snippet } from 'svelte';
  import Button from '../Button/Button.svelte';

  interface ChatWindowProps {
    expanded?: boolean;
    onExpand?: (expanded: boolean) => void;
    subheader?: Snippet;
    showScrollButton?: boolean;
    children?: Snippet;
    subheaderSlot?: Snippet;
  }

  let {
    expanded = false,
    onExpand,
    subheader,
    subheaderSlot,
    showScrollButton = true,
    children
  }: ChatWindowProps = $props();

  let isExpanded = $state(expanded);
  let messagesEndRef: HTMLDivElement | null = $state(null);
  let showScrollToBottom = $state(false);
  let messagesContainerRef: HTMLDivElement | null = $state(null);

  let windowClasses = $derived(
    [
      'chat-window',
      isExpanded && 'chat-window--expanded'
    ]
      .filter(Boolean)
      .join(' ')
  );

  function toggleExpand() {
    isExpanded = !isExpanded;
    onExpand?.(isExpanded);
  }

  function scrollToBottom() {
    messagesEndRef?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleScroll() {
    if (messagesContainerRef) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      showScrollToBottom = !isNearBottom;
    }
  }

  $effect(() => {
    if (messagesContainerRef) {
      messagesContainerRef.addEventListener('scroll', handleScroll);
      return () => {
        messagesContainerRef?.removeEventListener('scroll', handleScroll);
      };
    }
  });

  // Auto-scroll to bottom when new messages arrive
  $effect(() => {
    if (children && messagesEndRef) {
      scrollToBottom();
    }
  });
</script>

<div class={windowClasses}>
  {#if subheader || subheaderSlot}
    <div class="chat-window__subheader">
      {#if subheader}
        {@render subheader()}
      {:else if subheaderSlot}
        {@render subheaderSlot()}
      {/if}
    </div>
  {/if}

  <div class="chat-window__messages" bind:this={messagesContainerRef} onscroll={handleScroll}>
    {#if children}
      {@render children()}
    {/if}
    <div bind:this={messagesEndRef} class="chat-window__messages-end"></div>
  </div>

  {#if showScrollButton && showScrollToBottom}
    <button
      class="chat-window__scroll-button"
      onclick={scrollToBottom}
      aria-label="Scroll to bottom"
      type="button"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 14L6 10L7.41 8.59L10 11.17L12.59 8.59L14 10L10 14Z" fill="currentColor"/>
      </svg>
    </button>
  {/if}

  <button
    class="chat-window__expand-button"
    onclick={toggleExpand}
    aria-label={isExpanded ? 'Collapse chat' : 'Expand chat'}
    type="button"
  >
    {#if isExpanded}
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H8V8H4V4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 4H16V8H12V4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 12H8V16H4V12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 12H16V16H12V12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    {:else}
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
        <path d="M3 8H17M8 3V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    {/if}
  </button>
</div>

<style>
  .chat-window {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }

  .chat-window--expanded {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    max-width: 1200px;
    height: 80vh;
    max-height: 900px;
    z-index: 10000;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.1);
    animation: expand-window 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes expand-window {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  .chat-window__subheader {
    flex-shrink: 0;
    padding: 12px 20px;
    background: rgba(249, 250, 251, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  }

  .chat-window__messages {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }

  .chat-window__messages::-webkit-scrollbar {
    width: 6px;
  }

  .chat-window__messages::-webkit-scrollbar-track {
    background: transparent;
  }

  .chat-window__messages::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  .chat-window__messages::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  .chat-window__messages-end {
    height: 1px;
  }

  .chat-window__scroll-button {
    position: absolute;
    bottom: 80px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    color: #374151;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 100;
    padding: 0;
    animation: fade-in 0.2s ease-out;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .chat-window__scroll-button:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .chat-window__expand-button {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    color: #374151;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 100;
    padding: 0;
  }

  .chat-window__expand-button:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  /* Dark mode */
  :global(.dark) .chat-window,
  :global([data-theme="dark"]) .chat-window {
    background: #1f2937;
  }

  :global(.dark) .chat-window__subheader,
  :global([data-theme="dark"]) .chat-window__subheader {
    background: rgba(31, 41, 55, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  :global(.dark) .chat-window__messages::-webkit-scrollbar-thumb,
  :global([data-theme="dark"]) .chat-window__messages::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
  }

  :global(.dark) .chat-window__scroll-button,
  :global([data-theme="dark"]) .chat-window__scroll-button,
  :global(.dark) .chat-window__expand-button,
  :global([data-theme="dark"]) .chat-window__expand-button {
    background: rgba(31, 41, 55, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
    color: #f9fafb;
  }

  :global(.dark) .chat-window__scroll-button:hover,
  :global([data-theme="dark"]) .chat-window__scroll-button:hover,
  :global(.dark) .chat-window__expand-button:hover,
  :global([data-theme="dark"]) .chat-window__expand-button:hover {
    background: rgba(31, 41, 55, 1);
  }

  /* Responsive */
  @media (max-width: 968px) {
    .chat-window--expanded {
      width: 95vw;
      height: 90vh;
    }
  }

  @media (max-width: 640px) {
    .chat-window--expanded {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
      top: 0;
      left: 0;
      transform: none;
    }

    .chat-window__messages {
      padding: 16px;
    }

    .chat-window__scroll-button {
      bottom: 70px;
      right: 16px;
      width: 36px;
      height: 36px;
    }
  }
</style>

