<script lang="ts">
  import CampaignImageLibrary from "./CampaignImageLibrary.svelte";

  const mockImages = [
    {
      name: "banner.png",
      url: "https://placehold.co/400x200/111111/525252?text=banner.png"
    },
    {
      name: "header-logo.jpg",
      url: "https://placehold.co/400x200/1a1a1a/737373?text=header-logo.jpg"
    }
  ];
</script>

<div class="space-y-6 p-6" style="background: #0a0a0a; min-height: 100vh;">
  <div class="text-xs font-medium uppercase tracking-widest text-[#525252]">Default</div>
  <CampaignImageLibrary images={mockImages} />

  <div class="text-xs font-medium uppercase tracking-widest text-[#525252]">Empty</div>
  <CampaignImageLibrary images={[]} />

  <div class="text-xs font-medium uppercase tracking-widest text-[#525252]">Uploading</div>
  <CampaignImageLibrary images={mockImages} uploading={true} />
</div>
