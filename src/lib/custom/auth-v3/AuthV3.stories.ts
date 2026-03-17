import type { Meta, StoryObj } from "@storybook/svelte";
import AuthV3Showcase from "./AuthV3Showcase.svelte";

const meta = {
  title: "Custom/Auth/V3",
  component: AuthV3Showcase as any,
  tags: ["autodocs"]
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => ({
    Component: AuthV3Showcase as any
  })
};
