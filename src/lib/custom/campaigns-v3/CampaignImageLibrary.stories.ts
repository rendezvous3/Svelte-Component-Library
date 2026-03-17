import type { Meta, StoryObj } from "@storybook/svelte";
import CampaignImageLibraryShowcase from "./CampaignImageLibraryShowcase.svelte";

const meta = {
  title: "Custom/Campaigns-v3/ImageLibrary",
  component: CampaignImageLibraryShowcase as any,
  tags: ["autodocs"]
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => ({
    Component: CampaignImageLibraryShowcase as any
  })
};
