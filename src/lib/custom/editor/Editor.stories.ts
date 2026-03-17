import type { Meta, StoryObj } from "@storybook/svelte";
import EditorShowcase from "./EditorShowcase.svelte";

const meta = {
  title: "Custom/Editor",
  component: EditorShowcase as any,
  tags: ["autodocs"]
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => ({
    Component: EditorShowcase as any
  })
};
