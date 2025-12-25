import type { Meta, StoryObj } from '@storybook/svelte';
import ChatWidget from './ChatWidget.svelte';
import ChatWidgetWithContent from './ChatWidgetWithContent.svelte';
import ChatWidgetDecorator from './ChatWidgetDecorator.svelte';

const meta = {
  title: 'Custom/ChatWidget',
  component: ChatWidget as any,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        state: 'open'
      }
    }
  },
  decorators: [
    () => ({
      Component: ChatWidgetDecorator as any,
    })
  ],
  argTypes: {
    position: {
      control: 'select',
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left']
    },
    isOpen: { control: 'boolean' },
    onToggle: { action: 'toggled' }
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    position: 'bottom-right',
    isOpen: false,
  },
};

export const BottomLeft: Story = {
  args: {
    position: 'bottom-left',
    isOpen: false,
  },
};

export const TopRight: Story = {
  args: {
    position: 'top-right',
    isOpen: false,
  },
};

export const TopLeft: Story = {
  args: {
    position: 'top-left',
    isOpen: false,
  },
};

export const WithContent: Story = {
  render: () => ({
    Component: ChatWidgetWithContent as any,
  })
};

