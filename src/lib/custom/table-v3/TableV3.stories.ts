import type { Meta, StoryObj } from "@storybook/svelte";
import TableV3Showcase from "./TableV3Showcase.svelte";

const meta = {
  title: "Custom/Table/V3",
  component: TableV3Showcase as any,
  tags: ["autodocs"]
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => ({
    Component: TableV3Showcase as any
  })
};
