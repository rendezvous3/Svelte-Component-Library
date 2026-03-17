import type { Meta, StoryObj } from "@storybook/svelte";
import InsightsV3Showcase from "./InsightsV3Showcase.svelte";

const meta = {
  title: "Custom/Insights/V3",
  component: InsightsV3Showcase as any,
  tags: ["autodocs"]
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => ({
    Component: InsightsV3Showcase as any
  })
};
