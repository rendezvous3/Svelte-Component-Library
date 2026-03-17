import type { Meta, StoryObj } from "@storybook/svelte";
import RichTextEditorShowcase from "./RichTextEditorShowcase.svelte";

const meta = {
  title: "Custom/Editor/RichText",
  component: RichTextEditorShowcase as any,
  tags: ["autodocs"]
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => ({
    Component: RichTextEditorShowcase as any
  })
};
