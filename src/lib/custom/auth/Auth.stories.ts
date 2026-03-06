import type { Meta, StoryObj } from "@storybook/svelte";
import AuthReferenceShowcase from "./AuthReferenceShowcase.svelte";

const meta = {
  title: "Custom/Auth/V1",
  component: AuthReferenceShowcase as any,
  tags: ["autodocs"]
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Reference: Story = {
  render: () => ({
    Component: AuthReferenceShowcase as any
  })
};
