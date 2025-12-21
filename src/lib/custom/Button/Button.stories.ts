import type { Meta, StoryObj } from '@storybook/svelte';
import Button from './Button.svelte';

const meta = {
  title: 'Custom/Button',
  component: Button as any, // Only one small 'any' needed here for Svelte 5
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    primary: { control: 'boolean' },
    onclick: { action: 'clicked' }
  },
} satisfies Meta<any>; 

export default meta;
type Story = StoryObj<any>;

export const Primary: Story = {
  args: {
    label: 'Button',
    primary: true,
  },
};