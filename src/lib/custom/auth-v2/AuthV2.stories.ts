import type { Meta, StoryObj } from "@storybook/svelte";
import AuthV2Showcase from "./AuthV2Showcase.svelte";

const meta = {
  title: "Custom/Auth/V2",
  component: AuthV2Showcase as any,
  tags: ["autodocs"]
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => ({
    Component: AuthV2Showcase as any
  })
};
