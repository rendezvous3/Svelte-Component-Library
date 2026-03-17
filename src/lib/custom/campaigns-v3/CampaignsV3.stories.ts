import type { Meta, StoryObj } from "@storybook/svelte";
import CampaignsV3Showcase from "./CampaignsV3Showcase.svelte";

const meta = {
  title: "Custom/Campaigns/V3",
  component: CampaignsV3Showcase as any,
  tags: ["autodocs"]
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => ({
    Component: CampaignsV3Showcase as any
  })
};
