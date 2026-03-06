import type { Meta, StoryObj } from "@storybook/svelte";
import DashboardV2Showcase from "./DashboardV2Showcase.svelte";

const meta = {
  title: "Custom/Dashboard/V2",
  component: DashboardV2Showcase as any,
  tags: ["autodocs"]
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => ({
    Component: DashboardV2Showcase as any
  })
};
