import type { Meta, StoryObj } from "@storybook/svelte";
import DashboardV3Showcase from "./DashboardV3Showcase.svelte";

const meta = {
  title: "Custom/Dashboard/V3",
  component: DashboardV3Showcase as any,
  tags: ["autodocs"]
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => ({
    Component: DashboardV3Showcase as any
  })
};
