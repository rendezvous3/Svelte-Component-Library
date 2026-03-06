import type { Meta, StoryObj } from "@storybook/svelte";
import TableV2Showcase from "./TableV2Showcase.svelte";

const meta = {
  title: "Custom/Table/V2",
  component: TableV2Showcase as any,
  tags: ["autodocs"]
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => ({
    Component: TableV2Showcase as any
  })
};
