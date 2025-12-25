import type { Meta, StoryObj } from '@storybook/svelte';
import ChatWindow from './ChatWindow.svelte';
import ChatWindowWithMessages from './ChatWindowWithMessages.svelte';
import ChatWindowWithSubheader from './ChatWindowWithSubheader.svelte';

const meta = {
  title: 'Custom/ChatWindow',
  component: ChatWindow as any,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        state: 'open'
      }
    },
    layout: 'fullscreen'
  },
  argTypes: {
    expanded: { control: 'boolean' },
    showScrollButton: { control: 'boolean' },
    onExpand: { action: 'expand' }
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    expanded: false,
    showScrollButton: true,
  },
  render: (args) => ({
    Component: ChatWindow as any,
    props: args,
  })
};

export const WithMessages: Story = {
  render: () => ({
    Component: ChatWindowWithMessages as any,
  })
};

export const Expanded: Story = {
  args: {
    expanded: true,
    showScrollButton: true,
  },
  render: () => ({
    Component: ChatWindow as any,
    props: {
      expanded: true,
      showScrollButton: true,
    },
  })
};

export const WithSubheader: Story = {
  render: () => ({
    Component: ChatWindowWithSubheader as any,
  })
};

