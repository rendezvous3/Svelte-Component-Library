<script lang="ts">
  import WidgetIcon from '../WidgetIcon/WidgetIcon.svelte';
  import Button from '../Button/Button.svelte';

  import type { Snippet } from 'svelte';

  interface ChatWidgetProps {
    isOpen?: boolean;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    onToggle?: () => void;
    children?: Snippet;
  }

  let {
    isOpen = false,
    position = 'bottom-right',
    onToggle,
    children
  }: ChatWidgetProps = $props();

  let isWidgetOpen = $state(false);

  // Sync with prop
  $effect(() => {
    isWidgetOpen = isOpen;
  });

  let widgetClasses = $derived(
    [
      'chat-widget',
      `chat-widget--${position}`,
      isWidgetOpen && 'chat-widget--open'
    ]
      .filter(Boolean)
      .join(' ')
  );

  function toggleWidget() {
    isWidgetOpen = !isWidgetOpen;
    onToggle?.();
  }
</script>

<div class={widgetClasses}>
  {#if isWidgetOpen}
    <div class="chat-widget__window">
      <div class="chat-widget__header">
        <div class="chat-widget__header-content">
          <WidgetIcon type="message-bubble" size="sm" color="#ffffff" />
          <span class="chat-widget__title">Chat Support</span>
        </div>
        <button
          class="chat-widget__close"
          onclick={toggleWidget}
          aria-label="Close chat"
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div class="chat-widget__body">
        {#if children}
          {@render children()}
        {:else}
          <div class="chat-widget__placeholder">
            <WidgetIcon type="message-bubble" size="lg" color="#9ca3af" />
            <p>Start a conversation</p>
          </div>
        {/if}
      </div>
    </div>
  {/if}
  
  <button
    class="chat-widget__button"
    onclick={toggleWidget}
    aria-label={isWidgetOpen ? 'Close chat' : 'Open chat'}
    aria-expanded={isWidgetOpen}
    type="button"
  >
    {#if isWidgetOpen}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    {:else}
      <WidgetIcon type="message-bubble" size="md" color="#ffffff" />
      <span class="chat-widget__badge">1</span>
    {/if}
  </button>
</div>

<style>
  .chat-widget {
    position: fixed;
    z-index: 1000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  }

  /* Position variants */
  .chat-widget--bottom-right {
    bottom: 20px;
    right: 20px;
  }

  .chat-widget--bottom-left {
    bottom: 20px;
    left: 20px;
  }

  .chat-widget--top-right {
    top: 20px;
    right: 20px;
  }

  .chat-widget--top-left {
    top: 20px;
    left: 20px;
  }

  /* Widget button */
  .chat-widget__button {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    border: none;
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: #ffffff;
    padding: 0;
  }

  .chat-widget__button:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 32px rgba(59, 130, 246, 0.5), 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .chat-widget__button:active {
    transform: scale(0.95);
  }

  .chat-widget__button:focus-visible {
    outline: 3px solid rgba(59, 130, 246, 0.5);
    outline-offset: 4px;
  }

  /* Badge */
  .chat-widget__badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: #ef4444;
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
  }

  /* Chat window */
  .chat-widget__window {
    position: absolute;
    width: 380px;
    max-width: calc(100vw - 40px);
    height: 600px;
    max-height: calc(100vh - 120px);
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: chat-widget-slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .chat-widget--bottom-right .chat-widget__window {
    bottom: 80px;
    right: 0;
  }

  .chat-widget--bottom-left .chat-widget__window {
    bottom: 80px;
    left: 0;
  }

  .chat-widget--top-right .chat-widget__window {
    top: 80px;
    right: 0;
  }

  .chat-widget--top-left .chat-widget__window {
    top: 80px;
    left: 0;
  }

  @keyframes chat-widget-slide-up {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Header */
  .chat-widget__header {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
  }

  .chat-widget__header-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .chat-widget__title {
    font-size: 16px;
    font-weight: 600;
  }

  .chat-widget__close {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease-out;
    color: #ffffff;
    padding: 0;
  }

  .chat-widget__close:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  .chat-widget__close:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }

  /* Body */
  .chat-widget__body {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: #f9fafb;
  }

  .chat-widget__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #9ca3af;
    gap: 12px;
  }

  .chat-widget__placeholder p {
    margin: 0;
    font-size: 14px;
  }

  /* Responsive */
  @media (max-width: 640px) {
    .chat-widget__window {
      width: calc(100vw - 20px);
      height: calc(100vh - 100px);
      max-height: calc(100vh - 100px);
    }

    .chat-widget--bottom-right,
    .chat-widget--bottom-left {
      bottom: 10px;
      right: 10px;
      left: 10px;
    }

    .chat-widget--bottom-right .chat-widget__window,
    .chat-widget--bottom-left .chat-widget__window {
      bottom: 70px;
      left: 0;
      right: 0;
    }
  }
</style>

